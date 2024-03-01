import FeedbackItem from '@components/feedback-item/feedback-item'
import './feedbacks.css'
import { Button, Card, List, Modal, Rate } from 'antd'
import { useState } from 'react'
import { ImportOutlined } from '@ant-design/icons'
import TextArea from 'antd/lib/input/TextArea'
import ModalFeedback from '@components/modal-feedback/modal-feedback'
import ModalError from '@components/modal-result/modal-result'
import ModalResult from '@components/modal-result/modal-result'
import ModalServerError from '@components/modal-server-error/modal-server-error'


const Feedbacks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)


const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
};

  return (
      <>
          {false && (
              <>
                  <List
                      className='feedback-list'
                      grid={{ column: 1 }}
                      dataSource={[1, 1, 1, 1]}
                      renderItem={(item) => <FeedbackItem />}
                  />
                  <div className='feedback-action'>
                      <Button type='primary' size='large'>
                          {' '}
                          Написать отзыв{' '}
                      </Button>
                      <Button type='link' size='large'>
                          {' '}
                          Развернуть все отзывы
                      </Button>
                  </div>
              </>
          )}
          <div className='feedback-empty'>
              <Card
                  title={<p className='feedback-empty__title'>Оставьте свой отзыв первым</p>}
                  bordered={false}
              >
                  <p className='feedback-empty__content'>
                      Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. <br />
                      Поделитесь своим мнением и опытом с другими пользователями, <br />и помогите
                      им сделать правильный выбор.
                  </p>
              </Card>
              <Button
                  className='feedback-empty__action'
                  type='primary'
                  size='large'
                  onClick={() => {
                      setIsModalOpen(true);
                  }}
              >
                  Написать отзыв
              </Button>
          </div>
        {true && <>  
        <ModalFeedback isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
          <ModalResult
              isOpen={isModalOpen}
              setIsOpen={setIsModalOpen}
              typeContent={'errorReview'}
          /> </>}
          {false && <ModalServerError isOpen={isModalOpen} setIsOpen={setIsModalOpen} />}
      </>
  );
}

export default Feedbacks
