import { Button } from 'antd';
import './my-trainings.css';
import ButtonDrawerCustom from '@components/button-drawer-training/button-drawer-training';
import { useGetTrainingListQuery, useGetTrainingsQuery } from '@services/training-api';
import { TrainingList } from './training-list.tsx/training-list';
import { useEffect } from 'react';
import { EditOutlined } from '@ant-design/icons';

export const MyTrainings = () => {
    const { data: dataTrainings } = useGetTrainingsQuery();
    const { isError: IsErrorTrainingsList } = useGetTrainingListQuery();

    //console.log('data Trainings', dataTrainings);
    return (
        <div className='my-trainings'>
            {dataTrainings && <TrainingList />}
            {!dataTrainings && (
                <p className='trainings-table__title_empty'>У вас еще нет созданных тренировок</p>
            )}
            {/* <Button
                className='trainings__btn-create'
                type='primary'
                size='large'
                style={{ width: 'fit-content' }}
            >
                Создать тренировку
            </Button> */}
            {!IsErrorTrainingsList && (
                <ButtonDrawerCustom
                    btnText='Создать тренировку'
                    icon={<EditOutlined style={{ fontSize: '14px' }} />}
                    buttonClass='trainings__btn-create'
                />
            )}
        </div>
    );
};
