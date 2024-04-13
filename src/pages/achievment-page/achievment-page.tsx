import './achievment-page.css';
import { useGetTrainingsQuery, useLazyGetTrainingListQuery } from '@services/training-api';
import { useLayoutEffect, useState } from 'react';
import { Space, Tabs } from 'antd';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import { TrainingNames } from '../../types/training-types';
import { getTrainingTagNames } from '@utils/get-training-tag-names';
import moment from 'moment';
import { DateFormat } from '@constants/date';
import { ColumnChart } from '@components/column-chart/column-chart';
import { ColumnChartLegend } from '@components/column-chart-legend/column-chart-legend';

export const AchievmentPage = () => {
    const { data: dataTrainings } = useGetTrainingsQuery();
    const [getTrainingList, { data: dataTrainingList }] = useLazyGetTrainingListQuery();
    const [checkedTag, setCheckedTag] = useState<TrainingNames | 'Все'>('Все');

    useLayoutEffect(() => {
        getTrainingList();
    }, [dataTrainings, getTrainingList]);

    const currentData = [];
    //6 let start = moment().subtract(6, 'days');

    let start = moment().subtract(6, 'days');

    if (start.day() !== 1) {
        while (start.day() !== 1) {
            start.add(1, 'days');
        }
    }

    for (let i = 0; i < 7; i++) {
        if (
            dataTrainings &&
            Object.prototype.hasOwnProperty.call(
                dataTrainings,
                start.format(DateFormat.DASH_YYYY_MM_DD),
            )
        ) {
            let avg = 0;
            dataTrainings[start.format(DateFormat.DASH_YYYY_MM_DD)].forEach((item) => {
                if (checkedTag === 'Все') {
                    const a = item.exercises.reduce(
                        (acc, exercise) =>
                            acc + exercise.approaches * exercise.replays * (exercise.weight || 1),
                        0,
                    );
                    avg += a;
                } else if (item.name === checkedTag) {
                    const a = item.exercises.reduce(
                        (acc, exercise) =>
                            acc + exercise.approaches * exercise.replays * (exercise.weight || 1),
                        0,
                    );
                    avg += a;
                }
            });
            currentData.push({
                date: start.format(DateFormat.DOT_DD_MM),
                value: avg,
            });
        } else {
            currentData.push({
                date: start.format(DateFormat.DOT_DD_MM),
                value: 0,
            });
        }
        start = moment(start).add(1, 'days');
    }
    const mostFrequentTrainings: Record<string, number> =
        dataTrainingList?.reduce((acc, item) => {
            const key = item.name;
            acc[key] = 0;
            return acc;
        }, {} as Record<string, number>) || {};
    const mostFrequentExercises: Record<string, number> = {};

    if (dataTrainings && dataTrainingList) {
        const allTrainings = Object.entries(dataTrainings)
            .map((item) => item[1])
            .flat()
            .forEach((training) => {
                training.exercises.forEach((exercise) => {
                    const load = +exercise.approaches * +exercise.replays * +exercise.weight;
                    if (
                        Object.prototype.hasOwnProperty.call(mostFrequentTrainings, training.name)
                    ) {
                        mostFrequentTrainings[training.name] += load;
                    } else {
                        mostFrequentTrainings[training.name] = load;
                    }

                    if (
                        Object.prototype.hasOwnProperty.call(mostFrequentExercises, exercise.name)
                    ) {
                        mostFrequentExercises[exercise.name] += load;
                    } else {
                        mostFrequentExercises[exercise.name] = load || 0;
                    }
                });
            });
        console.log(
            'самые частые',
            mostFrequentTrainings,
            mostFrequentExercises,
            dataTrainings,
            allTrainings,
        );
    }
    const mostFrequentTraining = Object.entries(mostFrequentTrainings).reduce(
        (acc, item) => {
            if (acc.value > item[1]) {
                return acc;
            }
            return { name: item[0], value: item[1] };
        },
        {
            name: '',
            value: 0,
        },
    ).name;
    const mostFrequentExercise = Object.entries(mostFrequentExercises).reduce(
        (acc, item) => {
            if (acc.value > item[1]) {
                return acc;
            }
            return { name: item[0], value: item[1] };
        },
        {
            name: '',
            value: 0,
        },
    ).name;

    const tabItems = [
        { label: 'За неделю', key: 'perWeek', children: <div>1</div> },
        {
            label: 'За месяц',
            key: 'perMonth',
            children: <div>2</div>,
        },
        { label: 'За все время (PRO)', key: 'allTime', children: <div>3</div>, disabled: true },
    ];
    //console.log('проверка', getStringDayOfWeekByNumber(28))
    const onChangeTabs = () => {};
    return (
        <div className='training-page'>
            <Tabs items={tabItems} centered onChange={onChangeTabs} />
            <Space direction='vertical' size='large'>
                <div>
                    <div>Тип тренировки:</div>{' '}
                    {getTrainingTagNames(['Все'], dataTrainingList).map((item) => (
                        <CheckableTag
                            key={item}
                            checked={item === checkedTag}
                            onChange={(checked) => {
                                if (checked) {
                                    setCheckedTag(item as TrainingNames);
                                }
                            }}
                        >
                            {item}{' '}
                        </CheckableTag>
                    ))}
                </div>

                <div className='load'>
                    <ColumnChart
                        currentData={currentData}
                        containerStyles={{ width: 520, height: 374 }}
                    />
                    <ColumnChartLegend currentData={currentData} />
                </div>
                <Space size='middle'>
                    {' '}
                    <div className='card-load'>
                        <div className='card-load__title'>
                            {currentData.reduce((acc, item) => acc + item.value, 0)}
                        </div>
                        <div className='card-load__subtitle'>Общая нагрузка, кг</div>
                    </div>
                    <div className='card-load'>
                        <div className='card-load__title'>
                            {currentData.reduce((acc, item) => acc + item.value, 0) / 7}
                        </div>
                        <div className='card-load__subtitle'>Нагрузка в день, кг</div>
                    </div>
                    <div className='card-load'>
                        <div className='card-load__title'></div>
                        <div className='card-load__subtitle'>Количество повторений, раз</div>
                    </div>
                    <div className='card-load'>
                        <div className='card-load__title'></div>
                        <div className='card-load__subtitle'>Подходы, раз</div>
                    </div>
                </Space>
                <div className='most-frequent'>
                    <div className='most-frequent__title'>Самая частая тренировка</div>
                    <div className='most-frequent__name'>{mostFrequentTraining}</div>
                    <div className='most-frequent__title'>Самое частое упражнение</div>
                    <div className='most-frequent__name'>{mostFrequentExercise} </div>
                </div>
            </Space>
        </div>
    );
};
