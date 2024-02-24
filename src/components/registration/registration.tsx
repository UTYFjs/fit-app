import React, { useState } from 'react';
import styles from './registration.module.css';
import 'antd/dist/antd.css';
import { Button, Form, Input } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';

import { validationPassword } from '@utils/validation';
import { messageValidation } from '@constants/validation';

export const Registration: React.FC = () => {
    const [form] = Form.useForm();

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth < 768);
    });


    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    return (
        <Form
            name='normal_login'
            className={styles['form_login']}
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name='username'
                rules={[
                    { required: true, message: '' },
                    { type: 'email', message: '' },
                ]}
                style={{ marginBottom: 32 }}
            >
                <Input addonBefore='e-mail' size='large' />
            </Form.Item>

            <>
                <Form.Item
                    name='password'
                    rules={[
                        {
                            required: true,
                            validator: validationPassword,
                            message: messageValidation.password,
                        },
                    ]}
                    help={
                        <div className={styles.help}>
                           {messageValidation.password}
                        </div>
                    }
                >
                    <Input.Password type='password' placeholder='Пароль' size='large' />
                </Form.Item>
                <Form.Item
                    name='password-repeat'
                    className={styles['password-repeat']}
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: messageValidation.repeatPassword,
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error(messageValidation.repeatPassword));
                            },
                        }),
                    ]}
                >
                    <Input.Password type='password' placeholder='Повторите пароль' size='large' />
                </Form.Item>
            </>
            <Form.Item style={{ marginBottom: 16 }}>
                <Button
                    type='primary'
                    htmlType='submit'
                    size='large'
                    style={{ width: '100%' }}
                    className={styles['login-form-button']}
                >
                    Войти
                </Button>
            </Form.Item>
            <Button
                type='default'
                htmlType='button'
                size='large'
                icon={isMobile ? '' : <GooglePlusOutlined />}
                className={styles['login-form-button_google']}
            >
                Регистрация через Google
            </Button>
        </Form>
    );
};
