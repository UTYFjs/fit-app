import { Avatar, Comment, Rate } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import './feedback-item.css';
import { IFeedback } from '../../types/api';
import Rating from '@components/rating/rating';

type IFeedbackProps = {
    data: IFeedback
}

const FeedbackItem = ({data}: IFeedbackProps) => {

    const { id, fullName, imageSrc, message, rating, createdAt } = data;
    let firstName = '';
    let lastName = '';
    if(fullName){
        [firstName, lastName] = fullName.split(' ');
    }
    
    return (
        <Comment
            key={id}
            className='feedback-item'
            avatar={
                <>
                    {' '}
                    {imageSrc && <Avatar size={42} src={imageSrc} />}
                    {!imageSrc && <Avatar size={42} icon={<UserOutlined />} />}
                    <div>
                        <p className='feedback-item__name-owner'>
                            {fullName ? firstName : 'Пользователь'}
                        </p>
                        <p className='feedback-item__name-owner'>{lastName}</p>
                    </div>
                </>
            }
            author={
                <Rating rating={rating} isDisable={true}/>
                // <Rate
                //     className='feedback__rating'
                //     disabled
                //     defaultValue={rating}
                //     //style={{ lineHeight: '14px' }}
                // />
            }
            datetime={<span> {createdAt}</span>}
            content={<p className='feedback-item__content'>{message}</p>}
        ></Comment>
    );
};

export default FeedbackItem
