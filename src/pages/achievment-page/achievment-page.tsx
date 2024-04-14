import './achievment-page.css';
import { useGetTrainingsQuery, useLazyGetTrainingListQuery } from '@services/training-api';
import { useLayoutEffect, useMemo, useState } from 'react';
import { Button, Space, Tabs } from 'antd';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import { TrainingNames } from '../../types/training-types';
import { getTrainingTagNames } from '@utils/get-training-tag-names';
import moment from 'moment';
import { DateFormat } from '@constants/date';
import { ColumnChart } from '@components/column-chart/column-chart';
import { ColumnChartLegend } from '@components/column-chart-legend/column-chart-legend';
import { PieChart } from '@components/pie-chart/pie-chart';

export const AchievmentPage = () => {
    const { data: dataTrainings } = useGetTrainingsQuery();
    const [getTrainingList, { data: dataTrainingList }] = useLazyGetTrainingListQuery();
    const [checkedTag, setCheckedTag] = useState<TrainingNames | 'Все'>('Все');
    const [period, setPeriod] = useState(7);

    useLayoutEffect(() => {
        getTrainingList();
    }, [dataTrainings, getTrainingList]);

    let replays = 0;
    let approaches = 0;
    const currentData = [];

    const mostFrequentTrainings: Record<string, number> =
        dataTrainingList?.reduce((acc, item) => {
            const key = item.name;
            acc[key] = 0;
            return acc;
        }, {} as Record<string, number>) || {};

    const mostFrequentExercises: Record<string, number> = {};
    const mostFrequentExercisesByDay: Array<{ date: string; value: string }> = [];
    //6 let start = moment().subtract(6, 'days');

    const getMostFrequentExerciseByDayofWeek = (frequentDayExercise: Record<string, number>) => {
        // находим самое частое упражнение дня недели
        const mostExercise = Object.entries(frequentDayExercise).reduce(
            (acc, item) => {
                return acc.value > item[1] ? acc : { type: item[0], value: item[1] };
            },
            { type: '', value: 0 },
        );

        return {
            date: start.format(DateFormat.DOT_DD_MM),
            value: mostExercise.type,
        };
    };
    let start = moment().subtract(period - 1, 'days');

    if (start.day() !== 1) {
        while (start.day() !== 1) {
            start.add(1, 'days');
        }
    }

    for (let i = 0; i < period; i++) {
        if (
            dataTrainings &&
            Object.prototype.hasOwnProperty.call(
                dataTrainings,
                start.format(DateFormat.DASH_YYYY_MM_DD),
            )
        ) {
            let avg = 0;
            let frequentDayExercise: Record<string, number> = {};
            dataTrainings[start.format(DateFormat.DASH_YYYY_MM_DD)].forEach((item) => {
                if (checkedTag === 'Все') {
                    mostFrequentTrainings[item.name] += 1;

                    const load =
                        item.exercises.reduce((acc, exercise) => {
                            approaches += exercise.approaches;
                            replays += exercise.replays;
                            //const load = +exercise.approaches * +exercise.replays * +exercise.weight;
                            //считаем самые частые упражнения из всех
                            if (
                                Object.prototype.hasOwnProperty.call(
                                    mostFrequentExercises,
                                    exercise.name,
                                )
                            ) {
                                mostFrequentExercises[exercise.name] += 1;
                            } else {
                                mostFrequentExercises[exercise.name] = 1;
                            }

                            //считаем самые частые упражнения по дням недели
                            if (
                                Object.prototype.hasOwnProperty.call(
                                    frequentDayExercise,
                                    exercise.name,
                                )
                            ) {
                                frequentDayExercise[exercise.name] += 1;
                            } else {
                                frequentDayExercise[exercise.name] = 1;
                            }

                            return (
                                acc +
                                exercise.approaches * exercise.replays * (exercise.weight || 1)
                            );
                        }, 0) / item.exercises.length;
                    avg += load;
                } else if (item.name === checkedTag) {
                    const a = item.exercises.reduce(
                        (acc, exercise) =>
                            acc + exercise.approaches * exercise.replays * (exercise.weight || 1),
                        0,
                    );
                    avg += a;
                }
            });
            const result = getMostFrequentExerciseByDayofWeek(frequentDayExercise);
            mostFrequentExercisesByDay.push(result);
            console.log('ищем самое частое упражнение', result);
            frequentDayExercise = {};
            currentData.push({
                date: start.format(DateFormat.DOT_DD_MM),
                value: avg,
            });
        } else {
            currentData.push({
                date: start.format(DateFormat.DOT_DD_MM),
                value: 0,
            });
            mostFrequentExercisesByDay.push({
                date: start.format(DateFormat.DOT_DD_MM),
                value: '',
            });
        }
        start = moment(start).add(1, 'days');
    }

    // if (dataTrainings && dataTrainingList) {
    //     const allTrainings = Object.entries(dataTrainings)
    //         .map((item) => item[1])
    //         .flat()
    //         .forEach((training) => {
    //             training.exercises.forEach((exercise) => {
    //                 const load = +exercise.approaches * +exercise.replays * +exercise.weight;
    //                 if (
    //                     Object.prototype.hasOwnProperty.call(mostFrequentTrainings, training.name)
    //                 ) {
    //                     mostFrequentTrainings[training.name] += load;
    //                 } else {
    //                     mostFrequentTrainings[training.name] = load;
    //                 }

    //                 if (
    //                     Object.prototype.hasOwnProperty.call(mostFrequentExercises, exercise.name)
    //                 ) {
    //                     mostFrequentExercises[exercise.name] += load;
    //                 } else {
    //                     mostFrequentExercises[exercise.name] = load || 0;
    //                 }
    //             });
    //         });
    //     console.log(
    //         'самые частые',
    //         mostFrequentTrainings,
    //         mostFrequentExercises,
    //         dataTrainings,
    //         allTrainings,
    //     );
    // }

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

    const pieData = Object.entries(mostFrequentExercises).reduce((acc, item) => {
        acc.push({ type: item[0], value: item[1] });
        return acc;
    }, [] as Array<{ type: string; value: number }>);
    //console.log('pie data', pieData, mostFrequentExercises, mostFrequentTrainings);

    // const customLabel = (_, datum) => (
    //     <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
    //         <div
    //             style={{ width: 8, height: 8, background: 'rgba(0,0,0,0.4)', borderRadius: '50%' }}
    //         />
    //         <div>
    //             {datum.type} : <b>{datum.value}</b>
    //         </div>
    //     </div>
    // );

    const onChangeTabs = (key: string) => {
        switch (key) {
            case tabItems[0].key:
                setPeriod(7);
                break;
            case tabItems[1].key:
                setPeriod(28);
                break;
            case tabItems[2].key:
                setPeriod(1000);
                break;
        }
    };
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
                    <ColumnChartLegend
                        legendTitle='Средняя нагрузка по дням недели'
                        badgeData={currentData.map((item) => ({
                            date: item.date,
                            value: item.value ? `${item.value} кг` : '',
                        }))}
                        colorBadge={{
                            primary: 'var(--primary-light-6)',
                            secondary: 'var(--primary-light-1)',
                        }}
                        colorText={{
                            primary: 'var(--character-light-primary-inverse)',
                            secondary: 'var(--primary-light-6)',
                        }}
                    />
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
                            {Math.floor(currentData.reduce((acc, item) => acc + item.value, 0) / 7)}
                        </div>
                        <div className='card-load__subtitle'>Нагрузка в день, кг</div>
                    </div>
                    <div className='card-load'>
                        <div className='card-load__title'>{replays}</div>
                        <div className='card-load__subtitle'>Количество повторений, раз</div>
                    </div>
                    <div className='card-load'>
                        <div className='card-load__title'>{approaches}</div>
                        <div className='card-load__subtitle'>Подходы, раз</div>
                    </div>
                </Space>
                <div className='most-frequent'>
                    <div className='most-frequent__title'>Самая частая тренировка</div>
                    <div className='most-frequent__name'>{mostFrequentTraining}</div>
                    <div className='most-frequent__title'>Самое частое упражнение</div>
                    <div className='most-frequent__name'>{mostFrequentExercise} </div>
                </div>
                {/* <div>{pieData.length && <Pie {...configPie} />}</div> */}
                <div className='load'>
                    <div>{pieData.length && <PieChart pieData={pieData} />} </div>
                    <ColumnChartLegend
                        legendTitle='Самые частые упражнения по дням недели'
                        badgeData={mostFrequentExercisesByDay}
                        colorBadge={{
                            primary: 'var(--character-light-error)',
                            secondary: 'var(--red-1)',
                        }}
                        colorText={{
                            primary: 'var(--character-light-primary-inverse)',
                            secondary: 'var(--character-light-error)',
                        }}
                    />
                </div>
            </Space>
        </div>
    );
};
