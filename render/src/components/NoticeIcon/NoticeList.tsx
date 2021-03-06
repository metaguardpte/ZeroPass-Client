import { Avatar, List } from 'antd';

import React from 'react';
import classNames from 'classnames';
import styles from './NoticeList.less';
import { NoticeIconItem, NoticeIconItemType } from './NoticeIconTypes';
import HubButton from '@/components/HubButton';

export type NoticeIconTabProps = {
    count?: number;
    showClear?: boolean;
    showViewMore?: boolean;
    style?: React.CSSProperties;
    title: JSX.Element;
    tabKey: NoticeIconItemType;
    onClick?: (item: NoticeIconItem) => void;
    onClear?: () => void;
    emptyText?: string;
    clearText?: JSX.Element;
    viewMoreText?: string;
    list: NoticeIconItem[];
    onViewMore?: (e: any) => void;
};
const NoticeList: React.FC<NoticeIconTabProps> = ({
    list = [],
    onClick,
    onClear,
    title,
    onViewMore,
    emptyText,
    showClear = true,
    clearText,
    viewMoreText,
    showViewMore = false,
}) => {
    if (!list || list.length === 0) {
        return (
            <div className={styles.notFound}>
                <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                    alt="not found"
                />
                <div>{emptyText}</div>
            </div>
        );
    }
    return (
        <div>
            <List<NoticeIconItem>
                className={styles.list}
                dataSource={list}
                renderItem={(item, i) => {
                    const itemCls = classNames(styles.item, {
                        [styles.read]: item.read,
                    });

                    return (
                        <List.Item
                            className={itemCls}
                            key={item.key || i}
                            onClick={() => {
                                onClick?.(item);
                            }}
                        >
                            <List.Item.Meta
                                className={styles.meta}
                                avatar={item.avatar}
                                title={
                                    <div className={styles.title}>
                                        {item.title}
                                        <div className={styles.extra}>{item.extra}</div>
                                    </div>
                                }
                                description={
                                    <div>
                                        <div className={styles.description}>{item.description}</div>
                                        <div className={styles.datetime}>{item.datetime}</div>
                                    </div>
                                }
                            />
                        </List.Item>
                    );
                }}
            />
            <div className={styles.bottomBar}>
                {showClear ? (
                    <div>
                        <HubButton style={{ margin: 'auto' }} width={75} onClick={onClear}>
                            {clearText}
                        </HubButton>
                    </div>
                ) : null}
                {showViewMore ? (
                    <div
                        onClick={(e) => {
                            if (onViewMore) {
                                onViewMore(e);
                            }
                        }}
                    >
                        {viewMoreText}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default NoticeList;
