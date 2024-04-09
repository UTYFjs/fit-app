import { Avatar, Button, Select } from 'antd';

import { ReactNode, useEffect, useState } from 'react';

import DrawerCustom from '@components/drawer-custom/drawer-custom';
import './button-drawer-training.css';
import { ButtonProps } from 'antd/lib/button/button';
import BadgeTraining from '@components/badge-training/badge-training';
import {
    ResTrainingType,
    TrainingNames,
    UserJointTrainingListType,
} from '../../types/training-types';
import { EditOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { DrawerPeriodicity } from './drawer-periodicity/drawer-periodicity';
import { ExerciseForm } from './exercise-form/exercise-form';
import { DrawerFooterAction } from './drawer-footer-actions/drawer-footer-actions';
import { defaultTraining } from '@constants/training';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    getCurrentTraining,
    removeExercises,
    setCurrentTraining,
    updateNameCurrentTraining,
} from '@redux/training-slice';
import {
    useAddTrainingMutation,
    useGetTrainingListQuery,
    useGetTrainingsQuery,
    useUpdateTrainingMutation,
} from '@services/training-api';
import { getSelectedTrainings } from '@utils/get-select-training';
import { useCreateInviteMutation } from '@services/invite-api';
import { CalendarDataTeatId } from '@constants/data-test-id';

