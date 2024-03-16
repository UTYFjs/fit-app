import { useState } from 'react';
import { Button, Card, Empty, Select } from 'antd';
import type { Moment } from 'moment';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import { ExerciseType, ResTrainingType, TrainingListType } from '../../../types/training-types';
import './card-exercise.css';
import DrawerCalendar from '@components/drawer-calendar/drawer-calendar';
import { useAddTrainingMutation, useGetTrainingsQuery, useUpdateTrainingMutation } from '@services/training-api';
import { getExercises } from '@utils/get-exercises';
import { isPast } from '@utils/date-utils';

type CardExerciseProps = {
  options: {
    value: "Ноги" | "Руки" | "Силовая" | "Спина" | "Грудь";
    label: "Ноги" | "Руки" | "Силовая" | "Спина" | "Грудь";
  }[];
  calendarDate: Moment;
  selectedTraining: 'Ноги' | 'Руки' | 'Силовая' | 'Спина' | 'Грудь';
  setSelectedTraining: (selectTraining: string) => void;
  currentTrainings: ResTrainingType[];
  trainingList: TrainingListType[];
  onClose: () => void;
  isEditTraining: boolean
  setIsEditTraining: (value: boolean) => void
  exercises: ExerciseType[]
};

const defaultExercice = {
  name: '',
  replays: 1,
  weight: 0,
  approaches: 1,
  isImplementation: false,
}


const CardExercise = ({ options, 
                        calendarDate, 
                        selectedTraining, 
                        setSelectedTraining, 
                        currentTrainings = [], 
                        onClose, 
                        trainingList, 
                        exercises, 
                        isEditTraining = false, 
                        setIsEditTraining }: CardExerciseProps) => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const [newExercises, setNewExercises] = useState<ExerciseType[]>(getExercises(selectedTraining, currentTrainings))
  const [forRemoveIdxExercises, setForRemoveIdxExercises] = useState<number[]>([])

  const [addTraining] = useAddTrainingMutation()
  const [updateTraining] = useUpdateTrainingMutation()
  const { refetch } = useGetTrainingsQuery()

  //todo избавиться от key это для селекта
  //const options = trainingList.filter((item) => !currentTrainings.some((curr) => curr.name === item.name)).map(({ name }) => ({ value: name, label: name }))
  isPast(calendarDate);


  const handleAddExercise = () => {
    setIsDrawerOpen(true)
  }
  const handleAddNewExercise = () => {
    setNewExercises((state) => [...state, { ...defaultExercice }])
  }
  const handleEditExercise = () => {
    setIsDrawerOpen(true)
  }

  const onCloseDrawer = () => {
    setNewExercises((state) => state.filter((item) => item.name !== ''))
    setIsDrawerOpen(false)
  }

  const handleSave = () => {
    if (isEditTraining) {
      let data = currentTrainings.find((item) => item.name === selectedTraining)
      if (data) {
        data = JSON.parse(JSON.stringify(data)) as ResTrainingType
        data.exercises = newExercises
        data.isImplementation = isPast(calendarDate)
        console.log(data);
        updateTraining(data);
      }
    } else {
      addTraining({ name: selectedTraining, date: calendarDate.format('YYYY-MM-DD') + 'T00:02:50.000Z', isImplementation: false, exercises: newExercises })
    }
    refetch();
    onClose()
  }

  const handleChooseTraining = (newTraining: string) => {
    if (isEditTraining) { setIsEditTraining(false) }
    setNewExercises([]);
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
          <Button disabled={newExercises.length === 0 && !isEditTraining} type='text' size='middle' onClick={handleSave}>Сохранить</Button></div>]}>
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
                defaultValue={selectedTraining || 'Выбор типа тренировки'}
                placeholder={<div>Выбор типа тренировки</div>}
                size={'middle'}
                options={options}
                onChange={handleChooseTraining} />
            </div>}

        ></Meta>
        {<div className='card-exercise__content'>
          {newExercises?.map((item) => <div onClick={handleEditExercise} key={item.name + item.replays} className='card-exercise__content-item' ><span > {item.name}</span> <EditOutlined className='badge__training-item_icon' /></div>)}

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
        forRemoveIdxExercises={forRemoveIdxExercises}
        setForRemoveIdxExercises={setForRemoveIdxExercises}
        calendarDate={calendarDate}
        isDrawerOpen={isDrawerOpen}
        isEdit={isEditTraining}
        exercises={newExercises}
        handleAddExercise={handleAddNewExercise}
        onClose={onCloseDrawer}
        setNewExercises={setNewExercises} />
    </>


  );
};

export default CardExercise;
