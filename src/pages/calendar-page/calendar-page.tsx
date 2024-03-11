import {  Calendar } from 'antd'
import './calendar-page.css'
import { localeCalendar } from '@constants/calendar';
import { useGetTrainingListQuery, useGetTrainingsQuery } from '@services/training-api';
import type { Moment } from 'moment';
import { useState } from 'react';

import CardTraining from '@components/modal-calendar/card-training/card-training';
import Portal from '@components/portal/portal';
import CardExercise from '@components/modal-calendar/card-exercise/card-exercise';
import DrawerCalendar from '@components/drawer-calendar/drawer-calendar';



const CalendarPage = () => {
  //const [modalOpen, setModalOpen] = useState('');
  const [parentModal, setParentModal] = useState<Element | null>(null)
  const [typeModal, setTypeModal] = useState<'training' | 'exercise' | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [calendarDate, setCalendarDate] = useState<Moment | null>(null)

  //const { data: dataTrainings } = useGetTrainingsQuery();
  const { data: dataTrainingList } = useGetTrainingListQuery();


  
  // console.log('запросы', dataTrainings, dataTraningList)

  // const getDateCellRender = (data: Moment) => {
  //   return 
  // }

  // const getListData = (data: Moment) => {

  //   console.log('fff')
  // }
  const onCloseModal = () => {
    setCalendarDate(null);
    setParentModal(null);
  }
  const handleBackToTraining = () => {
    setTypeModal('training');
  }
  const handleCreateTraining = () => {
    setTypeModal('exercise');
  }
  const handleAddExercise = () => {
    setIsDrawerOpen(true)
  }
  const onCloseDrawer = () => {
    setIsDrawerOpen(false)
  }
  const onSelect = (data: Moment) => {
    setCalendarDate(data);
    const dateForSelector = data.format('YYYY-MM-DD');
    const parentForModal = document.querySelector(`[title="${dateForSelector}"]`)
    setParentModal(parentForModal);
    setTypeModal('training');
  }
  return (
    <div className='calendar-page'>
      <Calendar
        fullscreen={true}
        locale={localeCalendar}
        //dateCellRender={getDateCellRender}
        onSelect={onSelect}
      />

      {parentModal && calendarDate && <Portal parent={parentModal}>
        {typeModal === 'training' && <CardTraining calendarDate={calendarDate} onClose={onCloseModal} onCreate={handleCreateTraining} />}
        {typeModal === 'exercise' && dataTrainingList && <CardExercise calendarDate={calendarDate} onClose={handleBackToTraining} addExercise={handleAddExercise} trainingList={dataTrainingList}/>}
      </Portal>
      }
      <DrawerCalendar calendarDate={calendarDate} isDrawerOpen={isDrawerOpen} onClose={onCloseDrawer}/>

    </div>
  );
}

export default CalendarPage
