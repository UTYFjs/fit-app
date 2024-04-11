import { useCreateInviteMutation } from '@services/invite-api';
import {
    useAddTrainingMutation,
    useGetTrainingsQuery,
    useUpdateTrainingMutation,
} from '@services/training-api';
import { useAppDispatch, useAppSelector } from './typed-react-redux-hooks';
import {
    getCurrentTraining,
    setAlertMessage,
    updateStatusUserJointTrainingList,
} from '@redux/training-slice';
import { isPast } from '@utils/date-utils';
import moment from 'moment';
import { ExerciseType, UserJointTrainingListType } from '../types/training-types';
import { AlertMessages } from '@constants/alert-messages';

type UseHandleDrawerActionProps = {
    isEdit: boolean;
    isJoint: boolean;
    handleCloseDrawer: () => void;
    setIsModalErrorOpen: (isOpen: boolean) => void;
    partnerUser?: UserJointTrainingListType;
    handleOnSave?: (exercises: ExerciseType[]) => void;
};
export const useHandleDrawerTrainingAction = ({
    isEdit,
    isJoint,
    handleCloseDrawer,
    setIsModalErrorOpen,
    partnerUser,
    handleOnSave,
}: UseHandleDrawerActionProps) => {
    const currentTraining = useAppSelector(getCurrentTraining);
    const [addTraining] = useAddTrainingMutation();
    const [updateTraining] = useUpdateTrainingMutation();
    const [createInvite] = useCreateInviteMutation();
    const { refetch } = useGetTrainingsQuery();
    const dispatch = useAppDispatch();

    return async () => {
        if (isEdit) {
            const data = structuredClone(currentTraining);
            data.isImplementation = isPast(moment(currentTraining.date));
            await updateTraining(data)
                .unwrap()
                .then(() => {
                    refetch();
                    handleOnSave && handleOnSave(data.exercises);
                    handleCloseDrawer();
                    dispatch(setAlertMessage(AlertMessages.SUCCESS_UPDATE_TRAINING));
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
                    dispatch(setAlertMessage(AlertMessages.SUCCESS_ADD_TRAINING));
                })
                .catch(() => {
                    setIsModalErrorOpen(true);
                });
        }
    };
};
