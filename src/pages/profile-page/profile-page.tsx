import { Alert, Button, DatePicker, Form, Input, Typography } from 'antd';
import './profile-page.css';
import { useState } from 'react';
import { messageValidation } from '@constants/validation';
import ModalError from '@components/modal-error/modal-error';
import SaveErrorCard from '@components/modal-error/save-error-card/save-error-card';
import { ProfileDataTestId } from '@constants/data-test-id';
import UploadImage from '@components/upload-image/upload-image';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { getUserInfo } from '@redux/user-slice';
import { localeCalendar2 } from '@constants/calendar';
import { DateFormat } from '@constants/date';
import { validationPassword } from '@utils/validation';
import { IUserProfileFormValues } from '../../types/forms';
import { useUpdateUserInfoMutation } from '@services/user-profile-api';
import { RuleObject } from 'antd/lib/form';
import moment from 'moment';

const { Title } = Typography;

const ProfilePage = () => {
    const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);
    const [isDisabledBtn, setIsDisabledBtn] = useState(true);
    const [isEmptyPassword, setIsEmptyPassword] = useState(true);
    const [isAlert, setIsAlert] = useState(false);
    const userInfo = useAppSelector(getUserInfo);
    console.log('userInFo', userInfo);
    const [updateUserInfo] = useUpdateUserInfoMutation();

    const handleOnChangeSomething = () => {
        setIsDisabledBtn(false);
    };
    // const handleSave = () => {
    //     setIsModalErrorOpen(true);
    // };
    const handleCloseModalError = () => {
        setIsModalErrorOpen(false);
    };
    const onFinish = (values: IUserProfileFormValues) => {
        const birthday = values.birthday?.utc().format();

        const request = { ...values, birthday, imgSrc: userInfo.imgSrc };
        updateUserInfo(request)
            .unwrap()
            .then((data) => {
                setIsAlert(true);
                console.log('success', data);
            })
            .catch(() => {
                console.log('error update');
            });
        console.log('onFinish Profile', request, 'isEmptyPassword', isEmptyPassword);
        setIsDisabledBtn(true);
    };
    const onChangeForm = () => {
        setIsDisabledBtn(false);
    };
    return (
        <>
            <Form
                className='profile-page'
                onFinish={onFinish}
                onChange={onChangeForm}
                initialValues={{
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    birthday: userInfo.birthday && moment(userInfo.birthday),
                    email: userInfo.email,
                }}
            >
                <Title className='profile__title' level={5}>
                    Личная информация
                </Title>
                <div className='profile__personal-wrapper'>
                    <Form.Item
                        className='profile__upload'
                        valuePropName='fileList'
                        data-test-id={ProfileDataTestId.PROFILE_AVATAR}
                    >
                        <UploadImage
                            imgSrc={userInfo.imgSrc}
                            handlerError={() => {
                                setIsDisabledBtn(true);
                            }}
                        />
                    </Form.Item>

                    <div className='profile-page__item-wrapper'>
                        <Form.Item name='firstName'>
                            <Input
                                type='text'
                                placeholder='Имя'
                                size='large'
                                onChange={handleOnChangeSomething}
                                data-test-id={ProfileDataTestId.INPUT_PROFILE_NAME}
                            />
                        </Form.Item>
                        <Form.Item name='lastName'>
                            <Input
                                type='text'
                                placeholder='Фамилия'
                                size='large'
                                data-test-id={ProfileDataTestId.INPUT_PROFILE_SURNAME}
                            />
                        </Form.Item>
                        <Form.Item name='birthday'>
                            <DatePicker
                                className='profile__date-picker'
                                locale={localeCalendar2}
                                format={DateFormat.DOT_DD_MM_YYYY}
                                placeholder='Дата рождения'
                                size='large'
                                data-test-id={ProfileDataTestId.PROFILE_BIRTHDAY}
                            />
                        </Form.Item>
                    </div>
                </div>
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
                            defaultValue={userInfo.email}
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
                            onChange={(e) => {
                                if (e.target.value.trim()) {
                                    setIsEmptyPassword(false);
                                } else {
                                    setIsEmptyPassword(true);
                                }
                            }}
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
                <Button
                    className='profile-page__submit-btn'
                    type='primary'
                    htmlType='submit'
                    disabled={isDisabledBtn}
                    size='large'
                    //onClick={handleSave}
                    data-test-id={ProfileDataTestId.PROFILE_SUBMIT}
                >
                    Сохранить изменения
                </Button>
                {isAlert && (
                    <Alert
                        className='profile-page__alert'
                        data-test-id={ProfileDataTestId.ALERT}
                        message='Данные профиля успешно обновлены'
                        type='success'
                        showIcon
                        closable
                        onClose={() => {
                            setIsAlert(false);
                        }}
                    />
                )}
            </Form>

            <ModalError isOpen={isModalErrorOpen} width={416} isClosable={false}>
                <SaveErrorCard handlePrimeButton={handleCloseModalError} />
            </ModalError>
        </>
    );
};

export default ProfilePage;
