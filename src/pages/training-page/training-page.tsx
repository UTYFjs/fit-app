import InDeveloping from '@pages/in-developing-page/in-developing-page';
import './training-page.css';
import { useGetTrainingsQuery, useLazyGetTrainingListQuery } from '@services/training-api';
import { useEffect, useLayoutEffect, useState } from 'react';
import ModalError from '@components/modal-error/modal-error';
import OpenErrorCard from '@components/modal-error/open-error-card/open-error-card';
import { Tabs } from 'antd';
import { Marathons } from '@components/trainings/marathons/marathons';
import { JointTrainings } from '@components/trainings/joint-trainings/joint-trainings';
import { MyTrainings } from '@components/trainings/my-trainings/my-trainings';

import classNames from 'classnames';

const tabItems = [
    { label: 'Мои тренировки', key: 'myTrainings', children: <MyTrainings /> }, // remember to pass the key prop
    { label: 'Совместные тренировки', key: 'jointTrainings', children: <JointTrainings /> },
    { label: 'Марафоны', key: 'marathons', children: <Marathons /> },
];

const TrainingPage = () => {
    const [isMarathon, setIsMarathon] = useState(false);
    const [isOpenModalError, setIsOpenModalError] = useState(false);
    const { data: dataTrainings } = useGetTrainingsQuery();
    const [getTrainingList, { data: dataTrainingList, isError: IsErrorTrainingsList }] =
        useLazyGetTrainingListQuery();

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
        </div>
    );
};
export default TrainingPage;
