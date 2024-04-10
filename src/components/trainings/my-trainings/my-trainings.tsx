import './my-trainings.css';
import ButtonDrawerCustom from '@components/button-drawer-training/button-drawer-training';
import { useGetTrainingListQuery, useGetTrainingsQuery } from '@services/training-api';
import { TrainingList } from './training-list.tsx/training-list';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { getSelectedTrainings } from '@utils/get-select-training';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { getCurrentTraining } from '@redux/training-slice';
import { TrainingListType, TrainingNames, TransformResTrainingType } from '@types/training-types';
import { TrainingDataTestId } from '@constants/data-test-id';
import classNames from 'classnames';

export const MyTrainings = () => {
    const { data: dataTrainings } = useGetTrainingsQuery();
    const { isError: IsErrorTrainingsList } = useGetTrainingListQuery();

    //console.log('data Trainings', dataTrainings);
    return (
        <div className='my-trainings'>
            {Object.keys(dataTrainings || {})?.length ? (
                <TrainingList />
            ) : (
                <p className='trainings-table__title_empty'>У вас еще нет созданных тренировок</p>
            )}
            {!IsErrorTrainingsList && (
                <ButtonDrawerCustom
                    dataTestIdBtn={TrainingDataTestId.CREATE_NEW_TRAINING_BUTTON}
                    btnText={
                        Object.keys(dataTrainings || {})?.length
                            ? 'Новая тренировка'
                            : 'Создать тренировку'
                    }
                    isPeriodicity={true}
                    icon={
                        Object.keys(dataTrainings || {})?.length && (
                            <PlusOutlined style={{ fontSize: '14px' }} />
                        )
                    }
                    buttonClass={classNames(
                        'trainings__btn-create',
                        Object.keys(dataTrainings || {})?.length && 'trainings__btn-create_left',
                    )}
                />
            )}
        </div>
    );
};
