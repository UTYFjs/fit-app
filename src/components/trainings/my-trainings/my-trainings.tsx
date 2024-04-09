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
                    dataTestIdBtn={TrainingDataTestId.CREATE_NEW_TRAINING_BUTTON}
                    btnText='Создать тренировку'
                    isPeriodicity={true}
                    icon={<PlusOutlined style={{ fontSize: '14px' }} />}
                    buttonClass='trainings__btn-create'
                />
            )}
        </div>
    );
};
