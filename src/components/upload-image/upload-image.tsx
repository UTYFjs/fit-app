import { Button, Upload } from 'antd';
import './upload-image.css';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Endpoint, StatusCode, baseUrl, baseUrlForImg } from '@constants/api';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { getAccessToken, setUserInfo } from '@redux/user-slice';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload';
import ModalError from '@components/modal-error/modal-error';

import TooLargeFileCard from '@components/modal-error/too-large-file-card/too-large-file-card';

type UploadImagePropsType = {
    imgSrc: string;
    handlerError: () => void;
};

const UploadImage = ({ imgSrc, handlerError }: UploadImagePropsType) => {
    const [isModalError, setIsModalError] = useState(false);
    const accessToken = useAppSelector(getAccessToken);
    const dispatch = useAppDispatch();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const defaultFiles = [
        {
            uid: '1',
            name: 'avatar.jpg',
            url: imgSrc,
        },
    ];

    const [fileList, setFileList] = useState<UploadFile[]>(imgSrc ? defaultFiles : []);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth < 768);
    });

    const handleOnChange = (e: UploadChangeParam<UploadFile>) => {
        const uploadedFile = e.fileList[0];
        if (uploadedFile?.status === 'error') {
            if (
                uploadedFile?.response?.statusCode === StatusCode.CONFLICT ||
                uploadedFile.error?.status === StatusCode.CONFLICT
            ) {
                setIsModalError(true);
                handlerError();
            }
            setFileList([
                {
                    uid: 'error',
                    name: uploadedFile.name,
                    status: 'error',
                },
            ]);
        } else {
            dispatch(setUserInfo({ imgSrc: `${baseUrlForImg}/${uploadedFile?.response?.url}` }));
            setFileList(e.fileList);
        }
    };
    const handleOnRemove = () => {
        setFileList([]);
    };
    const handleCloseModalError = () => {
        setIsModalError(false);
    };

    return (
        <>
            <Upload
                action={`${baseUrl}/${Endpoint.UPLOAD_IMAGE}`}
                headers={{ authorization: `Bearer ${accessToken}` }}
                fileList={fileList}
                listType={isMobile ? 'picture' : 'picture-card'}
                progress={{ strokeWidth: 4, showInfo: false }}
                onChange={handleOnChange}
                onRemove={handleOnRemove}
            >
                {fileList.length > 0 ? null : (
                    <>
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
                    </>
                )}
            </Upload>
            <ModalError isOpen={isModalError} width={416} isClosable={false}>
                <TooLargeFileCard handlePrimeButton={handleCloseModalError} />
            </ModalError>
        </>
    );
};

export default UploadImage;
