import { Button, Card, Select } from 'antd';
import type { Moment } from 'moment';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import { TrainingListType } from '../../../types/training-types';
import './card-exercise.css';

type CardExerciseProps = {
  calendarDate: Moment;
  onClose: () => void;
  addExercise: () => void;
  trainingList: TrainingListType[];

};


const CardExercise = ({ calendarDate, onClose, trainingList, addExercise }: CardExerciseProps) => {

  //const date = calendarDate.format('DD.MM.YYYY')

  const handle = () => { onClose() }
  const options = trainingList.map(({name, key}) => ({value:key, label: name }))

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
      actions={[<div className='card-training__actions-wrapper'><Button
        style={{ width: '100%' }}
        disabled={false}
        type='ghost'
        size='middle'
        onClick={addExercise}> Добавить упражнения</Button>
        <Button disabled={false} type='text' size='middle' onClick={handle}>Сохранить</Button></div>]}>
      <Meta
        title={
          <div className='card-exercise__title-wrapper'>
            <Button
              type='text'
              size='small'
              icon={<ArrowLeftOutlined />}
              onClick={onClose}
            />
            <Select className='training-list__select'  defaultValue='Выбор типа тренировки'  size={'middle'} options={options} bordered={false}  />
          </div>}

      ></Meta>
      {<div className='card-exercise__content'>
        {trainingList.map(() => {
          return (<div className='card-exercise__content-item' ><span> text</span> <EditOutlined /></div> )
        }) }
        <div className='card-exercise__content-item' ><span> text</span> <EditOutlined /></div>
      </div>}
    </Card>

  );
};

export default CardExercise;
