import { Button } from 'antd';

import { useEffect, useState } from 'react';

import { IRatingStar } from '../../types/api';
import ModalFeedback from '@components/modal-feedback/modal-feedback';
import { useAddFeedbackMutation } from '@services/feedback-api';
import ModalResult from '@components/modal-result/modal-result';

type ButtonModalFeedbackProps = {
    dataTestIdBtn?: string;
    refetch?: () => void;
};
const ButtonModalFeedback = ({ dataTestIdBtn, refetch }: ButtonModalFeedbackProps) => {
    const [isModalFeedbackOpen, setIsModalFeedbackOpen] = useState(false);
    const [isModalResultOpen, setIsModalResultOpen] = useState(false);
    const [modalResultType, setModalResultType] = useState<'errorReview' | 'successReview' | null>(
        null,
    );
    const [textFeedbackValue, setTextFeedBackValue] = useState('');
    const [ratingValue, setRatingValue] = useState<IRatingStar>(3);
    const [addFeedback, { isError: isErrorAddFeedback, isSuccess: isSuccessAddFeedback }] =
        useAddFeedbackMutation();

    useEffect(() => {
        if (isErrorAddFeedback) {
            setIsModalFeedbackOpen(false);
            setModalResultType('errorReview');
            setIsModalResultOpen(true);
        }
    }, [isErrorAddFeedback]);

    useEffect(() => {
        if (isSuccessAddFeedback) {
            setIsModalFeedbackOpen(false);
            setModalResultType('successReview');
            setIsModalResultOpen(true);
            refetch && refetch();
        }
    }, [isSuccessAddFeedback, refetch]);

    const handleOpenModalFeedback = () => setIsModalFeedbackOpen(true);

    const handleSendFeedBack = () =>
        addFeedback({ message: textFeedbackValue, rating: ratingValue });

    const handleSuccessFeedback = () => {
        setIsModalResultOpen(false);
        setModalResultType(null);
    };
    const handleRetryErrorSendFeedback = () => {
        setIsModalResultOpen(false);
        setModalResultType(null);
        setIsModalFeedbackOpen(true);
    };

    const handleCancelErrorFedback = () => {
        setIsModalFeedbackOpen(false);
        setIsModalResultOpen(false);
        setModalResultType(null);
    };

    return (
        <>
            <Button
                type='primary'
                size='large'
                onClick={handleOpenModalFeedback}
                data-test-id={dataTestIdBtn}
            >
                Написать отзыв
            </Button>
            <ModalFeedback
                isOpen={isModalFeedbackOpen}
                setIsOpen={setIsModalFeedbackOpen}
                setTextFeedBackValue={setTextFeedBackValue}
                setRatingValue={setRatingValue}
                handleSubmitReview={handleSendFeedBack}
            />
            <ModalResult
                isOpen={isModalResultOpen}
                typeContent={modalResultType}
                handlePrimeButton={
                    modalResultType === 'errorReview'
                        ? handleRetryErrorSendFeedback
                        : handleSuccessFeedback
                }
                handleSecondButton={handleCancelErrorFedback}
            />
        </>
    );
};

export default ButtonModalFeedback;
