import { Form, Input, Typography } from 'antd';
import './private-info-fieldset.css';
import { useState } from 'react';
import { messageValidation } from '@constants/validation';
import { ProfileDataTestId } from '@constants/data-test-id';
import { validationPassword } from '@utils/validation';
import { RuleObject } from 'antd/lib/form';

const { Title } = Typography;

export const PrivateInfoFieldset = () => {
    const [isEmptyPassword, setIsEmptyPassword] = useState(true);

    const handleOnChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.trim()) {
            setIsEmptyPassword(false);
        } else {
            setIsEmptyPassword(true);
        }
    };

    return (
        <>
            <fieldset className='profile__private-info'>
                <Title className='profile__title profile__title_second' level={5}>
                    Приватность и авторизация
                </Title>
                <div className='profile-page__item-wrapper'>
                    <Form.Item
                        name='email'
                        className='profile__email'
                        rules={[
                            { required: !isEmptyPassword, message: '' },
                            { type: 'email', message: '' },
                        ]}
                    >
                        <Input
                            type='email'
                            addonBefore='e-mail:'
                            size='large'
                            data-test-id={ProfileDataTestId.INPUT_PROFILE_EMAIL}
                        />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        rules={[
                            {
                                required: !isEmptyPassword,
                                validator: (_: RuleObject, value: string) => {
                                    if (!value) {
                                        return Promise.resolve();
                                    }
                                    return validationPassword(_, value);
                                },
                                message: messageValidation.password,
                            },
                        ]}
                        help={
                            <div className='profile__password-help'>
                                {messageValidation.password}
                            </div>
                        }
                    >
                        <Input.Password
                            placeholder='Пароль'
                            size='large'
                            data-test-id={ProfileDataTestId.PROFILE_PASSWORD}
                            onChange={handleOnChangeField}
                        />
                    </Form.Item>
                    <Form.Item
                        name='repeatPassword'
                        className='profile__repeat-password'
                        dependencies={['password']}
                        rules={[
                            {
                                required: !isEmptyPassword,
                                message: messageValidation.repeatPassword,
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(messageValidation.repeatPassword),
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder='Повторите пароль'
                            size='large'
                            data-test-id={ProfileDataTestId.PROFILE_REPEAT_PASSWORD}
                        />
                    </Form.Item>
                </div>
            </fieldset>
        </>
    );
};
