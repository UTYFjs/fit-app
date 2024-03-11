import { Button, Card } from 'antd';
import type { Moment } from 'moment';
import { CloseOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import './card-training.css';
import BadgeTraning from '@components/badge-training/badge-training';


type CardTrainingProps = {
  calendarDate: Moment;
  onClose: () => void;
  onCreate: () => void;

};


const CardTraining = ({ calendarDate, onClose, onCreate }: CardTrainingProps) => {

 const date = calendarDate.format('DD.MM.YYYY')

  return (
    <Card
      bordered={false}
      className='card-training'
      style={{ top: 0 }}
      // title={<div className='card-traning__title-wrapper'> <p className='card-training__title'>{`Тренировки на ${date || 'fake date'} `}</p> <Button
      //   data-test-id=''

      //   type='text'
      //   size='small'
      //   icon={<CloseOutlined />}
      //   onClick={handle}
      // /> </div>}
      actions={[<Button
        style={{width:'100%' }}
        disabled={false}
        type='primary'
        size='large'
        onClick={onCreate}> Создать тренировку</Button>]}>
      <Meta
        title={<div className='card-traning__title-wrapper'>
          <div><p className='card-training__title'>{`Тренировки на ${date || 'fake date'} `}</p>
            <p className='card-training_subtitle'> Нет активных тренировок</p> </div> 
            <Button
            data-test-id=''

            type='text'
            size='small'
            icon={<CloseOutlined />}
            onClick={onClose}
          /> </div>}
 
      ></Meta>
      {<div className='card-training__content'>
        <BadgeTraning text={'руки'}/>
        </div>}
    </Card>

  );
};

export default CardTraining;
