import { Calendar } from 'antd'
import './calendar-page.css'
import { localeCalendar } from '@constants/calendar';
import { useGetTrainingListQuery, useGetTrainingsQuery, useLazyGetTrainingListQuery } from '@services/training-api';
import type { Moment } from 'moment';
import { useEffect, useState } from 'react';

import CardTraining from '@components/modal-calendar/card-training/card-training';
import Portal from '@components/portal/portal';
import CardExercise from '@components/modal-calendar/card-exercise/card-exercise';

import { ResTrainingType } from '../../types/training-types';
import BadgeTraining from '@components/badge-training/badge-training';
import { getSelectedTrainings } from '@utils/get-select-training';
import { getExercises } from '@utils/get-exercises';
import ModalError from '@components/modal-error/modal-error';
import OpenErrorCard from '@components/modal-error/open-error-card/open-error-card';


const CalendarPage = () => {

  const [parentModal, setParentModal] = useState<Element | null>(null)
  const [typeModal, setTypeModal] = useState<'training' | 'exercise' | null>(null)

  const [calendarDate, setCalendarDate] = useState<Moment | null>(null);
  const [currentTrainings, setCurrentTrainings] = useState<ResTrainingType[]>([])
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())

  //стейт для модалок
  const [selectedTraining, setSelectedTraining] = useState('')
  const [selectedExercises, setSelectedExercises] = useState(getExercises(selectedTraining, currentTrainings))
  const [isEditTraining, setIsEditTraining] = useState(false)

  const [isOpenModalError, setIsOpenModalError] = useState(false);


  const { data: dataTrainings } = useGetTrainingsQuery();
  //const { data: dataTrainingList, isError: IsErrorTrainingsList } = useGetTrainingListQuery();
  const [getTrainingList, { data: dataTrainingList, isError: IsErrorTrainingsList }] = useLazyGetTrainingListQuery();

  useEffect(() => { getTrainingList() }, [dataTrainings])
  useEffect(() => { if (IsErrorTrainingsList) { setIsOpenModalError(true) } }, [IsErrorTrainingsList])

  useEffect(() => {
    if (dataTrainings && calendarDate) {
      setCurrentTrainings(dataTrainings[calendarDate.format('YYYY-MM-DD')] || []);
    }
  }, [calendarDate, dataTrainings])

  useEffect(() => {
    setSelectedExercises(getExercises(selectedTraining, currentTrainings))
  }, [currentTrainings, selectedTraining])


  const getDateCellRender = (data: Moment) => {
    
    const key = data.format('YYYY-MM-DD')
    
    const trainings = dataTrainings?.[key];
    //console.log('datacellREnder start', key, dataTrainings);
    return trainings && trainings.map((item) => 
    <BadgeTraining key={item._id} isDisable={item.isImplementation} text={item.name} isShort={true} />)
  }


  const onCloseModal = () => {
    setCalendarDate(null);
    setParentModal(null);
  }
  const handleBackToTraining = () => {
    setIsEditTraining(false);
    setSelectedTraining('');
    setTypeModal('training');
  }
  const handleCreateTraining = () => {

    setTypeModal('exercise');
  }
  const handleEditTraining = () => {
    setIsEditTraining(true);
    setTypeModal('exercise');
  }

  const onSelect = (data: Moment) => {

    console.log('moment', data.days(), data.month())
    setCalendarDate(data);
    const dateForSelector = data.format('YYYY-MM-DD');
    const parentForModal = document.querySelector(`[title="${dateForSelector}"]`)
    setSelectedTraining('');
    setParentModal(parentForModal);
    setTypeModal('training');
  }
  const handleUpdateRequest = () => {
    setIsOpenModalError(false)
    getTrainingList()
  }
  return (
    <div className='calendar-page'>
      <Calendar
        fullscreen={true}
        locale={localeCalendar}
        dateCellRender={dataTrainingList && getDateCellRender}
        onSelect={onSelect}
      />

      {parentModal && calendarDate && dataTrainingList && <Portal parent={parentModal}>
        {typeModal === 'training' && <CardTraining currentTrainings={currentTrainings}
          isDisableCreateBtn={currentTrainings.length === dataTrainingList?.length}
          calendarDate={calendarDate}
          setSelectedTraining={setSelectedTraining}
          onClose={onCloseModal}
          onCreate={handleCreateTraining}
          onEdit={handleEditTraining} />}
        {typeModal === 'exercise' && <CardExercise selectedTraining={selectedTraining as 'Ноги' | 'Руки' | 'Силовая' | 'Спина' | 'Грудь'}
          setSelectedTraining={setSelectedTraining}
          currentTrainings={currentTrainings}
          calendarDate={calendarDate}
          onClose={handleBackToTraining}
          trainingList={dataTrainingList || []}
          isEditTraining={isEditTraining}
          setIsEditTraining={setIsEditTraining}
          exercises={selectedExercises}
          options={getSelectedTrainings(dataTrainingList || [], currentTrainings, selectedTraining as 'Ноги' | 'Руки' | 'Силовая' | 'Спина' | 'Грудь', isEditTraining)} />}

      </Portal>
      }

      {IsErrorTrainingsList && <ModalError isOpen={isOpenModalError} width={384} isClosable={true} onCancel={() => { setIsOpenModalError(false) }} >
        <OpenErrorCard handlePrimeButton={handleUpdateRequest} />
      </ModalError>}


    </div>
  );
}

export default CalendarPage