type ButtonDrawerTrainingProps = ButtonProps & {
    buttonClass?: string;
    btnText?: string;
    training?: ResTrainingType;
    isJoint?: boolean;
    isPeriodicity?: boolean;
    isEdit?: boolean;
    dataTestIdBtn?: string;
    onClickBtn?: (() => void) | null;
    //refetch?: () => void;
    drawerChildren?: ReactNode;
    partnerUser?: UserJointTrainingListType;
    handleOnSave?: () => void;
};
const ButtonDrawerTraining = ({
    buttonClass,
    btnText,
    training,
    isJoint = false,
    isPeriodicity = false,
    isEdit = false,
    dataTestIdBtn,
    onClickBtn,
    //refetch,
    drawerChildren,
    partnerUser,
    //check onSave isUse
    handleOnSave,
    ...rest
}: ButtonDrawerTrainingProps) => {
    const dispatch = useAppDispatch();
    const currentTraining = useAppSelector(getCurrentTraining);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [addTraining, { isError: isErrorAdd }] = useAddTrainingMutation();
    const [updateTraining, { isError: isErrorUpdate }] = useUpdateTrainingMutation();
    const { data: allTrainingsByDay, refetch } = useGetTrainingsQuery();
    const [createInvite, { isError: IsErrorCreateInvite }] = useCreateInviteMutation();

    const { data: dataTrainingList } = useGetTrainingListQuery();

    // const optionsTrainingSelect = getSelectedTrainings(
    //     dataTrainingList || [],
    //     allTrainingsByDay?.[
    //         new Date(currentTraining.date || new Date()).toISOString().split('T')[0]
    //     ] || [],
    //     currentTraining.name as TrainingNames,
    //     false,
    // );

    const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);

    useEffect(() => {
        if (isDrawerOpen) {
            setNewExercises(structuredClone(currentTraining.exercises));
        }
    }, [currentTraining.exercises, isDrawerOpen]);

    useEffect(() => {
        if (partnerUser) {
            dispatch(updateNameCurrentTraining(partnerUser.trainingType as TrainingNames));
            console.log('dispatch currentTraining AFTER pARTNERusER', currentTraining);
        }
    }, [dispatch, partnerUser]);

    const [newExercises, setNewExercises] = useState(currentTraining.exercises);
    const [forRemoveIdxExercises, setForRemoveIdxExercises] = useState<number[]>([]);

    // const [isModalResultOpen, setIsModalResultOpen] = useState(false);
    // const [modalResultType, setModalResultType] = useState<'errorReview' | 'successReview' | null>(
    //     null,
    // );

    // useEffect(() => {
    //     if (isErrorAddFeedback) {
    //         setIsModalFeedbackOpen(false);
    //         setModalResultType('errorReview');
    //         setIsModalResultOpen(true);
    //     }
    // }, [isErrorAddFeedback]);

    // useEffect(() => {
    //     if (isSuccessAddFeedback) {
    //         setIsModalFeedbackOpen(false);
    //         setModalResultType('successReview');
    //         setIsModalResultOpen(true);
    //         refetch && refetch();
    //     }
    // }, [isSuccessAddFeedback, refetch]);

    const handleOpenDrawer = () => {
        const currentTraining = training || structuredClone(defaultTraining);
        if (partnerUser) currentTraining.name = partnerUser.trainingType;
        dispatch(setCurrentTraining(currentTraining));
        setIsDrawerOpen(true);
    };
    const handleCloseDrawer = () => {
        setNewExercises(newExercises.filter((item) => item.name));
        setForRemoveIdxExercises([]);
        setIsDrawerOpen(false);
    };

    const handleDrawerAction = async () => {
        handleOnSave && handleOnSave();

        if (isEdit) {
            console.log('PERIODICITY EDIT  drawer Action');
            await updateTraining(currentTraining)
                .unwrap()
                .then(() => {
                    refetch();
                    handleCloseDrawer();
                })
                .catch(() => {
                    setIsModalErrorOpen(true);
                });
        } else {
            console.log('PERIODICITY NEW drawer Action');
            await addTraining(currentTraining)
                .unwrap()
                .then(async (data) => {
                    console.log('dataTraining from Handler', data._id);

                    partnerUser &&
                        isJoint &&
                        (await createInvite({ to: partnerUser.id, trainingId: data._id }).unwrap());
                    await refetch();
                    handleCloseDrawer();
                })
                .catch(() => {
                    setIsModalErrorOpen(true);
                });
        }
    };

    const handleChooseCurrentTrainingType = (trainingType: string) => {
        dispatch(updateNameCurrentTraining(trainingType as TrainingNames));
    };

    const handleOnChangeRemoveCheckbox = (index: number) => {
        console.log('before update remove', forRemoveIdxExercises);
        if (forRemoveIdxExercises.includes(index)) {
            setForRemoveIdxExercises((state) => state.filter((item) => item !== index));
        } else {
            setForRemoveIdxExercises((state) => [...state, index]);
        }
        console.log('after update remove', forRemoveIdxExercises);
    };

    // const handleOnChangeName = (name: string, index: number) => {
    //     setNewExercises((state) => {
    //         const newState = [...state];
    //         newState[index].name = name;
    //         return newState;
    //     });
    // };
    // const handleOnChangeReplays = (replays: number, index: number) => {
    //     setNewExercises((state) => {
    //         const newState = [...state];
    //         newState[index].replays = replays;
    //         return newState;
    //     });
    // };
    // const handleOnChangeWeight = (weight: number, index: number) => {
    //     setNewExercises((state) => {
    //         const newState = [...state];
    //         newState[index].weight = weight;
    //         return newState;
    //     });
    // };
    // const handleOnChangeApproaches = (approaches: number, index: number) => {
    //     setNewExercises((state) => {
    //         const newState = [...state];
    //         newState[index].approaches = approaches;
    //         return newState;
    //     });
    // };
    const handleRemove = () => {
        dispatch(removeExercises(forRemoveIdxExercises));
        setForRemoveIdxExercises([]);
    };

    return (
        <>
            <Button
                className={buttonClass}
                type='primary'
                size='large'
                onClick={onClickBtn ? onClickBtn : handleOpenDrawer}
                data-test-id={dataTestIdBtn}
                {...rest}
            >
                {btnText}
            </Button>
            <DrawerCustom
                drawerTitle={
                    <div className='drawer-button__title-wrapper'>
                        {isEdit ? <EditOutlined /> : <PlusOutlined />}
                        <div className='drawer-button__title'>
                            {' '}
                            {isEdit
                                ? 'Редактирование'
                                : isJoint
                                ? 'Совместная тренировка'
                                : 'Добавление упражнений'}
                        </div>
                    </div>
                }
                isDrawerOpen={isDrawerOpen}
                onClose={handleCloseDrawer}
                footer={
                    (isJoint || isPeriodicity) && (
                        <Button
                            type='primary'
                            size='large'
                            style={{ width: '100%' }}
                            onClick={handleDrawerAction}
                            disabled={
                                currentTraining.date === '' ||
                                currentTraining.name === '' ||
                                newExercises.some((item) => item.name === '')
                            }
                        >
                            {isJoint ? 'Отправить приглашение' : isPeriodicity && 'Сохранить'}
                        </Button>
                    )
                }
            >
                <div className='drawer-custom-wrapper'>
                    {isJoint && partnerUser && (
                        <div className='drawer__partner-info'>
                            <div className='partner-card__avatar'>
                                <Avatar
                                    size={42}
                                    src={partnerUser.imageSrc}
                                    alt={partnerUser.name}
                                    icon={!partnerUser.imageSrc && <UserOutlined />}
                                />
                                <div>
                                    <p className='partner-card__name'>
                                        {partnerUser.name.split(' ')[0]}
                                    </p>
                                    <p className='partner-card__name'>
                                        {partnerUser.name.split(' ')[1]}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <BadgeTraining text={partnerUser.trainingType} />
                            </div>
                        </div>
                    )}
                    {isPeriodicity && !isJoint && (
                        <Select
                            className='training-list__select'
                            data-test-id={CalendarDataTeatId.MODAL_CREATE_EXERCISE_SELECT}
                            defaultValue={currentTraining.name || 'Выбор типа тренировки'}
                            placeholder={<div>Выбор типа тренировки</div>}
                            size={'middle'}
                            disabled={isEdit}
                            options={getSelectedTrainings(
                                dataTrainingList || [],
                                allTrainingsByDay?.[
                                    new Date(currentTraining.date || new Date())
                                        .toISOString()
                                        .split('T')[0]
                                ] || [],
                                currentTraining.name as TrainingNames,
                                false,
                            )}
                            onChange={handleChooseCurrentTrainingType}
                        />
                    )}
                    {isPeriodicity && <DrawerPeriodicity />}
                    <div className='drawer-button__exercise-list'>
                        {currentTraining.exercises.map(
                            ({ approaches, name, replays, weight }, index) => (
                                <ExerciseForm
                                    key={index}
                                    isEdit={isEdit}
                                    name={name}
                                    approaches={approaches}
                                    replays={replays}
                                    weight={weight}
                                    index={index}
                                    forRemoveIdxExercises={forRemoveIdxExercises}
                                    //handleOnChangeApproaches={handleOnChangeApproaches}
                                    //handleOnChangeName={handleOnChangeName}
                                    //handleOnChangeReplays={handleOnChangeReplays}
                                    //handleOnChangeWeight={handleOnChangeWeight}
                                    handleOnChangeRemoveCheckbox={handleOnChangeRemoveCheckbox}
                                />
                            ),
                        )}
                    </div>
                    <DrawerFooterAction
                        isEdit={isEdit}
                        forRemoveIdxExercises={forRemoveIdxExercises}
                        handleRemove={handleRemove}
                    />
                    {drawerChildren}
                </div>
            </DrawerCustom>
            {/* <ModalResult
                isOpen={isModalResultOpen}
                typeContent={modalResultType}
                handlePrimeButton={
                    modalResultType === 'errorReview'
                        ? handleRetryErrorSendFeedback
                        : handleSuccessFeedback
                }
                handleSecondButton={handleCancelErrorFedback}
            /> */}
        </>
    );
};

export default ButtonDrawerTraining;
