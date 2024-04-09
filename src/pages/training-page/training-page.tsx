import InDeveloping from '@pages/in-developing-page/in-developing-page';
import './training-page.css';
import { useGetTrainingsQuery, useLazyGetTrainingListQuery } from '@services/training-api';
import { useEffect, useLayoutEffect, useState } from 'react';
import ModalError from '@components/modal-error/modal-error';
import OpenErrorCard from '@components/modal-error/open-error-card/open-error-card';
import { Alert, Badge, Tabs } from 'antd';
import { Marathons } from '@components/trainings/marathons/marathons';
import { JointTrainings } from '@components/trainings/joint-trainings/joint-trainings';
import { MyTrainings } from '@components/trainings/my-trainings/my-trainings';

import classNames from 'classnames';
import { getSelectedTrainings } from '@utils/get-select-training';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { getInviteList } from '@redux/invite-slice';
import { TrainingDataTestId } from '@constants/data-test-id';
import { getAlertMessage, setAlertMessage } from '@redux/training-slice';
import { PeriodTextByValue } from '@constants/training';

const TrainingPage = () => {
    const { data: dataTrainings } = useGetTrainingsQuery();
    const [getTrainingList, { data: dataTrainingList, isError: IsErrorTrainingsList }] =
        useLazyGetTrainingListQuery();

    const inviteList = useAppSelector(getInviteList);
    const alertMessage = useAppSelector(getAlertMessage);
    const dispatch = useAppDispatch();

    const [isMarathon, setIsMarathon] = useState(false);
    const [isOpenModalError, setIsOpenModalError] = useState(false);
    const tabItems = [
        { label: 'Мои тренировки', key: 'myTrainings', children: <MyTrainings /> }, // remember to pass the key prop
        {
            label: (
                <>
                    {'Совместные тренировки '}
                    <Badge count={inviteList.length ? inviteList.length : 0} />
                </>
            ),
            key: 'jointTrainings',
            children: <JointTrainings />,
        },
        { label: 'Марафоны', key: 'marathons', children: <Marathons /> },
    ];
    useLayoutEffect(() => {
        getTrainingList();
    }, [dataTrainings, getTrainingList]);

    useEffect(() => {
        if (IsErrorTrainingsList) {
            setIsOpenModalError(true);
        }
    }, [IsErrorTrainingsList]);

    const handleUpdateRequest = () => {
        setIsOpenModalError(false);
        getTrainingList();
    };

    const OnChangeTabs = (key: string) => {
        console.log(key, tabItems[2].key);
        setIsMarathon(key === tabItems[2].key ? true : false);
    };
    console.log('test PeriodTextByValue', PeriodTextByValue[1]);
    return (
        <div className={classNames('training-page', isMarathon && 'training-page_marathon')}>
            {' '}
            <Tabs items={tabItems} centered onChange={OnChangeTabs} />
            {IsErrorTrainingsList && (
                <ModalError
                    isOpen={isOpenModalError}
                    width={384}
                    isClosable={true}
                    onCancel={() => {
                        setIsOpenModalError(false);
                    }}
                >
                    <OpenErrorCard handlePrimeButton={handleUpdateRequest} />
                </ModalError>
            )}
            {alertMessage && (
                <Alert
                    className='training__success-alert'
                    data-test-id={TrainingDataTestId.CREATE_TRAINING_SUCCESS_ALERT}
                    message={alertMessage}
                    type='success'
                    showIcon
                    closable
                    onClose={() => {
                        dispatch(setAlertMessage(''));
                    }}
                />
            )}
        </div>
    );
};
export default TrainingPage;
