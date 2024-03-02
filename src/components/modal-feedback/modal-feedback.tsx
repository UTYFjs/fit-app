
import { Button, Modal, Rate } from 'antd';
import './modal-feedback.css';
import TextArea from 'antd/lib/input/TextArea';
import Rating from '@components/rating/rating';
type ModalFeedbackProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}
const ModalFeedback = ({isOpen, setIsOpen}:ModalFeedbackProps) => {

    
    return (
        <Modal
            title={<p className='title_modal'>Ваш отзыв</p>}
            //closable={false}
            centered
            visible={isOpen}
            footer={
                <Button className='button_modal-send' type='primary' size='large' onClick={() => setIsOpen(false)}>
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
            <Rating rating={3} fontSize={22} isDisable={false} />
            {
                //<Rate defaultValue={3} />
            }
            <TextArea
                className='textarea_modal'
                autoSize={{ minRows: 2, maxRows: 20 }}
                
                placeholder='Расскажите, почему Вам понравилось наше приложение'
            />
        </Modal>
    );
};

export default ModalFeedback;
