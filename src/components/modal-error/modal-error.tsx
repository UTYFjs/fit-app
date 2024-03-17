import { Button, Modal, notification } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import { ResultStatusType } from 'antd/lib/result';
import './modal-error.css';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { getCssVar } from '@utils/get-css-var';
import { CalendarDataTeatId } from '@constants/data-test-id';
import OpenErrorCard from './open-error-card/open-error-card';


type ModalErrorProps = {
  isOpen: boolean;
  children: ReactNode;
  width: number;
  isClosable?: boolean
  onCancel?: () => void
  //handlePrimeButton: () => void,

  handleSecondButton?: () => void,
};


const ModalError = ({ isOpen, children, width, isClosable = false, onCancel  }: ModalErrorProps) => {

  const handleOnClose = () => {
    console.log('handle onClose')
  }
  const handleButtonModal = () => {
    console.log('button modalhandle')
  }

  return (
    <Modal
      closable={isClosable}
      onCancel={onCancel}
      closeIcon={<CloseOutlined data-test-id={CalendarDataTeatId.MODAL_ERROR_USER_TRAINING_BUTTON_CLOSE} />}
      centered
      open={isOpen}
      footer={null}
      bodyStyle={{ minHeight: 144, padding: '16px 24px' }}
      mask={true}
      maskClosable={true}
      maskStyle={{ backdropFilter: 'blur(5px)', background: 'rgba(121, 156, 212, 0.1)' }}
      width={width}

    >
      {/* <OpenErrorCard handlePrimeButton={handleButtonModal}/> */}
      {children}
    </Modal>
  );
};

export default ModalError;
