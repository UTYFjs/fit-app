import { Button, Modal, Result } from 'antd';
import { useEffect, useState } from 'react';
import { ResultStatusType } from 'antd/lib/result';
import './modal-result.css';
type ModalErrorProps = {
    isOpen: boolean;
    typeContent: 'successReview' | 'errorReview' | null,
    handlePrimeButton: () => void,
    handleSecondButton?: () => void,
};

type DataModalType = {
    status: ResultStatusType;
    title: string;
    primeButtonText: string;
    subtitle?: string;
    secondButtonText?: string;
    dataTestId?: string;
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
];
const ModalResult = ({ isOpen, typeContent, handlePrimeButton, handleSecondButton }: ModalErrorProps) => {
  const [data, setData] = useState<DataModalType | null>(null);
  
  useEffect(() => {
  switch (typeContent) {
      case 'successReview':
          setData(dataModal[1]);
          break;
      case 'errorReview':
         setData(dataModal[0]);
          break;
      default:
          handlePrimeButton();
  }
  },[handlePrimeButton, typeContent])

    return (
        <Modal
            closable={false}
            centered
            open={isOpen}
            footer={null}
            bodyStyle={{ padding: 0 }}
            mask={true}
            maskClosable={true}
            maskStyle={{ backdropFilter: 'blur(5px)', background: 'rgba(121, 156, 212, 0.1)' }}
            width={539}
            className='modal-result'
        >
            <Result
                status={data?.status}
                title={data?.title}
                subTitle={data?.subtitle}
                extra={
                    <div className='modal-result__button-wrapper'>
                        <Button
                            type='primary'
                            size='large'
                            data-test-id={data?.dataTestId}
                            onClick={handlePrimeButton}                            
                        >
                            {data?.primeButtonText}
                        </Button>
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
                    </div>
                }
            />
        </Modal>
    );
};

export default ModalResult;
