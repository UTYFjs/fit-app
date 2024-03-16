import { Button, Card, Empty } from 'antd';
import type { Moment } from 'moment';
import { CloseOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import './card-training.css';
import BadgeTraning from '@components/badge-training/badge-training';
import { ResTrainingType } from '../../../types/training-types';
import { isPast } from '@utils/date-utils';
import { CalendarDataTeatId } from '@constants/data-test-id';


type CardTrainingProps = {
  currentTrainings: ResTrainingType[];
  isDisableCreateBtn: boolean;
  calendarDate: Moment;
  setSelectedTraining: (selectedTraining: string)=> void;
  onClose: () => void;
  onCreate: () => void;
  onEdit: () => void;

};


const CardTraining = ({ currentTrainings = [], 
                        isDisableCreateBtn, 
                        calendarDate, 
                        setSelectedTraining, 
                        onClose, 
                        onCreate, 
                        onEdit}: CardTrainingProps) => {

  //console.log('currentTrainings', currentTrainings)
 const date = calendarDate.format('DD.MM.YYYY')


  return (
    <Card
      
      className='card-training'
      bordered={false}
      style={{ top: 0 }}
      bodyStyle={{padding: 0}}
      data-test-id = {CalendarDataTeatId.MODAL_CREATE_TRAINING}
      actions={[<Button
                  style={{width:'100%' }}
                  disabled={isDisableCreateBtn || isPast(calendarDate)}
                  type='primary'
                  size='large'
                  onClick={onCreate}        
        > Создать тренировку</Button>]}>
      <Meta
        title={<div className='card-traning__title-wrapper'>
          <div><p className='card-training__title'>{`Тренировки на ${date || 'fake date'} `}</p>
            { currentTrainings.length === 0 && <p className='card-training_subtitle'> Нет активных тренировок</p>  }
          </div>
            <Button
            data-test-id={CalendarDataTeatId.MODAL_CREATE_TRAINING_BUTTON_CLOSE}
            className='card-training__title-button'
            type='text'
            size='small'
            icon={<CloseOutlined />}  
            onClick={onClose}
          /> </div>}
 
      ></Meta>
      {<div className='card-training__content'>
        {currentTrainings && currentTrainings.map((item) => 
        <BadgeTraning key={item._id + 'training'} 
                      isDisable={item.isImplementation}
                      text={item.name} 
                      isEditButton={true} 
            onClickBadge={() => { setSelectedTraining(item.name); onEdit()}}/> )}
        {currentTrainings.length === 0 && (<Empty
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
