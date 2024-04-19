import { Button, Modal } from 'antd';
import './modal-feedback.css';
import TextArea from 'antd/lib/input/TextArea';
import { Rating } from '@components/rating/rating';

import { useEffect, useState } from 'react';

import { IRatingStar } from '../../types/api';
type ModalFeedbackProps = {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    setTextFeedBackValue: (value: string) => void;
    setRatingValue: (ratingStar: IRatingStar) => void;
    handleSubmitReview: () => void;
};

export const ModalFeedback = ({
    isOpen,
    setIsOpen,
    setTextFeedBackValue,
    setRatingValue,
    handleSubmitReview,
}: ModalFeedbackProps) => {
    const [isBtnDisable, setIsBtnDisable] = useState(true);
    const [innerRatingValue, setInnerRatingValue] = useState(0);
    useEffect(() => {
        innerRatingValue > 0 ? setIsBtnDisable(false) : setIsBtnDisable(true);
    }, [innerRatingValue]);
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
                    data-test-id='new-review-submit-button'
                >
                    {' '}
                    Опубликовать
                </Button>
            }
            onOk={() => setIsOpen(false)}
            onCancel={() => setIsOpen(false)}
            mask={true}
            maskClosable={true}
            maskStyle={{ backdropFilter: 'blur(5px)', background: 'rgba(121, 156, 212, 0.1)' }}
            width={539}
        >
            <Rating
                rating={0}
                fontSize={22}
                isDisable={false}
                onChange={(value) => {
                    setRatingValue(value);
                    setInnerRatingValue(value);
                }}
            />
            <TextArea
                onChange={(e) => {
                    setTextFeedBackValue(e.currentTarget.value);
                }}
                className='textarea_modal'
                autoSize={{ minRows: 2, maxRows: 20 }}
                placeholder='Расскажите, почему Вам понравилось наше приложение'
            />
        </Modal>
    );
};
