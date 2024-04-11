import { useState } from 'react';
import { Button, Card, Empty } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './exercise-info-card.css';
import { ExerciseType, ResTrainingType } from '../../../../types/training-types';
import { ButtonDrawerTraining } from '@components/button-drawer-training/button-drawer-training';
import { getBadgeColor } from '@utils/get-badge-color';

type CardExerciseProps = {
    record: ResTrainingType;
    onClose: () => void;
};

export const ExerciseInfoCard = ({ record, onClose }: CardExerciseProps) => {
    const [newExercises, setNewExercises] = useState<ExerciseType[]>(record.exercises);

    const handleAddExercise = (exercises: ExerciseType[]) => setNewExercises(exercises);

    return (
        <Card
            className='card-training'
            bordered={false}
            headStyle={{
                borderBottom: `3px solid ${getBadgeColor(record.name)}`,
                padding: 'var(--p-4xs) var(--p-m)',
            }}
            style={{
                top: 0,
                left: 12,
            }}
            title={
                <div className='card-exercise-info__title-wrapper'>
                    <Button
                        type='text'
                        size='small'
                        style={{ height: 16, width: 16 }}
                        icon={<ArrowLeftOutlined />}
                        onClick={onClose}
                    />
                    <p className='card-exercise__title'> {record.name}</p>
                </div>
            }
            actions={[
                <div key='actionAddTraining' className='card-training__actions-wrapper'>
                    <ButtonDrawerTraining
                        training={record}
                        isPeriodicity={true}
                        isJoint={false}
                        isEdit={true}
                        handleOnSave={handleAddExercise}
                        style={{ width: '100%' }}
                        type='ghost'
                        size='middle'
                        btnText='Добавить упражнения'
                    />
                </div>,
            ]}
        >
            <div className='card-exercise__content card-exercice-info__content'>
                {newExercises?.map((item, index) => (
                    <div key={index} className='card-exercise__content-item'>
                        <span> {item.name}</span>
                    </div>
                ))}

                {newExercises.length === 0 && (
                    <Empty
                        className=''
                        image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
                        imageStyle={{ height: 32 }}
                        description=''
                    />
                )}
            </div>
        </Card>
    );
};
