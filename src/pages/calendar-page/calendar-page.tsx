import { Calendar } from 'antd'
import './calendar-page.css'
import { localeCalendar } from '@constants/calendar';
import { useGetTrainingListQuery, useGetTrainingsQuery } from '@services/training-api';
import type { Moment } from 'moment';
import { useEffect, useState } from 'react';

import CardTraining from '@components/modal-calendar/card-training/card-training';
import Portal from '@components/portal/portal';
import CardExercise from '@components/modal-calendar/card-exercise/card-exercise';

import { ResTrainingType } from '../../types/training-types';
import BadgeTraining from '@components/badge-training/badge-training';


const CalendarPage = () => {

  const [parentModal, setParentModal] = useState<Element | null>(null)
  const [typeModal, setTypeModal] = useState<'training' | 'exercise' | null>(null)

  const [calendarDate, setCalendarDate] = useState<Moment | null>(null);
  const [currentTrainings, setCurrentTrainings] = useState<ResTrainingType[]>([])

  //стейт для модалок
  const [selectedTraining, setSelectedTraining] = useState('')

  const { data: dataTrainings } = useGetTrainingsQuery();
  const { data: dataTrainingList } = useGetTrainingListQuery();

  useEffect(() => { if (dataTrainings && calendarDate) { 
    setCurrentTrainings(dataTrainings[calendarDate.format('YYYY-MM-DD')] || []); } }, [calendarDate, dataTrainings])


  const getDateCellRender = (data: Moment) => {
    const key = data.format('YYYY-MM-DD')
    const trainings = dataTrainings?.[key];
    return trainings && trainings.map((item) => <BadgeTraining key={item._id} text={item.name} isShort={true} />)
  }


  const onCloseModal = () => {
    setCalendarDate(null);
    setParentModal(null);
  }
  const handleBackToTraining = () => {
    setSelectedTraining('');
    setTypeModal('training');
  }
  const handleCreateTraining = () => {

    setTypeModal('exercise');
  }

  const onSelect = (data: Moment) => {
    setCalendarDate(data);
    const dateForSelector = data.format('YYYY-MM-DD');
    const parentForModal = document.querySelector(`[title="${dateForSelector}"]`)
    setSelectedTraining('');
    setParentModal(parentForModal);
    setTypeModal('training');
  }
  return (
    <div className='calendar-page'>
      <Calendar
        fullscreen={true}
        locale={localeCalendar}
        dateCellRender={getDateCellRender}
        onSelect={onSelect}
      />

      {parentModal && calendarDate && dataTrainingList && <Portal parent={parentModal}>
        {typeModal === 'training' && <CardTraining currentTrainings={currentTrainings} 
                                                  isDisableCreateBtn={currentTrainings.length === dataTrainingList?.length}
                                                   calendarDate={calendarDate} 
                                                   onClose={onCloseModal} 
                                                   onCreate={handleCreateTraining} />}
        {typeModal === 'exercise'  && <CardExercise selectedTraining={selectedTraining}
                                                                       setSelectedTraining={setSelectedTraining}
                                                                       currentTrainings={currentTrainings}
                                                                       calendarDate={calendarDate}
                                                                       onClose={handleBackToTraining}
                                                                       trainingList={dataTrainingList} />}

      </Portal>
      }


    </div>
  );
}

export default CalendarPage
