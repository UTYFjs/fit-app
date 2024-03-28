import { Button, Upload } from 'antd';
import './upload-image.css';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { StatusCode, baseUrlForImg } from '@constants/api';
import { useEffect, useState } from 'react';
import { UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload';
import ModalError from '@components/modal-error/modal-error';
import TooLargeFileCard from '@components/modal-error/too-large-file-card/too-large-file-card';
import { usePostUserAvatarMutation } from '@services/user-profile-api';
import { RcFile } from 'rc-upload/lib/interface';

type Upload<T> = {
    file: T;
};
type UploadImagePropsType = {
    imgSrc: string;
    handlerError: () => void;
};

const UploadImage = ({ imgSrc, handlerError }: UploadImagePropsType) => {
    const [isModalError, setIsModalError] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [postUserAvatar] = usePostUserAvatarMutation();
    const defaultFiles = [
        {
            uid: '1',
            name: 'avatar.jpg',
            url: imgSrc,
        },
    ];

    const [fileList, setFileList] = useState<UploadFile[]>(imgSrc ? defaultFiles : []);

    useEffect(() => {
        if (imgSrc) {
            setFileList([
                {
                    uid: '1',
                    name: 'avatar.jpg',
                    url: imgSrc,
                },
            ]);
        }
    }, [imgSrc]);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth < 768);
    });

    const customRequest: UploadProps['customRequest'] = async (options) => {
        const { file } = options;
        const formData = new FormData();

        formData.append('file', file);

        await postUserAvatar({ file: formData })
            .unwrap()
            .then((data) => {
                setFileList([
                    {
                        uid: 'done',
                        name: (file as RcFile).name,
                        status: 'done',
                        url: `${baseUrlForImg}/${data.url}`,
                    },
                ]);
            })
            .catch((e) => {
                if (e.status === StatusCode.CONFLICT) {
                    setFileList([
                        {
                            uid: 'error',
                            name: (file as RcFile).name,
                            status: 'error',
                        },
                    ]);
                    setIsModalError(true);
                    handlerError();
                }
            });
    };
    const handleOnChange = (e: UploadChangeParam<UploadFile>) => {
        const file = e.file;
        if (file.status === 'uploading' && file.size && file?.size > 5000000) {
            setFileList([
                {
                    uid: 'error',
                    name: file.name,
                    status: 'error',
                },
            ]);
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
                customRequest={customRequest}
                accept='image/*'
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
