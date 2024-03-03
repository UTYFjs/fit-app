
import { Button, Modal } from 'antd';
import './modal-feedback.css';
import TextArea from 'antd/lib/input/TextArea';
import Rating from '@components/rating/rating';
import { useState } from 'react';
import { IRatingStar } from '../../types/api';
type ModalFeedbackProps = {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    setTextFeedBackValue: (value: string) => void;
    setRatingValue: (ratingStar: IRatingStar) => void;
    handleSubmitReview: () => void;
};


const ModalFeedback = ({isOpen, setIsOpen, setTextFeedBackValue, setRatingValue, handleSubmitReview}:ModalFeedbackProps) => {
    const [isBtnDisable, setIsBtnDisable] = useState(true);

    return (
        <Modal
            title={<p className='title_modal'>Ваш отзыв</p>}
            centered
            open={isOpen}
            footer={
                <Button
                    className='button_modal-send'
                    disabled={isBtnDisable}
                    type='primary'
                    size='large'
                    onClick={handleSubmitReview}
                    data-test-id= 'new-review-submit-button'
                >
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
            <Rating rating={0} fontSize={22} isDisable={false} onChange={(value) => {setIsBtnDisable(false);
                setRatingValue(value)}} />
            <TextArea
                onChange={(e) => {
                    setTextFeedBackValue(e.currentTarget.value);
                }}
                className='textarea_modal'
                autoSize={{ minRows: 2, maxRows: 20 }}
                placeholder='Расскажите, почему Вам понравилось наше приложение'
                onFocus={() => {
                    setIsBtnDisable(false);
                }}
            />
        </Modal>
    );
};

export default ModalFeedback;
