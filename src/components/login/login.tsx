import { useCallback, useEffect, useState } from 'react';

import styles from './login.module.css';

import 'antd/dist/antd.css';
import { GooglePlusOutlined } from '@ant-design/icons';
import { Paths, baseUrl } from '@constants/api';
import { messageValidation, regExpEmail, validationRulesEmail } from '@constants/validation';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setAccessToken, setUserValues } from '@redux/user-slice';
import { useCheckEmailMutation, useLoginMutation } from '@services/auth-api';
import { validationPassword } from '@utils/validation';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ILoginData } from '../..//types/forms';

export const Login: React.FC = () => {
    const [form] = Form.useForm();

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [login] = useLoginMutation();
    const [checkEmail] = useCheckEmailMutation();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const { email } = useAppSelector((state) => state.user);
    const { previousLocations } = useAppSelector((state) => state.router);
    const handleGoogleAuth = useCallback(async () => {
        window.location.href = `${baseUrl}/auth/google`;
    }, []);
    useEffect(() => {
        if (previousLocations?.[1]?.location?.pathname === Paths.ERROR_CHECK_EMAIL) {
            checkEmail({ email: email })
                .unwrap()
                .then(() => {
                    navigate(Paths.CONFIRM_EMAIL);
                })
                .catch((e) => {
                    if (e.status === 404 && e.data.message === 'Email не найден') {
                        navigate(Paths.ERROR_CHECK_EMAIL_NO_EXIST);
                    } else {
                        navigate(Paths.ERROR_CHECK_EMAIL);
                    }
                });
        }
    }, [checkEmail, email, navigate, previousLocations]);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth < 768);
    });

    const handleForgotPassword = () => {
        const email = form.getFieldValue('email') as string;
        if (regExpEmail.test(email)) {
            dispatch(setUserValues({ email: email, password: '', passwordRepeat: '' }));

            checkEmail({ email: email })
                .unwrap()
                .then(() => {
                    navigate(Paths.CONFIRM_EMAIL);
                })
                .catch((e) => {
                    const path =
                        e.status === 404 && e.data.message === 'Email не найден'
                            ? Paths.ERROR_CHECK_EMAIL_NO_EXIST
                            : Paths.ERROR_CHECK_EMAIL;
                    navigate(path);
                });
        }
    };
    const onFinish = (values: ILoginData) => {
        login({ email: values.email, password: values.password })
            .unwrap()
            .then((data) => {
                values.remember ? localStorage.setItem('accessToken', data.accessToken) : '';
                dispatch(setAccessToken(data.accessToken));
                navigate(Paths.MAIN);
            })
            .catch(() => {
                navigate(Paths.ERROR_LOGIN);
            });
    };

    return (
        <Form
            form={form}
            name='normal_login'
            className={styles['form_login']}
            initialValues={{ remember: false }}
            onFinish={onFinish}
        >
            <Form.Item name='email' rules={validationRulesEmail} style={{ marginBottom: 32 }}>
                <Input addonBefore='e-mail' size='large' data-test-id='login-email' />
            </Form.Item>

            <Form.Item
                name='password'
                rules={[
                    {
                        required: true,
                        validator: validationPassword,
                        message: messageValidation.password,
                    },
                ]}
            >
                <Input.Password
                    type='password'
                    placeholder='Пароль'
                    size='large'
                    data-test-id='login-password'
                />
            </Form.Item>
            <div className={styles['form-item_check-area']}>
                <Form.Item name='remember' valuePropName='checked' noStyle>
                    <Checkbox
                        defaultChecked={false}
                        className={styles['checkbox_remember']}
                        data-test-id='login-remember'
                    >
                        Запомнить меня
                    </Checkbox>
                </Form.Item>
                <Button
                    type='text'
                    size='small'
                    className={styles['login-form-forgot']}
                    data-test-id='login-forgot-button'
                    onClick={handleForgotPassword}
                >
                    Забыли пароль?
                </Button>
            </div>
            <Form.Item style={{ marginBottom: 16 }}>
                <Button
                    type='primary'
                    htmlType='submit'
                    size='large'
                    style={{ width: '100%' }}
                    className={styles['login-form-button']}
                    data-test-id='login-submit-button'
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
                onClick={handleGoogleAuth}
            >
                Войти через Google
            </Button>
        </Form>
    );
};
