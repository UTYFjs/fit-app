import { Button, Table } from 'antd';
import './training-list.css';

import { useGetTrainingsQuery } from '@services/training-api';
import { DownOutlined, EditOutlined, EditTwoTone } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { ResTrainingType } from '../../../../types/training-types';
import BadgeTraining from '@components/badge-training/badge-training';

export const TrainingList = () => {
    const { data: dataTrainings } = useGetTrainingsQuery();
    console.log('data Trainings from TrainingList', dataTrainings);

    const trainingsList = Object.values(dataTrainings || {}).flat();
    console.log('data TrainingList', trainingsList);

    const columns: ColumnsType<ResTrainingType> = [
        {
            title: 'Тип тренировки',
            key: 'TrainingType',
            //width: 250,
            render: (_, record) => (
                <div className='training-list__type-cell' key={record._id}>
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
                        onClick={() => {}}
                    />
                </div>
            ),
        },
        {
            title: 'Сортировка по периоду',
            key: 'SortingByPeriod',
            //width: 250,
            render: (_, record) => (
                <div key={record._id + 'period'} className='training-list__type-cell'>
                    <p>{record.parameters?.period || 0}</p>
                </div>
            ),
            sorter: (a, b) => (a.parameters?.period || 0) - (b.parameters?.period || 0),
        },
        {
            key: 'action',
            width: 20,
            render: (_, record) => (
                <Button
                    key={record._id + 'btn'}
                    type='link'
                    disabled={record.isImplementation}
                    onClick={() => {}}
                    icon={
                        record.isImplementation ? (
                            <EditOutlined style={{ fontSize: '24px', color: 'red' }} />
                        ) : (
                            <EditTwoTone style={{ fontSize: '24px', color: 'red' }} />
                        )
                    }
                    style={{ padding: 0 }}
                    //data-test-id={}
                />
            ),
        },
    ];

    return (
        <div className='training-list-table'>
            <Table
                columns={columns}
                pagination={{ position: ['bottomLeft', 'bottomLeft'] }}
                size='small'
                dataSource={trainingsList}
            />
        </div>
    );
};
