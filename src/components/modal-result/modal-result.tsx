import { useEffect, useState } from 'react';

import { Button, Modal, Result } from 'antd';
import { ResultStatusType } from 'antd/lib/result';
import './modal-result.css';
import { getUserInfo } from '@redux/profile-slice';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Nullable } from '../../types/common-types';
type ModalErrorProps = {
    isOpen: boolean;
    typeContent: 'successReview' | 'errorReview' | 'sendPayment' | null;
    handlePrimeButton: () => void;
    handleSecondButton?: () => void;
    onClose?: () => void;
    dataTestId?: string;
};

type DataModalType = {
    status: ResultStatusType;
    title: string;
    primeButtonText?: string;
    subtitle?: string;
    secondButtonText?: string;
    dataTestId?: string;
    extraText?: string;
};

const dataModal: DataModalType[] = [
    {
        status: 'error',
        title: 'Данные не сохранились',
        primeButtonText: 'Написать отзыв',
        subtitle: 'Что-то пошло не так. Попробуйте ещё раз.',
        secondButtonText: 'Закрыть',
        dataTestId: 'write-review-not-saved-modal',
    },
    {
        status: 'success',
        title: 'Отзыв успешно опубликован',
        primeButtonText: 'Отлично',
    },
    {
        status: 'success',
        title: 'Чек для оплаты у вас на почте',
        extraText: 'Не пришло письмо? Проверьте папку Спам.',
    },
];
export const ModalResult = ({
    isOpen,
    typeContent,
    handlePrimeButton,
    handleSecondButton,
    onClose,
    dataTestId,
}: ModalErrorProps) => {
    const [data, setData] = useState<Nullable<DataModalType>>(null);
    const { email } = useAppSelector(getUserInfo);

    useEffect(() => {
        switch (typeContent) {
            case 'errorReview':
                setData(dataModal[0]);
                break;
            case 'successReview':
                setData(dataModal[1]);
                break;
            case 'sendPayment':
                setData(dataModal[2]);
                break;
            default:
                handlePrimeButton();
        }
    }, [handlePrimeButton, typeContent]);
    const subtitle =
        typeContent === 'sendPayment' ? (
            <span>
                Мы отправили инструкцию для оплаты вам на e-mail <b>{email}</b>. После подтверждения
                оплаты войдите в приложение заново.
            </span>
        ) : (
            data?.subtitle
        );

    return (
        <Modal
            data-test-id={dataTestId}
            closable={onClose ? true : false}
            onCancel={onClose}
            centered
            open={isOpen}
            footer={null}
            bodyStyle={{ padding: 0 }}
            mask={true}
            maskClosable={true}
            maskStyle={{ backdropFilter: 'blur(5px)', background: 'rgba(121, 156, 212, 0.1)' }}
            width={539}
            className={`modal-result ${typeContent === 'sendPayment' && 'modal-result_payment'}`}
        >
            <Result
                status={data?.status}
                title={data?.title}
                subTitle={subtitle}
                extra={
                    <div className='modal-result__button-wrapper'>
                        {data?.primeButtonText && (
                            <Button
                                type='primary'
                                size='large'
                                data-test-id={data?.dataTestId}
                                onClick={handlePrimeButton}
                            >
                                {data?.primeButtonText}
                            </Button>
                        )}
                        {data?.secondButtonText && (
                            <Button
                                className={''}
                                type='ghost'
                                size='large'
                                onClick={handleSecondButton}
                            >
                                {data?.secondButtonText}
                            </Button>
                        )}
                        {data?.extraText && (
                            <p className='modal-result__extra-text'>{data?.extraText}</p>
                        )}
                    </div>
                }
            />
        </Modal>
    );
};
