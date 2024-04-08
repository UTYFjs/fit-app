import { Button, Divider } from 'antd';
import './joint-trainings.css';
import ButtonGroup from 'antd/lib/button/button-group';
import { PartnersList } from './partners-list/partners-list';
import { useGetTrainingsQuery, useLazyGetUserJointTrainingListQuery } from '@services/training-api';
import { Invite } from './invite/invite';
import { useGetInviteListQuery } from '@services/invite-api';
import { useState } from 'react';
import { UserJointList } from './users-joint-list/users-joint-list';
import { getFavoriteTraining } from '@utils/get-favourite-training';

export const JointTrainings = () => {
    const [
        getUserJointTrainingList,
        { data: dataUserJointTrainingList, isError: isErrorUserJointTrainingList },
    ] = useLazyGetUserJointTrainingListQuery();
    const { data: dataInviteList, isError: isErrorInviteList } = useGetInviteListQuery();
    //const [getTrainings, { data: MyTrainings }] = useLazyGetTrainingsQuery();
    const { data: MyTrainings } = useGetTrainingsQuery();
    console.log('dataInviteList', dataInviteList);

    const [isShowUsersJointList, setIsShowUsersJointList] = useState(false);

    const handleGetRandomPartnersList = async () => {
        try {
            await getUserJointTrainingList({}).unwrap();
            setIsShowUsersJointList(true);
        } catch {
            console.log('error');
        }
        console.log('случайный выбор партнеров', dataUserJointTrainingList);
    };
    const handleGetSimilarPartnersList = async () => {
        if (MyTrainings) {
            const favoriteTraining = getFavoriteTraining(MyTrainings);
            try {
                await getUserJointTrainingList({
                    trainingType: favoriteTraining,
                }).unwrap();
                setIsShowUsersJointList(true);
            } catch {
                console.log('error');
            }
        }

        console.log('выбор похожих партнеров');
    };
    const handleGoBack = () => setIsShowUsersJointList(false);

    if (dataUserJointTrainingList && isShowUsersJointList) {
        return <UserJointList users={dataUserJointTrainingList} handleGoBack={handleGoBack} />;
    }
    return (
        <div className='joint-training-wrapper'>
            {!!dataInviteList?.length && <Invite />}
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
