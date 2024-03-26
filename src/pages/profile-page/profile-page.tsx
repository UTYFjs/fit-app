import { Button, DatePicker, Form, Input, Typography } from 'antd';
import './profile-page.css';
import { useState } from 'react';
import { messageValidation } from '@constants/validation';
import ModalError from '@components/modal-error/modal-error';
import SaveErrorCard from '@components/modal-error/save-error-card/save-error-card';
import { ProfileDataTestId } from '@constants/data-test-id';
import UploadImage from '@components/upload-image/upload-image';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { getUserInfo } from '@redux/user-slice';

const { Title } = Typography;

const ProfilePage = () => {
    const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);
    const [isDisabledBtn, setIsDisabledBtn] = useState(true);
    const userInfo = useAppSelector(getUserInfo);
    console.log('userInfo', userInfo);

    const handleOnChangeSomething = () => {
        setIsDisabledBtn(false);
    };
    // const handleSave = () => {
    //     setIsModalErrorOpen(true);
    // };
    const handleCloseModalError = () => {
        setIsModalErrorOpen(false);
    };
    const onFinish = () => {
        console.log('onFinish Profile');
    };
    return (
        <>
            <Form className='profile-page' onFinish={onFinish}>
                <Title className='profile__title' level={5}>
                    Личная информация
                </Title>
                <div className='profile__personal-wrapper'>
                    <Form.Item
                        className='profile__upload'
                        valuePropName='fileList'
                        data-test-id={ProfileDataTestId.PROFILE_AVATAR}
                    >
                        <UploadImage imgSrc={userInfo.imgSrc} />
                    </Form.Item>

                    <div className='profile-page__item-wrapper'>
                        <Form.Item>
                            <Input
                                type='text'
                                placeholder='Имя'
                                size='large'
                                onChange={handleOnChangeSomething}
                                data-test-id={ProfileDataTestId.INPUT_PROFILE_NAME}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                type='text'
                                placeholder='Фамилия'
                                size='large'
                                data-test-id={ProfileDataTestId.INPUT_PROFILE_SURNAME}
                            />
                        </Form.Item>
                        <Form.Item>
                            <DatePicker
                                className='profile__date-picker'
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
                    <Form.Item className='profile__email'>
                        <Input
                            type='email'
                            addonBefore='e-mail:'
                            size='large'
                            data-test-id={ProfileDataTestId.INPUT_PROFILE_EMAIL}
                        />
                    </Form.Item>
                    <Form.Item
                        name='password'
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
                        />
                    </Form.Item>
                    <Form.Item className='profile__repeat-password'>
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
            </Form>
            <ModalError isOpen={isModalErrorOpen} width={416} isClosable={false}>
                <SaveErrorCard handlePrimeButton={handleCloseModalError} />
            </ModalError>
        </>
    );
};

export default ProfilePage;
