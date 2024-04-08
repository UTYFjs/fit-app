import { useState } from 'react';

import { Button, Card, Empty } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import './exercise-info-card.css';
import DrawerCalendar from '@components/drawer-calendar/drawer-calendar';
// import ModalError from '@components/modal-error/modal-error';
// import SaveErrorCard from '@components/modal-error/save-error-card/save-error-card';
// import {
//     useAddTrainingMutation,
//     useGetTrainingsQuery,
//     useUpdateTrainingMutation,
// } from '@services/training-api';
// import { isPast } from '@utils/date-utils';
import Meta from 'antd/lib/card/Meta';
import { ExerciseType, ResTrainingType } from '../../../../types/training-types';
import ButtonDrawerTraining from '@components/button-drawer-training/button-drawer-training';
import moment from 'moment';
import getBadgeColor from '@utils/get-badge-color';
import { defaultExercise } from '@constants/training';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { getCurrentTraining } from '@redux/training-slice';

type CardExerciseProps = {
    record: ResTrainingType;
    onClose: () => void;
};

export const ExerciseInfoCard = ({ record, onClose }: CardExerciseProps) => {
    const currentTraining = useAppSelector(getCurrentTraining);
    console.log('from cardexercise CurrentTraining', currentTraining);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [newExercises, setNewExercises] = useState<ExerciseType[]>(record.exercises);
    const [forRemoveIdxExercises, setForRemoveIdxExercises] = useState<number[]>([]);

    // const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);

    // const [addTraining, { isError: isErrorAdd }] = useAddTrainingMutation();
    // const [updateTraining, { isError: isErrorUpdate }] = useUpdateTrainingMutation();
    // const { refetch } = useGetTrainingsQuery();

    // const handleCloseErrorModal = () => {
    //     setIsModalErrorOpen(false);
    //     onClose();
    // };

    const handleAddNewExercise = () =>
        setNewExercises((state) => [...state, { ...defaultExercise }]);

    const handleAddExercise = () => {
        if (!newExercises.length) {
            setNewExercises([{ ...defaultExercise }]);
        }
        setIsDrawerOpen(true);
    };

    const onCloseDrawer = () => {
        setNewExercises((state) => state.filter((item) => item.name !== ''));
        setIsDrawerOpen(false);
    };

    // const handleSave = async () => {
    //     if (isEditTraining) {
    //         let data = currentTrainings.find((item) => item.name === selectedTraining);
    //         if (data) {
    //             data = JSON.parse(JSON.stringify(data)) as ResTrainingType;
    //             data.exercises = newExercises;
    //             data.isImplementation = isPast(moment(record.date));
    //             await updateTraining(data)
    //                 .unwrap()
    //                 .then(() => {
    //                     refetch();
    //                     onClose();
    //                 })
    //                 .catch(() => {
    //                     setIsModalErrorOpen(true);
    //                 });
    //         }
    //     } else {
    //         await addTraining({
    //             name: record.name,
    //             date: record.date,
    //             isImplementation: false,
    //             exercises: newExercises,
    //         })
    //             .unwrap()
    //             .then(() => {
    //                 refetch();
    //                 onClose();
    //             })
    //             .catch(() => {
    //                 setIsModalErrorOpen(true);
    //             });
    //     }
    // };

    return (
        <>
            <Card
                className='card-training'
                //data-test-id={}

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
                            // data-test-id={CalendarDataTeatId.MODAL_EXERCISE_TRAINING_BUTTON_CLOSE}
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
                            style={{ width: '100%' }}
                            type='ghost'
                            size='middle'
                            btnText='Добавить упражнения'
                        />
                        <Button
                            style={{ width: '100%' }}
                            // disabled={!selectedTraining}
                            type='ghost'
                            size='middle'
                            onClick={handleAddExercise}
                        >
                            {' '}
                            Добавить упражнения
                        </Button>
                    </div>,
                ]}
            >
                <Meta></Meta>
                {
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
                }
            </Card>

            <DrawerCalendar
                selectedTraining={record.name}
                forRemoveIdxExercises={forRemoveIdxExercises}
                setForRemoveIdxExercises={setForRemoveIdxExercises}
                calendarDate={moment(record.date)}
                isDrawerOpen={isDrawerOpen}
                isEdit={false}
                exercises={newExercises}
                handleAddExercise={handleAddNewExercise}
                onClose={onCloseDrawer}
                setNewExercises={setNewExercises}
            />

            {/* {(isErrorAdd || isErrorUpdate) && (
                <ModalError isOpen={isModalErrorOpen} width={416} isClosable={false}>
                    <SaveErrorCard handlePrimeButton={handleCloseErrorModal} />
                </ModalError>
            )} */}
        </>
    );
};
