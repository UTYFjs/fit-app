import FeedbackItem from '@components/feedback-item/feedback-item';

import './feedbacks.css';
import { useEffect, useState } from 'react';

import ModalServerError from '@components/modal-server-error/modal-server-error';
import { Paths, StatusCode } from '@constants/api';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setExitApp } from '@redux/user-slice';
import { useGetFeedbacksQuery } from '@services/feedback-api';
import { Button, Card, List } from 'antd';
import { useNavigate } from 'react-router-dom';
import ButtonModalFeedback from '@components/button-modal-feedback/button-modal-feedback';
import { setExitAppUserInfo } from '@redux/profile-slice';

const Feedbacks = () => {
    const [isAllFeedbacks, setIsAllFeedbacks] = useState(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { data, error, isError, refetch } = useGetFeedbacksQuery('', {});

    useEffect(() => {
        if (error && 'status' in error && error.status == StatusCode.FORBIDDEN) {
            dispatch(setExitApp());
            dispatch(setExitAppUserInfo());
            localStorage.removeItem('accessToken');
            navigate(Paths.LOGIN);
        }
    }, [dispatch, error, navigate]);

    const feedbacks = isAllFeedbacks ? data : data?.slice(0, 4);

    const handleShowAllFeedbacks = () => setIsAllFeedbacks(!isAllFeedbacks);

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
                        <ButtonModalFeedback dataTestIdBtn='write-review' refetch={refetch} />
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
                    <ButtonModalFeedback dataTestIdBtn='write-review' refetch={refetch} />
                </div>
            )}
            {isError && <ModalServerError isOpen={isError} />}
        </>
    );
};

export default Feedbacks;
