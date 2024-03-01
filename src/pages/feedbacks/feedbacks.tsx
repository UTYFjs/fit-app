import FeedbackItem from '@components/feedback-item/feedback-item'
import './feedbacks.css'
import { Button, Card, List} from 'antd'
import { useState } from 'react'
import ModalFeedback from '@components/modal-feedback/modal-feedback'
import ModalResult from '@components/modal-result/modal-result'
import ModalServerError from '@components/modal-server-error/modal-server-error'
import { useGetFeedbacksQuery } from '@services/feedback-api'


const Feedbacks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAllFeedbacks, setIsAllFeedbacks] = useState(false)
  const { data, isError } = useGetFeedbacksQuery('', {});
  
  const feedbacks = isAllFeedbacks ? data : data?.slice(0,4)

  const handleShowAllFeedbacks = () => { setIsAllFeedbacks(!isAllFeedbacks)}


  return (
      <>
          {feedbacks && (
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
                      >
                          {' '}
                          Написать отзыв{' '}
                      </Button>
                      <Button type='link' size='large' onClick={handleShowAllFeedbacks}>
                          {' '}
                          { isAllFeedbacks? 'Cвернуть':'Развернуть'  } все отзывы
                      </Button>
                  </div>
              </>
          )}
          {!feedbacks && (
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
                  >
                      Написать отзыв
                  </Button>
              </div>
          )}
          <ModalFeedback isOpen={isModalOpen} setIsOpen={setIsModalOpen} />

          {
              //todo result modal

              false && (
                  <ModalResult
                      isOpen={isModalOpen}
                      setIsOpen={setIsModalOpen}
                      typeContent={'errorReview'}
                  />
              )
          }

          {isError && <ModalServerError isOpen={isError} setIsOpen={setIsModalOpen} />}
      </>
  );
}

export default Feedbacks
