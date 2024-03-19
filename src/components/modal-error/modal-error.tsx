import { ReactNode } from 'react';

import { CloseOutlined } from '@ant-design/icons';
import { CalendarDataTeatId } from '@constants/data-test-id';
import { Modal } from 'antd';

type ModalErrorProps = {
    isOpen: boolean;
    children: ReactNode;
    width: number;
    isClosable?: boolean;
    onCancel?: () => void;
    handleSecondButton?: () => void;
};

const ModalError = ({ isOpen, children, width, isClosable = false, onCancel }: ModalErrorProps) => (
    <Modal
        closable={isClosable}
        onCancel={onCancel}
        closeIcon={
            <CloseOutlined
                data-test-id={CalendarDataTeatId.MODAL_ERROR_USER_TRAINING_BUTTON_CLOSE}
            />
        }
        centered
        open={isOpen}
        footer={null}
        bodyStyle={{ minHeight: 144, padding: '16px 24px' }}
        mask={true}
        maskClosable={true}
        maskStyle={{ backdropFilter: 'blur(5px)', background: 'rgba(121, 156, 212, 0.1)' }}
        width={width}
    >
        {children}
    </Modal>
);
export default ModalError;
