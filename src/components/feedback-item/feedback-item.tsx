import { Avatar, Comment, Rate } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import './feedback-item.css';


const FeedbackItem = () => {
  return (
      <Comment
          className='feedback-item'
          avatar={
              <>
                  <Avatar size={42} icon={<UserOutlined />} />
                  <div>
                      <p className='feedback-item__name-owner'>Вероника</p>
                      <p className='feedback-item__name-owner'>Киверова</p>
                  </div>
              </>
          }
          author={
              <Rate
                  className='feedback__rating'
                  disabled
                  defaultValue={5}
                  style={{ lineHeight: '14px' }}
              />
          }
          datetime={<span> 17.10.2023</span>}
          content={
              <p className='feedback-item__content'>
                  Я очень довольна этим приложением! Оно помогает мне следить за своим здоровьем и
                  физической формой, предлагая разнообразные упражнения и питание. Я люблю, что
                  приложение адаптируется к моему уровню и целям, и дает мне полезные советы и
                  обратную связь. Я рекомендую это приложение всем, кто хочет улучшить свою жизнь!
              </p>
          }
      ></Comment>
  );
}

export default FeedbackItem
