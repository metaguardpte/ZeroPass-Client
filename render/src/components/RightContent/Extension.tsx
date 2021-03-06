import { FormattedMessage } from 'umi';
import HubButton from '@/components/HubButton';
import { OpenUrlByBrowser } from '@/utils/tools';

const Extension = (props: { gap?: number }) => {
    const copy = (type: 'chrome' | 'edge') => {
        switch (type) {
            case 'edge':
                OpenUrlByBrowser.edge(
                    'https://microsoftedge.microsoft.com/addons/detail/zeropass/gmfbcmpolfoehenbkhagaldpolpgbock',
                );
                break;

            default:
                OpenUrlByBrowser.chrome(
                    'https://chrome.google.com/webstore/detail/zeropass/eoioohbhgednnbpdfhpbaejfcafhjmnb',
                );
                break;
        }
    };

    return (
        <div style={{ width: '100%' }}>
            <div style={{ textAlign: 'center', marginBottom: props.gap ? props.gap : 30 }}>
                <FormattedMessage id="setting.browser.install" />
            </div>
            <div style={{ display: 'flex', width: '100%', marginBottom: 10 }}>
                <div style={{ flex: '0.5', marginRight: 8 }}>
                    <div style={{ float: 'right' }}>
                        <HubButton
                            onClick={() => copy('chrome')}
                            size="big"
                            style={{ padding: '0 5px', fontWeight: 600 }}
                            width={170}
                            height={32}
                            addonBefore={<img src="./icons/chrome.svg" width={24} height={24} />}
                        >
                            Google Chrome
                        </HubButton>
                    </div>
                </div>
                <div style={{ flex: '0.5', marginLeft: 8 }}>
                    <HubButton
                        onClick={() => copy('edge')}
                        size="big"
                        style={{ padding: '0 5px', fontWeight: 600 }}
                        width={170}
                        height={32}
                        addonBefore={<img src="./icons/edge.png" width={24} height={24} />}
                    >
                        Microsoft Edge
                    </HubButton>
                </div>
            </div>
        </div>
    );
};

export default Extension;
