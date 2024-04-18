import { Button } from 'antd';
import './drawer-footer-actions.css';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { addNewExerciseToCurrentTraining, getCurrentTraining } from '@redux/training-slice';
import moment from 'moment';
import { isPast } from '@utils/date-utils';

type DrawerFooterActionProps = {
    isEdit: boolean;
    forRemoveIdxExercises: number[];
    handleRemove: () => void;
};

export const DrawerFooterAction = ({
    isEdit,
    forRemoveIdxExercises,
    handleRemove,
}: DrawerFooterActionProps) => {
    const dispatch = useAppDispatch();
 
    const handleAddExercise = () => dispatch(addNewExerciseToCurrentTraining());
    const currentTraining = useAppSelector(getCurrentTraining);
    console.log('current date', currentTraining.date, moment(currentTraining.date))
    return (
        <div className='drawer_footer-wrapper'>
            <div className='drawer-calendar__btn-wrapper'>
                <Button
                    className='drawer-calendar__btn-add'
                    onClick={() => {
                        handleAddExercise();
                    }}
                    type='text'
                    size='large'
                    icon={<PlusOutlined />}
                    style={{ width: '55%', display: 'flex', alignItems: 'center' }}
                >
                    Добавить ещё
                </Button>
                {isEdit && (
                    <Button
                        className='drawer-calendar__btn-remove'
                        onClick={handleRemove}
                        type='text'
                        size='large'
                        disabled={forRemoveIdxExercises.length === 0}
                        icon={<MinusOutlined />}
                        style={{ width: '45%', display: 'flex', alignItems: 'center' }}
                    >
                        Удалить
                    </Button>
                )}
            </div>
            {isPast(moment(currentTraining.date)) && (
                <div className='drawer__warning-message'>
                    После сохранения внесенных изменений отредактировать проведенную тренировку
                    будет невозможно{' '}
                </div>
            )}
        </div>
    );
};
