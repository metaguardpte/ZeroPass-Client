import { Row, Select } from 'antd';
import { localStore } from '@/browserStore/store';
import { FormattedMessage, useIntl } from 'umi';
import styles from './index.less';
import FormItem from '@/components/Form/FormItem';
import FormInput from '@/components/Form/FormInput';
import FormGroup from '@/components/Form/FormGroup';
import useSettings from '@/components/RightContent/Settings/useSettings';

const { Option } = Select;

export const FormItems = (props: {
    title: JSX.Element;
    label: JSX.Element | null;
    content: JSX.Element;
}) => {
    return (
        <div className={styles.item}>
            <Row className={styles.label} style={{ marginTop: 12 }}>
                {props.title}
            </Row>
            <Row>
                <FormGroup height={60}>
                    <FormItem label={props.label}>
                        <FormInput>{props.content}</FormInput>
                    </FormItem>
                </FormGroup>
            </Row>
        </div>
    );
};

const getForm = () => {
    const Intl = useIntl();
    const { selectedLang, lock, handleLanguageChange, handleCloseAppChange, hangeLockChange } =
        useSettings();

    const lockOptions = [
        { value: 0, label: 'setting.lock.never' },
        { value: 60, label: 'setting.lock.minute.one' },
        { value: 120, label: 'setting.lock.minute.two' },
        { value: 300, label: 'setting.lock.minute.five' },
        { value: 600, label: 'setting.lock.minute.ten' },
        { value: 1800, label: 'setting.lock.minute.thirty' },
        { value: 3600, label: 'setting.lock.hour.one' },
        { value: 3600 * 4, label: 'setting.lock.hour.four' },
        { value: 3600 * 8, label: 'setting.lock.hour.eight' },
    ];

    const items = [];
    items.push({
        title: <FormattedMessage id="settings.divider.language" />,
        label: <FormattedMessage id="settings.language.choose" />,
        content: (
            <Select
                className={styles.select}
                defaultValue={selectedLang}
                onChange={handleLanguageChange}
            >
                <Option value="en-US">English</Option>
                <Option value="de-DE">Deutsch</Option>
                <Option value="fr-FR">Fran??ais</Option>
                <Option value="it-IT">Italiano</Option>
                <Option value="es-ES">Espa??ol</Option>
                <Option value="pt-PT">Portugu??s</Option>
                <Option value="ja-JP">?????????</Option>
                <Option value="ko-KR">?????????</Option>
                <Option value="th-TH">?????????</Option>
                <Option value="ms-MY">Melayu</Option>
                <Option value="vi-VN">Ti???ng Vi???t</Option>
                <Option value="zh-CN">??????????????????</Option>
                <Option value="zh-TW">??????????????????</Option>
            </Select>
        ),
    });

    items.push({
        title: <FormattedMessage id="settings.auto.lock" />,
        label: <FormattedMessage id="settings.auto.lock.label" />,
        content: (
            <Select defaultValue={lock ?? 0} onChange={hangeLockChange}>
                {lockOptions.map((item) => (
                    <Option value={item.value} key={item.value}>
                        {Intl.formatMessage({ id: item.label })}
                    </Option>
                ))}
            </Select>
        ),
    });

    items.push({
        title: <FormattedMessage id="settings.divider.other" />,
        label: <FormattedMessage id="closeOption.title" />,
        content: (
            <Select
                className={styles.select}
                defaultValue={localStore.closeOption}
                onChange={handleCloseAppChange}
            >
                <Option value={1}>{<FormattedMessage id="closeOption.Minimize" />}</Option>
                <Option value={2}>{<FormattedMessage id="closeOption.Quit" />}</Option>
            </Select>
        ),
    });

    return items;
};

export default getForm;
