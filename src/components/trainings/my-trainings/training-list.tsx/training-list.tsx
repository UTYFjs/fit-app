import { Button, Table } from 'antd';
import './training-list.css';

import { useGetTrainingsQuery } from '@services/training-api';
import { DownOutlined, EditOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { ResTrainingType } from '../../../../types/training-types';
import { BadgeTraining } from '@components/badge-training/badge-training';
import { ButtonDrawerTraining } from '@components/button-drawer-training/button-drawer-training';
import { useState } from 'react';
import { ExerciseInfoCard } from '../exercise-info-card/exercise-info-card';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { getCurrentTraining, setCurrentTraining } from '@redux/training-slice';
import { TrainingDataTestId } from '@constants/data-test-id';
import { PeriodTextByValue } from '@constants/training';

export const TrainingList = () => {
    const { data: dataTrainings } = useGetTrainingsQuery();
    const dispatch = useAppDispatch();

    const currentTraining = useAppSelector(getCurrentTraining);

    const trainingsList = Object.values(dataTrainings || {}).flat();

    const [isOpenTrainingModal, setIsOpenTrainingModal] = useState(false);

    const handleOpenTrainingModal = () => {
        setIsOpenTrainingModal(true);
    };
    const handleOnCloseTrainingModal = () => {
        setIsOpenTrainingModal(false);
    };

    const columns: ColumnsType<ResTrainingType> = [
        {
            title: 'Тип тренировки',
            key: 'TrainingType',
            render: (_, record) => (
                <div className='training-list__type-cell'>
                    <BadgeTraining text={record.name} />

                    <Button
                        icon={
                            <DownOutlined
                                style={{
                                    fontSize: 10,
                                    lineHeight: 24,
                                    color: 'var(--character-light-title-85)',
                                }}
                            />
                        }
                        type='link'
                        style={{ paddingRight: 0 }}
                        disabled={record.isImplementation}
                        onClick={() => {
                            dispatch(setCurrentTraining(record));
                            handleOpenTrainingModal();
                        }}
                    />
                    {isOpenTrainingModal && currentTraining._id === record._id && (
                        <ExerciseInfoCard record={record} onClose={handleOnCloseTrainingModal} />
                    )}
                </div>
            ),
        },
        {
            title: 'Периодичность',
            key: 'SortingByPeriod',
            render: (_, record) => (
                <div className='training-list__type-cell'>
                    <p>{PeriodTextByValue[record.parameters.period || 0]}</p>
                </div>
            ),
            sorter: (a, b) => (a.parameters?.period || 0) - (b.parameters?.period || 0),
        },
        {
            key: 'action',
            width: 20,
            render: (_, record, index) => (
                <ButtonDrawerTraining
                    dataTestIdBtn={`${TrainingDataTestId.UPDATE_MY_TRAINING_TABLE_ICON_INDEX}${index}`}
                    training={record}
                    isEdit={true}
                    isPeriodicity={true}
                    type='link'
                    disabled={record.isImplementation}
                    icon={
                        <EditOutlined
                            className={
                                record.isImplementation
                                    ? 'training-list__button-edit_disable'
                                    : 'training-list__button-edit'
                            }
                            style={{
                                fontSize: '24px',
                            }}
                        />
                    }
                />
            ),
        },
    ];

    return (
        <div className='training-list-table'>
            <Table
                data-test-id={TrainingDataTestId.MY_TRAININGS_TABLE}
                columns={columns}
                pagination={{ position: ['bottomLeft', 'bottomLeft'] }}
                size='small'
                dataSource={trainingsList}
                rowKey={(record) => record._id}
            />
        </div>
    );
};
