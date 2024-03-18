import { Button, Modal, Result } from 'antd';
import styles from './modal-server-error.module.css';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@constants/api';
import { useState } from 'react';
type ModalErrorProps = {
    isOpen: boolean;
    dataTestId?: string
};

const ModalServerError = ({ isOpen, dataTestId }: ModalErrorProps) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isOpenModal, setIsOpenModal] = useState(isOpen)
    const navigate = useNavigate()
    const handleGoBack = () => {
        setIsOpenModal(false)
        navigate(Paths.MAIN)
    }
    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth < 768);
    });

    return (
        <Modal
            closable={false}
            centered
            open={isOpenModal}
            footer={null}
            bodyStyle={{ padding: '10px 24px' }}
            mask={true}
            maskClosable={true}
            maskStyle={{ backdropFilter: 'blur(12px)', background: 'rgba(121, 156, 212, 0.1)' }}
            width={isMobile ? 328 : 539}
            className={styles['modal-server-error']}
            data-test-id={dataTestId}
        >
            <Result
                status={500}
                title={'Что-то пошло не так'}
                subTitle={'Произошла ошибка, попробуйте ещё раз.'}
                extra={
                    <Button
                        className={styles['btn_fit-content']}
                        type='primary'
                        size='large'
                        onClick={handleGoBack}
                    >
                        Назад
                    </Button>
                }
                className=''
            />
        </Modal>
    );
};

export default ModalServerError;
