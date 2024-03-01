import { Button, Modal, Rate, Result } from 'antd';

import TextArea from 'antd/lib/input/TextArea';
import { resultData } from '@constants/result-data';
import { useEffect, useState } from 'react';
import { ResultStatusType } from 'antd/lib/result';
import './modal-result.css';
type ModalErrorProps = {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    typeContent: 'successReview' | 'errorReview' | 'errorServer'
};
type DataModaType={
  status: 500 | 'error' |'success',
  title: string,
  subtitle: string,
}
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
        status: '500',
        title: 'Что-то пошло не так',
        subtitle: 'Произошла ошибка, попробуйте ещё раз.',
        primeButtonText: 'Назад',
        secondButtonText: '',
        dataTestId: '',
    },
    {
        status: 'error',
        title: 'Данные не сохранились',
        subtitle: 'Что-то пошло не так. Попробуйте ещё раз.',
        primeButtonText: 'Написать отзыв',
        secondButtonText: 'Закрыть',
        dataTestId: 'write-review-not-saved-modal',
    },
    {
        status: 'success',
        title: 'Отзыв успешно опубликован',
        subtitle: '',
        primeButtonText: 'Отлично',
        secondButtonText: '',
        dataTestId: '',
    },
];
const ModalResult = ({ isOpen, setIsOpen, typeContent }: ModalErrorProps) => {
  const [data, setData] = useState<DataModalType | null>(null);
  useEffect(() => {
  switch (typeContent) {
      case 'successReview':
          setData(dataModal[2]);
          break;
      case 'errorReview':
         setData(dataModal[1]);
          break;
      case 'errorServer':
          setData(dataModal[0]);
          break;
      default:
          setIsOpen(false);
  }
  },[setIsOpen, typeContent])

    return (
        <Modal
            closable={false}
            centered
            visible={isOpen}
            footer={null}
            onOk={() => setIsOpen(false)}
            onCancel={() => setIsOpen(false)}
            bodyStyle={{padding: 0}}

            mask={true}
            maskClosable={true}
            maskStyle={{ backdropFilter: 'blur(12px)', background: 'rgba(121, 156, 212, 0.1)' }}
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
                            className={typeContent === 'errorServer' ? 'btn_fit-content' : ''}
                            type='primary'
                            size='large'
                            data-test-id={data?.dataTestId}
                            onClick={() => {
                                setIsOpen(false);
                            }}
                        >
                            {data?.primeButtonText}
                        </Button>
                        {data?.secondButtonText && <Button
                            className={''}
                            type='ghost'
                            size='large'
                            data-test-id={data?.dataTestId}
                            onClick={() => {
                                setIsOpen(false);
                            }}
                        >
                            {data?.secondButtonText}
                        </Button>}
                    </div>
                }
                className=''
            />
        </Modal>
    );
};

export default ModalResult;
