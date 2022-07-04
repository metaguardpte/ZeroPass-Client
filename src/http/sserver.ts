import express, {RequestHandler} from 'express'
import bodyParser from 'body-parser'
import SseStream from 'ssestream'
import {v4 as uuid} from 'uuid'
import requestHandler from './pluginRequestHandler'
import logger from "electron-log";
import net from "net";
import ipcService from "../ExtensionIPC";
import cors from 'cors'
import pluginStore from './pluginStore'
import child_Process from "child_process";

interface EventClient {
    id: string,
    client: SseStream
}

const eventClientList: EventClient[] = []
const server = express()
server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())
server.use(cors())
const httpBasePort: number = 54684;

const sserver = {
    startUp: (port: number, cb?: () => void) => {
        server.listen(port, 'localhost', () => {
            console.log(`listening ${port}`)
            ipcService.getInstance().startIpcServer(port);
            if(cb){
                cb()
            }
        })
    },
    broadcast: (data: any) => {
        eventClientList.forEach(v => {
            v.client.writeMessage({data: data})
        })
    }
}

const formatList = (data: any[]) => {
    return data.map((item) => ({
        ...item,
        alias: item.alias || item.name,
    }));
}

const onConnect = async (client: SseStream) => {
    client.writeMessage({data: pluginStore.userProfileMessage})
    const list: Message.ExtensionsMessage = {
        type: "ReturnListFromApp",
        message: [...pluginStore.workList, ...pluginStore.personalList],
    };
    client.writeMessage({data: list})
}

const eventsHandler: RequestHandler = (req, res, next) =>{
    const client = new SseStream(req)
    const id = uuid()
    client.pipe(res)
    eventClientList.push({
        id: id,
        client: client
    })
    if(onConnect){
        onConnect(client)
    }
    
    res.on('close', () => {
        const index = eventClientList.findIndex(c => c.id === id)
        eventClientList.splice(index, 1)
        client.unpipe(res)
    })

    next()
}

server.post('/plugin', requestHandler)
server.get('/events', eventsHandler)

export type getFreePortCallback = (err: Error, freePort: number) => void;
export function getFreePort(retcb: getFreePortCallback) {
    const wsIp = "localhost";
    const portEnd = 65534;
    type PortRange = { start: number; end: number };
    let excludedPortRanges = new Array<PortRange>();
    const isPortExcluded = function (port: number): boolean {
        for (const range of excludedPortRanges) {
            if (port >= range.start && port <= range.end) return true;
        }
    };

    const probe = function (
        ip: string,
        port: number,
        cb: (port: number) => void
    ) {
        logger.debug("Test port: ", port);
        if (isPortExcluded(port)) {
            logger.debug("The port is in excluded", port);
            cb(port + 1);
            return;
        }
        const s = net.createConnection({ port: port, host: ip });
        s.on("connect", function () {
            s.end();
            logger.debug("The port is in use and try next", port);
            cb(port + 1);
        });
        s.on("error", (err) => {
            if (err.message.includes(" ECONNREFUSED ")) {
                logger.debug("The port is not in use", port);
                retcb(null, port);
            }
        });
    };

    var onprobe = function (nextPort: number) {
        if (nextPort >= portEnd) {
            retcb(new Error("No available ports"), nextPort);
        } else {
            setImmediate(() => probe(wsIp, nextPort, onprobe));
        }
    };

    //https://stackoverflow.com/questions/58216537/what-is-administered-port-exclusions-in-windows-10
    const getExcludedPortRange = function (
        postAction: (excludedPorts: Array<PortRange>) => void
    ) {
        let excludedPortRanges = new Array<PortRange>();
        const cmd = "netsh interface ipv4 show excludedportrange protocol=tcp";
        child_Process.exec(cmd, function (error, stdout, stderr) {
            if (error) {
                logger.warn("Failed to get excluded port ", error.message);
                postAction(excludedPortRanges);
                return;
            }
            const lines = stdout.split("\r\n");
            let canSacanPortRange: boolean = false;
            for (const line of lines) {
                if (!canSacanPortRange) {
                    canSacanPortRange = line.startsWith("----------");
                    continue;
                }
                if (line.length == 0) break;
                let ports = line.trim().replace(/  +/g, " ").split(" ");
                if (ports.length < 2) continue;
                let portRange: PortRange = { start: +ports[0], end: +ports[1] };
                excludedPortRanges.push(portRange);
            }
            postAction(excludedPortRanges);
        });
    };

    return getExcludedPortRange((excludedPorts: Array<PortRange>) => {
        excludedPortRanges = excludedPorts;
        probe(wsIp, httpBasePort, onprobe);
    });
}

export default sserver