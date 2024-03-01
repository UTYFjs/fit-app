import FeedbackItem from '@components/feedback-item/feedback-item'
import './feedbacks.css'
import { Button, List } from 'antd'


const Feedbacks = () => {
  return (
      <>
          <List
              className='feedback-list'
              grid={{ column: 1 }}
              dataSource={[1, 1, 1, 1,]}
              renderItem={(item) => <FeedbackItem />}
          />
          <div className='feedback-action'>
            <Button type='primary' size='large'> Написать отзыв </Button> 
            <Button type='link' size='large'> Развернуть все отзывы</Button>
          </div>
      </>
  );
}

export default Feedbacks
