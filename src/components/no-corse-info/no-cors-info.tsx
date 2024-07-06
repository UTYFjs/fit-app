import { CopyOutlined } from '@ant-design/icons';
import styles from './no-cors-info.module.css';
import { Alert, message } from 'antd';
import React from 'react';

const Context = React.createContext({ name: 'Default' });
const commandWindows = 'chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security';
const commandMacOS =
    '$ open -n -a /Applications/Google Chrome.app/Contents/MacOS/Google Chrome --args --user-data-dir=/tmp/chrome_dev_test --disable-web-security';

export const NoCORSInfo = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const info = () => {
        messageApi.open({
            type: 'success',
            content: <Context.Consumer>{() => `Скопировано в буфер обмена`}</Context.Consumer>,
            duration: 1,
        });
    };
    return (
        <>
            <Context.Provider value={{ name: 'Ant Design' }}>
                {contextHolder}
                <Alert
                    className={styles.warning}
                    description='Приложение работает только в браузерах с отключенным CORS.'
                    type='error'
                    style={{ padding: 'var(--p-4xs)', width: '126%', marginLeft: '-13%' }}
                    closable
                />
                <Alert
                    description={
                        <>
                            <p className={styles.title}>Для Windows: Win + R. Далее вводим:</p>{' '}
                            <code className={styles.code}>{commandWindows}</code>{' '}
                            <CopyOutlined
                                className={styles.copy}
                                style={{ fontSize: '20px' }}
                                onClick={() => {
                                    navigator.clipboard.writeText(commandWindows);
                                    info();
                                }}
                            />
                        </>
                    }
                    style={{ padding: 'var(--p-4xs)', width: '126%', marginLeft: '-13%' }}
                    type='warning'
                    closable
                />
                <Alert
                    description={
                        <>
                            <p className={styles.title}>Для MacOS. Вводим в командную строку</p>{' '}
                            <code className={styles.code}>{commandMacOS}</code>{' '}
                            <CopyOutlined
                                className={styles.copy}
                                style={{ fontSize: '20px' }}
                                onClick={() => {
                                    navigator.clipboard.writeText(commandMacOS);
                                    info();
                                }}
                            />
                        </>
                    }
                    style={{ padding: 'var(--p-4xs)', width: '126%', marginLeft: '-13%' }}
                    type='warning'
                    closable
                />
            </Context.Provider>
        </>
    );
};
