
import { Button, Modal, Rate } from 'antd';
import './modal-feedback.css';
import TextArea from 'antd/lib/input/TextArea';
type ModalFeedbackProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}
const ModalFeedback = ({isOpen, setIsOpen}:ModalFeedbackProps) => {
    return (
        <Modal
            title='Ваш отзыв'
            //closable={false}
            centered
            visible={isOpen}
            footer={
                <Button type='primary' onClick={() => setIsOpen(false)}>
                    {' '}
                    Опубликовать{' '}
                </Button>
            }
            onOk={() => setIsOpen(false)}
            onCancel={() => setIsOpen(false)}
            mask={true}
            maskClosable={true}
            maskStyle={{ backdropFilter: 'blur(12px)', background: 'rgba(121, 156, 212, 0.1)' }}
            width={539}
        >
            <Rate defaultValue={3} />
            <TextArea
                className='textarea_modal'
                autoSize={{minRows: 2, maxRows:20}}
                style={{ height: 120, resize: 'both' }}
                placeholder='Расскажите, почему Вам понравилось наше приложение'
            />
        </Modal>
    );
};

export default ModalFeedback;
