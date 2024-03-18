import { useState } from 'react';
import { Button, Card, Empty, Select } from 'antd';
import type { Moment } from 'moment';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import { ExerciseType, ResTrainingType } from '../../../types/training-types';
import './card-exercise.css';
import DrawerCalendar from '@components/drawer-calendar/drawer-calendar';
import { useAddTrainingMutation, useGetTrainingsQuery, useUpdateTrainingMutation } from '@services/training-api';
import { getExercises } from '@utils/get-exercises';
import { isPast } from '@utils/date-utils';
import ModalError from '@components/modal-error/modal-error';
import SaveErrorCard from '@components/modal-error/save-error-card/save-error-card';
import { CalendarDataTeatId } from '@constants/data-test-id';

type CardExerciseProps = {
  options: {
    value: "Ноги" | "Руки" | "Силовая" | "Спина" | "Грудь";
    label: "Ноги" | "Руки" | "Силовая" | "Спина" | "Грудь";
  }[];
  calendarDate: Moment;
  selectedTraining: 'Ноги' | 'Руки' | 'Силовая' | 'Спина' | 'Грудь';
  topPosition: number;
  setSelectedTraining: (selectTraining: string) => void;
  currentTrainings: ResTrainingType[];
  onClose: () => void;
  isEditTraining: boolean
  setIsEditTraining: (value: boolean) => void
};

const defaultExercise = {
  name: '',
  replays: 1,
  weight: 0,
  approaches: 1,
  isImplementation: false,
}

const CardExercise = ({ options,
  calendarDate,
  selectedTraining,
  topPosition,
  setSelectedTraining,
  currentTrainings = [],
  onClose,
  isEditTraining = false,
  setIsEditTraining }: CardExerciseProps) => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const [newExercises, setNewExercises] = useState<ExerciseType[]>(getExercises(selectedTraining, currentTrainings))
  const [forRemoveIdxExercises, setForRemoveIdxExercises] = useState<number[]>([])

  const [isModalErrorOpen, setIsModalErrorOpen] = useState(false)

  const [addTraining, { isError: isErrorAdd }] = useAddTrainingMutation()
  const [updateTraining, { isError: isErrorUpdate }] = useUpdateTrainingMutation()
  const { refetch } = useGetTrainingsQuery()

  const handleCloseErrorModal = () => {
    setIsModalErrorOpen(false);
    onClose();
  }

  const handleAddNewExercise = () => {
    setNewExercises((state) => [...state, { ...defaultExercise }])
  }
  const handleAddExercise = () => {
    if (!newExercises.length) { setNewExercises([{ ...defaultExercise }]) }
    setIsDrawerOpen(true)
  }
  const handleEditExercise = () => {
    setIsDrawerOpen(true)
  }

  const onCloseDrawer = () => {
    setNewExercises((state) => state.filter((item) => item.name !== ''))
    setIsDrawerOpen(false)
  }

  const handleSave = async () => {
    if (isEditTraining) {
      let data = currentTrainings.find((item) => item.name === selectedTraining)
      if (data) {
        data = JSON.parse(JSON.stringify(data)) as ResTrainingType;
        data.exercises = newExercises;
        data.isImplementation = isPast(calendarDate);
        await updateTraining(data).unwrap().then(() => {
          refetch();
          onClose()
        }).catch(() => {
          setIsModalErrorOpen(true)
        });
      }
    } else {
      await addTraining({ name: selectedTraining, date: calendarDate.format('YYYY-MM-DD') + 'T00:02:50.000Z', isImplementation: false, exercises: newExercises })
        .unwrap()
        .then(() => {
          refetch();
          onClose()
        })
        .catch(() => { setIsModalErrorOpen(true) })
    }
  }

  const handleChooseTraining = (newTraining: string) => {
    if (isEditTraining) { setIsEditTraining(false) }
    setNewExercises([]);
    setSelectedTraining(newTraining)
  }

  return (
    <>
      <Card
        className='card-training'
        data-test-id={CalendarDataTeatId.MODAL_CREATE_EXERCISE}
        bordered={false}
        style={{ top: topPosition, right: calendarDate.days() === 6 ? 0 : 'initial', left: topPosition > 0 ? 24 : 'initial' }}
        actions={[<div className='card-training__actions-wrapper'><Button
          style={{ width: '100%' }}
          disabled={!selectedTraining}
          type='ghost'
          size='middle'
          onClick={handleAddExercise}> Добавить упражнения</Button>
          <Button disabled={newExercises.length === 0 && !isEditTraining}
            type='text'
            size='middle'
            onClick={handleSave}>Сохранить изменения</Button>
        </div>]}>
        <Meta
          title={
            <div className='card-exercise__title-wrapper'>
              <Button
                data-test-id={CalendarDataTeatId.MODAL_EXERCISE_TRAINING_BUTTON_CLOSE}
                type='text'
                size='small'
                icon={<ArrowLeftOutlined />}
                onClick={onClose}
              />
              <Select className='training-list__select'
                data-test-id={CalendarDataTeatId.MODAL_CREATE_EXERCISE_SELECT}
                defaultValue={selectedTraining || 'Выбор типа тренировки'}
                placeholder={<div>Выбор типа тренировки</div>}
                size={'middle'}
                options={options}
                onChange={handleChooseTraining} />
            </div>}

        ></Meta>
        {<div className='card-exercise__content'>
          {newExercises?.map((item, index) =>
            <div
              key={index}
              className='card-exercise__content-item' >
              <span > {item.name}</span>

              <EditOutlined
                className='badge__training-item_icon'
                data-test-id={`${CalendarDataTeatId.MODAL_UPDATE_TRAINING_EDIT_BUTTON_INDEX}${index}`}
                onClick={handleEditExercise} />
            </div>)}

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

      {(isErrorAdd || isErrorUpdate) && <ModalError isOpen={isModalErrorOpen} width={416} isClosable={false}  >
        <SaveErrorCard handlePrimeButton={handleCloseErrorModal} />
      </ModalError>}
    </>
  );
};

export default CardExercise;
