import { Alert, Button, Form } from 'antd';
import './profile-page.css';
import { useState } from 'react';
import ModalError from '@components/modal-error/modal-error';
import SaveErrorCard from '@components/modal-error/save-error-card/save-error-card';
import { ProfileDataTestId } from '@constants/data-test-id';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { getUserInfo } from '@redux/profile-slice';
import { IUserProfileFormValues } from '../../types/forms';
import { useUpdateUserInfoMutation } from '@services/user-profile-api';
import moment from 'moment';
import { PersonalInfoFieldset } from './personal-info-fieldset/personal-info-fieldset';
import { PrivateInfoFieldset } from './private-info-fieldset/private-info-fieldset';

const ProfilePage = () => {
    const userInfo = useAppSelector(getUserInfo);
    const [updateUserInfo] = useUpdateUserInfoMutation();
    const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);
    const [isDisabledBtn, setIsDisabledBtn] = useState(true);
    const [isAlert, setIsAlert] = useState(false);
    const [form] = Form.useForm();

    const handleCloseModalError = () => {
        setIsModalErrorOpen(false);
    };
    const handleUploadImageError = () => {
        setIsDisabledBtn(true);
    };
    const onFinish = (values: IUserProfileFormValues) => {
        const birthday = values.birthday?.utc().format();
        const request = { ...values, birthday, imgSrc: userInfo.imgSrc };
        updateUserInfo(request)
            .unwrap()
            .then(() => {
                setIsAlert(true);
            })
            .catch(() => {});
        setIsDisabledBtn(true);
    };
    const onChangeForm = () => {
        setIsDisabledBtn(false);
    };
    return (
        <>
            <Form
                className='profile-page'
                form={form}
                onFinish={onFinish}
                onChange={onChangeForm}
                initialValues={{
                    ...userInfo,
                    birthday: userInfo.birthday && moment(userInfo.birthday),
                }}
            >
                <PersonalInfoFieldset
                    imgSrc={userInfo.imgSrc}
                    handleUploadImageError={handleUploadImageError}
                />
                <PrivateInfoFieldset />
                <Button
                    className='profile-page__submit-btn'
                    type='primary'
                    htmlType='submit'
                    disabled={isDisabledBtn}
                    size='large'
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
