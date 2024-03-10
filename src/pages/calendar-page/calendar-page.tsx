import {  Calendar } from 'antd'
import './calendar-page.css'
import { localeCalendar } from '@constants/calendar';
import { useGetTrainingListQuery, useGetTrainingsQuery } from '@services/training-api';




const CalendarPage = () => {
  const { data: dataTrainings} = useGetTrainingsQuery();
  const {data: dataTraningList  }= useGetTrainingListQuery();

  console.log('запросы', dataTrainings, dataTraningList)

  return (
    <div className ='calendar-page'>
        <Calendar 
          fullscreen={true}
          locale={localeCalendar}

        />
    </div>
  );
}

export default CalendarPage
