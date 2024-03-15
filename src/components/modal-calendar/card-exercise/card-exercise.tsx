import { useState } from 'react';
import { Button, Card, Empty, Select } from 'antd';
import type { Moment } from 'moment';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import { ExerciseType, ResTrainingType, TrainingListType } from '../../../types/training-types';
import './card-exercise.css';
import DrawerCalendar from '@components/drawer-calendar/drawer-calendar';
import { useAddTrainingMutation, useGetTrainingsQuery } from '@services/training-api';

type CardExerciseProps = {
  calendarDate: Moment;
  selectedTraining: string;
  setSelectedTraining: (selectTraining: string) => void;
  currentTrainings: ResTrainingType[];
  trainingList: TrainingListType[];
  onClose: () => void;
  exercises?: ExerciseType[]
};
const defaultExercice = {
  name: '',
  replays: 1,
  weight: 0,
  approaches: 1,
  isImplementation: false,
}


const CardExercise = ({ calendarDate, selectedTraining, setSelectedTraining, currentTrainings = [], onClose, trainingList, exercises = [] }: CardExerciseProps) => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const [newExercises, setNewExercises] = useState<ExerciseType[]>(exercises )

  const [addTraining] = useAddTrainingMutation()
  const {refetch} = useGetTrainingsQuery()

  //const date = calendarDate.format('DD.MM.YYYY')

  //todo избавиться от key это для селекта
  const options = trainingList.filter((item) => !currentTrainings.some((curr) => curr.name === item.name)).map(({ name }) => ({ value: name, label: name }))



  const handleAddExercise = () => {
    setIsDrawerOpen(true)
  }
  const handleAddNewExercise = () => {
    setNewExercises((state) => [...state, {...defaultExercice}])
  }


  
  const onCloseDrawer = () => {
    setNewExercises((state) => state.filter((item) => item.name !== ''))
    setIsDrawerOpen(false)
  }

  const handleSave = () => { 
    console.log({ name: selectedTraining, date: calendarDate.format('YYYY-MM-DD') + 'T00:02:50.000Z', isImplementation: false, exercises: newExercises })
    addTraining({ name: selectedTraining, date: calendarDate.format('YYYY-MM-DD') +'T00:02:50.000Z', isImplementation: false, exercises: newExercises })
    refetch();
    onClose() }
  
  const handleChooseTraining = (newTraining: string) => {
    setSelectedTraining(newTraining)
  }

  return (
    <>
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
          disabled={!selectedTraining}
          type='ghost'
          size='middle'
          onClick={handleAddExercise}> Добавить упражнения</Button>
          <Button disabled={newExercises.length === 0} type='text' size='middle' onClick={handleSave}>Сохранить</Button></div>]}>
        <Meta
          title={
            <div className='card-exercise__title-wrapper'>
              <Button
                type='text'
                size='small'
                icon={<ArrowLeftOutlined />}
                onClick={onClose}
              />
              <Select className='training-list__select'
                    defaultValue={selectedTraining || 'Выбор типа тренировки' }
                    placeholder={<div>Выбор типа тренировки</div>}
                    size={'middle'}
                    options={options}
                    //bordered={false}
                    onChange={handleChooseTraining} />
            </div>}

        ></Meta>
        {<div className='card-exercise__content'>
          {newExercises?.map((item) => <div className='card-exercise__content-item' ><span> {item.name}</span> <EditOutlined className='badge__training-item_icon' /></div>)}
          
          {newExercises.length === 0 && (<Empty
            className=''
            image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
            imageStyle={{ height: 32 }}
            description=''
          />)}
        </div>}
      </Card>
      <DrawerCalendar 
        selectedTraining={selectedTraining}
        calendarDate={calendarDate}
        isDrawerOpen={isDrawerOpen}
        exercises={newExercises}
        handleAddExercise={handleAddNewExercise}
        onClose={onCloseDrawer}
        setNewExercises={setNewExercises} />
    </>
    

  );
};

export default CardExercise;
