import { UserOutlined } from '@ant-design/icons';
import { Avatar, Comment } from 'antd';

import './feedback-item.css';
import { IFeedback } from '../../types/api';

import { Rating } from '@components/rating/rating';

type IFeedbackProps = {
    data: IFeedback;
};

export const FeedbackItem = ({ data }: IFeedbackProps) => {
    const { id, fullName, imageSrc, message, rating, createdAt } = data;
    let firstName = '';
    let lastName = '';
    if (fullName) {
        [firstName, lastName] = fullName.split(' ');
    }
    return (
        <Comment
            key={id}
            className='feedback-item'
            avatar={
                <>
                    {imageSrc && <Avatar size={42} src={imageSrc} />}
                    {!imageSrc && (
                        <Avatar
                            size={42}
                            icon={
                                <UserOutlined
                                    style={{ color: 'var(--character-light-title-85)' }}
                                />
                            }
                        />
                    )}
                    <div>
                        <p className='feedback-item__name-owner'>
                            {fullName ? firstName : 'Пользователь'}
                        </p>
                        <p className='feedback-item__name-owner'>{lastName}</p>
                    </div>
                </>
            }
            author={<Rating rating={rating} isDisable={true} />}
            datetime={<span> {createdAt}</span>}
            content={<p className='feedback-item__content'>{message}</p>}
        ></Comment>
    );
};
