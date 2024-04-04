import { Button } from 'antd';
import './my-trainings.css';
import ButtonDrawerCustom from '@components/button-drawer-training/button-drawer-training';

export const MyTrainings: React.FC = () => {
    return (
        <div className='my-trainings'>
            <p className='trainings-table__title_empty'>У вас еще нет созданных тренировок</p>
            <Button
                className='trainings__btn-create'
                type='primary'
                size='large'
                style={{ width: 'fit-content' }}
            >
                Создать тренировку
            </Button>
            <ButtonDrawerCustom buttonClass='trainings__btn-create' />
        </div>
    );
};
