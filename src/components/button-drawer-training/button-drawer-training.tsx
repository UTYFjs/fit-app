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
    setAlertMessage,
    setCurrentTraining,
    updateNameCurrentTraining,
    updateStatusUserJointTrainingList,
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
import SaveErrorCard from '@components/modal-error/save-error-card/save-error-card';
import ModalError from '@components/modal-error/modal-error';
import { isPast } from '@utils/date-utils';
import moment from 'moment';

type ButtonDrawerTrainingProps = ButtonProps & {
    buttonClass?: string;
    btnText?: string;
    training?: ResTrainingType;
    isJoint?: boolean;
    isPeriodicity?: boolean;
    isEdit?: boolean;
    dataTestIdBtn?: string;
    onClickBtn?: (() => void) | null;
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
    drawerChildren,
    partnerUser,
    handleOnSave,
    ...rest
}: ButtonDrawerTrainingProps) => {
    const currentTraining = useAppSelector(getCurrentTraining);

    const [addTraining] = useAddTrainingMutation();
    const [updateTraining] = useUpdateTrainingMutation();
    const { data: allTrainingsByDay, refetch } = useGetTrainingsQuery();
    const [createInvite] = useCreateInviteMutation();
    const { data: dataTrainingList } = useGetTrainingListQuery();

    const dispatch = useAppDispatch();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);

    // useEffect(() => {
    //     if (isDrawerOpen) {
    //         setNewExercises(structuredClone(currentTraining.exercises));
    //     }
    // }, [currentTraining.exercises, isDrawerOpen]);

    useEffect(() => {
        if (partnerUser) {
            dispatch(updateNameCurrentTraining(partnerUser.trainingType as TrainingNames));
        }
    }, [dispatch, partnerUser]);

    // const [newExercises, setNewExercises] = useState(currentTraining.exercises);
    const [forRemoveIdxExercises, setForRemoveIdxExercises] = useState<number[]>([]);

    const handleOpenDrawer = () => {
        const currentTraining = training || structuredClone(defaultTraining);
        if (partnerUser) currentTraining.name = partnerUser.trainingType;
        dispatch(setCurrentTraining(currentTraining));
        setIsDrawerOpen(true);
    };
    const handleCloseDrawer = () => {
        // setNewExercises(newExercises.filter((item) => item.name));
        setForRemoveIdxExercises([]);
        setIsDrawerOpen(false);
    };

    const handleDrawerAction = async () => {
        handleOnSave && handleOnSave();
        if (isEdit) {
            const data = structuredClone(currentTraining);
            data.isImplementation = isPast(moment(currentTraining.date));
            await updateTraining(data)
                .unwrap()
                .then(() => {
                    refetch();
                    handleCloseDrawer();
                    dispatch(setAlertMessage('Тренировка успешно обновлена'));
                })
                .catch(() => {
                    setIsModalErrorOpen(true);
                });
        } else {
            await addTraining(currentTraining)
                .unwrap()
                .then(async (data) => {
                    partnerUser &&
                        isJoint &&
                        (await createInvite({
                            to: partnerUser.id,
                            trainingId: data._id,
                        })
                            .unwrap()
                            .then(() => {
                                dispatch(
                                    updateStatusUserJointTrainingList({
                                        ...partnerUser,
                                        status: 'pending',
                                    }),
                                );
                            }));
                    await refetch();
                    handleCloseDrawer();
                    dispatch(setAlertMessage('Новая тренировка успешно добавлена'));
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
        if (forRemoveIdxExercises.includes(index)) {
            setForRemoveIdxExercises((state) => state.filter((item) => item !== index));
        } else {
            setForRemoveIdxExercises((state) => [...state, index]);
        }
    };
    const handleRemove = () => {
        dispatch(removeExercises(forRemoveIdxExercises));
        setForRemoveIdxExercises([]);
    };
    const handleCloseErrorModal = () => {
        setIsModalErrorOpen(false);
        setIsDrawerOpen(false);
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
                                currentTraining.exercises.some((item) => item.name === '')
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
                                <p className='partner-card__name'>{partnerUser.name}</p>
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
                            size='small'
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
            <ModalError isOpen={isModalErrorOpen} width={416} isClosable={false}>
                <SaveErrorCard handlePrimeButton={handleCloseErrorModal} />
            </ModalError>
        </>
    );
};

export default ButtonDrawerTraining;
