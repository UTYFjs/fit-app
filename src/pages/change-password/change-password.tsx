import { useEffect } from 'react';

import { Paths } from '@constants/api';
import { messageValidation } from '@constants/validation';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setUserValues } from '@redux/user-slice';
import { useChangePasswordMutation } from '@services/auth-api';
import { validationPassword } from '@utils/validation';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Title from 'antd/lib/typography/Title';
import { useNavigate } from 'react-router-dom';

import styles from './change-password.module.css';

const ChangePassword = () => {
    const [form] = useForm();
    const { password, passwordRepeat } = useAppSelector((state) => state.user);
    const { previousLocations } = useAppSelector((state) => state.router);
    const [changePassword] = useChangePasswordMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (previousLocations?.[1]?.location?.pathname === Paths.ERROR_CHANGE_PASSWORD) {
            changePassword({ password: password, confirmPassword: passwordRepeat })
                .unwrap()
                .then(() => {
                    navigate(Paths.SUCCESS_CHANGE_PASSWORD);
                })
                .catch(() => {
                    navigate(Paths.ERROR_CHANGE_PASSWORD);
                });
        }
    }, [changePassword, navigate, password, passwordRepeat, previousLocations]);

    const onFinish = () => {
        const password = form.getFieldValue('password');
        const confirmPassword = form.getFieldValue('passwordRepeat');
        dispatch(setUserValues({ password: password, passwordRepeat: confirmPassword, email: '' }));
        changePassword({ password: password, confirmPassword: confirmPassword })
            .unwrap()
            .then(() => {
                navigate(Paths.SUCCESS_CHANGE_PASSWORD);
            })
            .catch(() => {
                navigate(Paths.ERROR_CHANGE_PASSWORD);
            });
    };
    return (
        <Form form={form} className={styles['form_change-password']} onFinish={onFinish}>
            <Title level={3} className={styles['title_change-password']}>
                Восстановление аккаунта
            </Title>
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
                    placeholder='Новый пароль'
                    size='large'
                    data-test-id='change-password'
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
                    data-test-id='change-confirm-password'
                />
            </Form.Item>
            <Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                    size='large'
                    style={{ width: '100%' }}
                    className={styles['login-form-button']}
                    data-test-id='change-submit-button'
                >
                    Сохранить
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ChangePassword;
