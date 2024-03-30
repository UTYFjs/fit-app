import { useCallback, useEffect, useState } from 'react';

import styles from './registration.module.css';

import 'antd/dist/antd.css';
import { GooglePlusOutlined } from '@ant-design/icons';
import { Paths } from '@constants/api';
import { messageValidation, validationRulesEmail } from '@constants/validation';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setUserValues } from '@redux/user-slice';
import { useRegistrationMutation } from '@services/auth-api';
import { validationPassword } from '@utils/validation';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import { IRegisterData } from '../../types/forms';

export const Registration: React.FC = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [registration] = useRegistrationMutation();
    const navigate = useNavigate();
    const { accessToken, email, password, passwordRepeat } = useAppSelector((state) => state.user);
    const { previousLocations } = useAppSelector((state) => state.router);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (accessToken) {
            navigate(Paths.MAIN);
        }
    }, [accessToken, navigate]);

    const onFinish = useCallback(
        (values: IRegisterData) => {
            dispatch(setUserValues(values));
            registration({ email: values.email, password: values.password })
                .unwrap()
                .then(() => {
                    navigate(Paths.SUCCESS);
                })
                .catch((e) => {
                    if (e.status === 409) {
                        navigate(Paths.ERROR_USER_EXIST);
                    } else {
                        navigate(Paths.ERROR);
                    }
                });
        },
        [dispatch, navigate, registration],
    );

    useEffect(() => {
        if (previousLocations?.[1]?.location?.pathname === Paths.ERROR) {
            onFinish({
                email: email,
                password: password,
                passwordRepeat: passwordRepeat,
            });
        }
    }, [email, onFinish, password, passwordRepeat, previousLocations]);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth < 768);
    });

    return (
        <Form
            name='normal_login'
            className={styles['form_login']}
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item name='email' rules={validationRulesEmail} style={{ marginBottom: 32 }}>
                <Input addonBefore='e-mail' size='large' data-test-id='registration-email' />
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
                    help={<div className={styles.help}>{messageValidation.password}</div>}
                >
                    <Input.Password
                        type='password'
                        placeholder='Пароль'
                        size='large'
                        data-test-id='registration-password'
                    />
                </Form.Item>
                <Form.Item
                    name='passwordRepeat'
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
                    <Input.Password
                        type='password'
                        placeholder='Повторите пароль'
                        size='large'
                        data-test-id='registration-confirm-password'
                    />
                </Form.Item>
            </>
            <Form.Item style={{ marginBottom: 16 }}>
                <Button
                    type='primary'
                    htmlType='submit'
                    size='large'
                    style={{ width: '100%' }}
                    className={styles['login-form-button']}
                    data-test-id='registration-submit-button'
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
