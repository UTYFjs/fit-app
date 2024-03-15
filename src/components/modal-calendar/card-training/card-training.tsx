import { Button, Card, Empty } from 'antd';
import type { Moment } from 'moment';
import { CloseOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import './card-training.css';
import BadgeTraning from '@components/badge-training/badge-training';
import { ResTrainingType } from '../../../types/training-types';


type CardTrainingProps = {
  currentTrainings: ResTrainingType[];
  isDisableCreateBtn: boolean;
  calendarDate: Moment;
  onClose: () => void;
  onCreate: () => void;

};


const CardTraining = ({ currentTrainings = [], isDisableCreateBtn, calendarDate, onClose, onCreate }: CardTrainingProps) => {

  //console.log('currentTrainings', currentTrainings)
 const date = calendarDate.format('DD.MM.YYYY')

 
  return (
    <Card
      bordered={false}
      className='card-training'
      style={{ top: 0 }}
      bodyStyle={{padding: 0}}
      actions={[<Button
        style={{width:'100%' }}
        disabled={isDisableCreateBtn}
        type='primary'
        size='large'
        onClick={onCreate}
        
        > Создать тренировку</Button>]}>
      <Meta
        title={<div className='card-traning__title-wrapper'>
          <div><p className='card-training__title'>{`Тренировки на ${date || 'fake date'} `}</p>
            { !currentTrainings && <p className='card-training_subtitle'> Нет активных тренировок</p>  }
          </div>
            <Button
            data-test-id=''
            className='card-training__title-button'
            type='text'
            size='small'
            icon={<CloseOutlined />}  
            onClick={onClose}
          /> </div>}
 
      ></Meta>
      {<div className='card-training__content'>
        {currentTrainings && currentTrainings.map((item) => <BadgeTraning key={item._id + 'training'} text={item.name} isEditButton={true} onClickBadge={() =>{console.log('ddddd')}}/> )}
        {!currentTrainings && (<Empty
          className=''
          image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
          imageStyle={{ height: 32 }}
          description=''
        />)}
        </div>}

    </Card>

  );
};

export default CardTraining;
