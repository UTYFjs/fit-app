import { Button, Card, Empty } from 'antd';
import type { Moment } from 'moment';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import './card-training.css';
import BadgeTraning from '@components/badge-training/badge-training';
import { ResTrainingType } from '../../../types/training-types';
import { isPast } from '@utils/date-utils';
import { CalendarDataTeatId } from '@constants/data-test-id';
import ModalError from '@components/modal-error/modal-error';
import SaveErrorCard from '@components/modal-error/save-error-card/save-error-card';
import { getCssVar } from '@utils/get-css-var';


type CardTrainingProps = {
  currentTrainings: ResTrainingType[];
  isDisableCreateBtn: boolean;
  calendarDate: Moment;
  setSelectedTraining: (selectedTraining: string) => void;
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
  onEdit }: CardTrainingProps) => {

  //console.log('currentTrainings', currentTrainings)
  const date = calendarDate.format('DD.MM.YYYY')


  return (<Card

    className='card-training'
    bordered={false}
    style={{ top: 0 }}
    bodyStyle={{ padding: 0 }}
    data-test-id={CalendarDataTeatId.MODAL_CREATE_TRAINING}
    actions={[<Button
      style={{ width: '100%' }}
      disabled={isDisableCreateBtn || isPast(calendarDate)}
      type='primary'
      size='large'
      onClick={onCreate}
    > Создать тренировку</Button>]}>
    <Meta
      title={<div className='card-traning__title-wrapper'>
        <div><p className='card-training__title'>{`Тренировки на ${date || 'fake date'} `}</p>
          {currentTrainings.length === 0 && <p className='card-training_subtitle'> Нет активных тренировок</p>}
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
      {currentTrainings && currentTrainings.map((item, index) =>
        <div className='card-training__item' key={index}>
          <BadgeTraning key={item._id + 'training'}
            isDisable={item.isImplementation}
            text={item.name}
            onClickBadge={() => { setSelectedTraining(item.name); onEdit() }} />
          <Button className='badge__button'
            data-test-id={`${CalendarDataTeatId.MODAL_UPDATE_TRAINING_EDIT_BUTTON_INDEX}${index}`}
            type='text'
            size='small'
            disabled={item.isImplementation}
            onClick={() => { setSelectedTraining(item.name); onEdit() }}
            icon={<EditOutlined disabled={item.isImplementation}
              style={{ color: item.isImplementation ? getCssVar('--character-light-disable-25') : getCssVar('--primary-light-6') }}
            />} />
        </div>



      )}
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
