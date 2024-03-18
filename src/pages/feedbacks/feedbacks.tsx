import FeedbackItem from '@components/feedback-item/feedback-item'
import './feedbacks.css'
import { Button, Card, List } from 'antd'
import { useEffect, useState } from 'react'
import ModalFeedback from '@components/modal-feedback/modal-feedback'
import ModalResult from '@components/modal-result/modal-result'
import ModalServerError from '@components/modal-server-error/modal-server-error'
import { useAddFeedbackMutation, useGetFeedbacksQuery } from '@services/feedback-api'
import { IRatingStar } from '../../types/api'
import { useNavigate } from 'react-router-dom'
import { Paths, StatusCode } from '@constants/api'
import { useAppDispatch } from '@hooks/typed-react-redux-hooks'
import { setAccessToken } from '@redux/user-slice'


const Feedbacks = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalResultOpen, setIsModalResultOpen] = useState(false);
    const [modalResultType, setModalResultType] = useState<'errorReview' | 'successReview' | null>(null);
    const [isAllFeedbacks, setIsAllFeedbacks] = useState(false);

    const [ratingValue, setRatingValue] = useState<IRatingStar>(3);
    const [textFeedbackValue, setTextFeedBackValue] = useState('')

    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const { data, error, isError, refetch } = useGetFeedbacksQuery('', {});

    const [addFeedback, { isError: isErrorAddFeedback, isSuccess: isSuccessAddFeedback }] = useAddFeedbackMutation();

    useEffect(() => {
        if (error) {
            if ('status' in error && error.status == StatusCode.FORBIDDEN) {
                dispatch(setAccessToken(''))
                localStorage.removeItem('accessToken')
                navigate(Paths.LOGIN)
            }
        }
    }, [dispatch, error, navigate]);

    useEffect(() => {
        setIsModalOpen(false);
        setModalResultType('errorReview');
        setIsModalResultOpen(true);
    }, [isErrorAddFeedback])

    useEffect(() => {
        setIsModalOpen(false);
        setModalResultType('successReview');
        setIsModalResultOpen(true);
        refetch();
    }, [isSuccessAddFeedback, refetch]);

    const feedbacks = isAllFeedbacks ? data : data?.slice(0, 4);

    const handleSendFeedBack = () => {
        addFeedback({ message: textFeedbackValue, rating: ratingValue })
    };
    const handleSuccessFeedback = () => {
        setIsModalResultOpen(false);
        setModalResultType(null);
    }
    const handleRetryErrorSendFeedback = () => {
        setIsModalResultOpen(false);
        setModalResultType(null)
        setIsModalOpen(true);
    }
    const handleCancelErrorFedback = () => {
        setIsModalOpen(false);
        setIsModalResultOpen(false);
        setModalResultType(null);
    }
    const handleShowAllFeedbacks = () => { setIsAllFeedbacks(!isAllFeedbacks) }


    return (
        <>
            {feedbacks && feedbacks.length > 0 && (
                <>
                    <List
                        className='feedback-list'
                        grid={{ column: 1 }}
                        dataSource={feedbacks}
                        renderItem={(item) => <FeedbackItem data={item} />}
                    />
                    <div className='feedback-action'>
                        <Button
                            type='primary'
                            size='large'
                            onClick={() => {
                                setIsModalOpen(true);
                            }}
                            data-test-id='write-review'
                        >
                            {' '}
                            Написать отзыв{' '}
                        </Button>
                        <Button
                            type='link'
                            size='large'
                            onClick={handleShowAllFeedbacks}
                            data-test-id='all-reviews-button'
                        >
                            {' '}
                            {isAllFeedbacks ? 'Cвернуть' : 'Развернуть'} все отзывы
                        </Button>
                    </div>
                </>
            )}
            {feedbacks?.length === 0 && (
                <div className='feedback-empty'>
                    <Card
                        title={<p className='feedback-empty__title'>Оставьте свой отзыв первым</p>}
                        bordered={false}
                    >
                        <p className='feedback-empty__content'>
                            Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.{' '}
                            <br />
                            Поделитесь своим мнением и опытом с другими пользователями, <br />и
                            помогите им сделать правильный выбор.
                        </p>
                    </Card>
                    <Button
                        className='feedback-empty__action'
                        type='primary'
                        size='large'
                        onClick={() => {
                            setIsModalOpen(true);
                        }}
                        data-test-id='write-review'
                    >
                        Написать отзыв
                    </Button>
                </div>
            )}
            <ModalFeedback
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
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

            {isError && <ModalServerError isOpen={isError} />}
        </>
    );
}

export default Feedbacks
