import { Button, Divider } from 'antd';
import './joint-trainings.css';
import ButtonGroup from 'antd/lib/button/button-group';
import { PartnersList } from './partners-list/partners-list';
import { useLazyGetUserJointTrainingListQuery } from '@services/training-api';
import { Invite } from './invite/invite';

export const JointTrainings: React.FC = () => {
    const [
        getUserJointTrainingList,
        { data: dataUserJointTrainingList, isError: isErrorUserJointTrainingList },
    ] = useLazyGetUserJointTrainingListQuery();

    const handleGetRandomPartnersList = () => {
        getUserJointTrainingList();
        console.log('случайный выбор партнеров');
    };
    const handleGetSimilarPartnersList = () => {
        console.log('выбор похожих партнеров');
    };

    return (
        <div className='joint-training-wrapper'>
            <Invite />
            <div className='joint-training__info'>
                <h3 className='joint-training__title'>
                    Хочешь тренироваться с тем, кто разделяет твои цели и темп? <br /> Можешь найти
                    друга для совместных тренировок среди других пользователей.
                </h3>
                <p className='joint-training__subtitle'>
                    Можешь воспользоваться случайным выбором или выбрать друга с похожим на твой
                    уровень и вид тренировки, и мы найдем тебе идеального спортивного друга.
                </p>
                <Divider />
                <ButtonGroup className='joint-training__button-group'>
                    <Button
                        className='joint-training__button-group__item'
                        type='text'
                        onClick={handleGetRandomPartnersList}
                    >
                        Случайный выбор
                    </Button>
                    <Button
                        className='joint-training__button-group__item'
                        type='text'
                        onClick={handleGetSimilarPartnersList}
                    >
                        Выбор друга по моим тренировкам
                    </Button>
                </ButtonGroup>
            </div>
            <PartnersList />
        </div>
    );
};
