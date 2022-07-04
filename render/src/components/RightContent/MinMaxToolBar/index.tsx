import { BorderOutlined, CloseOutlined, MinusOutlined, SwitcherOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { sessionStore, localStore } from '@/browserStore/store';
import SimpleModal from '../../SimpleModal';
import HubButton from '../../HubButton';
import styles from '../index.less';
import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'umi';
import { Space, Divider, Radio } from 'antd';

const handleMax = () => {
    window.electron.maxWindow();
};
const handleUnmax = () => {
    window.electron.unmaxWindow();
};
function closeWindow() {
    if (window.electron) {
        window.electron.closeWindow(localStore.closeOption);
    }
}
const handleMin = () => {
    window.electron.minWindow();
};

type Props = {
    style?: React.HTMLAttributes<HTMLDivElement>['style'];
    btnClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
};

export default (props: Props) => {
    const Intl = useIntl();
    const [IsMax, setIsMax] = useState(window.Ismax);
    const [showCloseOption, setShowCloseOption] = useState(false);
    const [closeOptionValue, setCloseOptionValue] = useState(1);

    const radioOnChange = (e) => {
        setCloseOptionValue(e.target.value);
    };
    if (window.Ismax === undefined) {
        window.Ismax = false;
    }

    if (window.electron) {
        window.electron.initUnmax(() => {
            setIsMax(false);
            window.Ismax = false;
        });
        window.electron.initMax(() => {
            setIsMax(true);
            window.Ismax = true;
        });
    }
    const saveCloseOption = () => {
        localStore.closeOption = closeOptionValue;
        setShowCloseOption(false);
    };

    const afterClose = () => {
        if (localStore.closeOption != null) {
            closeWindow();
        }
    };
    const MaxMin = () => {
        if (IsMax) {
            return (
                <div className={classNames(styles.icon, props.btnClassName)} onClick={handleUnmax}>
                    <SwitcherOutlined />
                </div>
            );
        } else {
            return (
                <div className={classNames(styles.icon, props.btnClassName)} onClick={handleMax}>
                    <BorderOutlined />
                </div>
            );
        }
    };
    const handleClose = () => {
        if (localStore.closeOption == null) {
            setShowCloseOption(true);
        } else {
            closeWindow();
        }
    };
    return (
        <>
            <div className={styles.toolbarContainter} style={props.style}>
                <div onClick={handleMin} className={classNames(styles.icon, props.btnClassName)}>
                    <MinusOutlined />
                </div>
                <MaxMin />
                <div
                    className={classNames(styles.icon, styles.close, props.btnClassName)}
                    onClick={handleClose}
                >
                    <CloseOutlined />
                </div>
            </div>
            <SimpleModal
                title={<FormattedMessage id="closeOption.title" />}
                visible={showCloseOption}
                destroyOnClose
                close={() => setShowCloseOption(false)}
                afterClose={afterClose}
                width={400}
                closable
                footer={
                    <HubButton
                        width={65}
                        style={{ margin: 'auto' }}
                        type="primary"
                        onClick={saveCloseOption}
                    >
                        {Intl.formatMessage({ id: 'closeOption.Ok' })}
                    </HubButton>
                }
            >
                <div>
                    <Radio.Group onChange={radioOnChange} defaultValue={1}>
                        <Space direction="vertical">
                            <Radio value={1}>
                                {<FormattedMessage id="closeOption.Minimize" />}
                            </Radio>
                            <Radio value={2}>{<FormattedMessage id="closeOption.Quit" />}</Radio>
                        </Space>
                    </Radio.Group>
                </div>
            </SimpleModal>
        </>
    );
};
