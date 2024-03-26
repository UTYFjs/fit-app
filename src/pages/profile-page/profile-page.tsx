import { Button, DatePicker, Form, Input, Typography, Upload } from 'antd';
import './profile-page.css';
import { useState } from 'react';
import { messageValidation } from '@constants/validation';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import ModalError from '@components/modal-error/modal-error';
import SaveErrorCard from '@components/modal-error/save-error-card/save-error-card';
import { ProfileDataTestId } from '@constants/data-test-id';

const { Title } = Typography;
const tooLargeFileErrorData = {
    title: 'Файл слишком большой',
    subTitle: 'Выберите файл размером до 5 МБ.',
};
const ProfilePage = () => {
    const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);
    const [isTooLargeFile, setIsTooLargeFile] = useState(true);
    const [isDisabledBtn, setIsDisabledBtn] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth < 768);
    });

    const handleOnChangeSomething = () => {
        setIsDisabledBtn(false);
    };
    const handleSave = () => {
        setIsModalErrorOpen(true);
    };
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
                    <Form.Item className='profile__upload' valuePropName='fileList'>
                        <Upload
                            action='/upload.do'
                            listType={isMobile ? 'picture' : 'picture-card'}
                            data-test-id={ProfileDataTestId.PROFILE_AVATAR}
                        >
                            {!isMobile && (
                                <div>
                                    <PlusOutlined />
                                    <div className='profile__upload-text' style={{ marginTop: 8 }}>
                                        Загрузить фото профиля
                                    </div>
                                </div>
                            )}
                            {isMobile && (
                                <div className='profile__upload_mobile'>
                                    {' '}
                                    <p className='upload__label'>Загрузить фото профиля:</p>{' '}
                                    <Button
                                        className='upload__button_mobile'
                                        icon={
                                            <UploadOutlined
                                                style={{ color: 'var(--character-light-border)' }}
                                            />
                                        }
                                        size='large'
                                    >
                                        Загрузить
                                    </Button>
                                </div>
                            )}
                        </Upload>
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
                    onClick={handleSave}
                    data-test-id={ProfileDataTestId.PROFILE_SUBMIT}
                >
                    Сохранить изменения
                </Button>
            </Form>
            <ModalError isOpen={isModalErrorOpen} width={416} isClosable={false}>
                <SaveErrorCard
                    handlePrimeButton={handleCloseModalError}
                    titleText={isTooLargeFile ? tooLargeFileErrorData.title : ''}
                    subTitleText={isTooLargeFile ? tooLargeFileErrorData.subTitle : ''}
                />
            </ModalError>
        </>
    );
};

export default ProfilePage;
