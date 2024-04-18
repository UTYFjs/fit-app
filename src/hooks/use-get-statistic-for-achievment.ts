import { DateFormat } from '@constants/date';
import { useGetTrainingsQuery, useLazyGetTrainingListQuery } from '@services/training-api';
import { TrainingNames } from '../types/training-types';
import moment from 'moment';
import { useLayoutEffect } from 'react';
import { PeriodValues } from '@pages/achievment-page/achievment-page';
import { initMostFrequentTrainings } from '@utils/utils-for-achievement-statistics';
import { LegendItemData } from '@components/column-chart-legend/column-chart-legend';

type useGetStatisticsForAchievementProps = {
    period: number;
    checkedTag: TrainingNames | 'Все';
};
export const useGetStatisticsForAchievement = ({
    period,
    checkedTag,
}: useGetStatisticsForAchievementProps) => {
    const { data: dataTrainings } = useGetTrainingsQuery();
    const [getTrainingList, { data: dataTrainingList }] = useLazyGetTrainingListQuery();
    // moment.updateLocale('ru', {
    //     week: {
    //         dow: 1, // Monday is the first day of the week.
    //     },
    // });

    // const dateList = [
    //     moment('2024-04-18', 'YYYY-MM-DD'),
    //     moment('2024-04-19', 'YYYY-MM-DD'),
    //     moment('2024-04-20', 'YYYY-MM-DD'),
    //     moment('2024-04-21', 'YYYY-MM-DD'),
    //     moment('2024-04-22', 'YYYY-MM-DD'),
    // ];

    // dateList.forEach((date) =>
    //     console.log(`${date.format('YYYY-MM-DD')} is in week ${date.weekday()}`),
    // );
    useLayoutEffect(() => {
        getTrainingList();
    }, [dataTrainings, getTrainingList]);

    let replays = 0;
    let approaches = 0;
    let avgDailyLoad = 0;
    const avgLoadsByDay = [];
    const mostFrequentTrainings = initMostFrequentTrainings(dataTrainingList || []);
    // dataTrainingList?.reduce((acc, item) => {
    //     const key = item.name;
    //     acc[key] = 0;
    //     return acc;
    // }, {} as Record<string, number>) || {};

    const mostFrequentExercises: Record<string, number> = {};
    const mostFrequentExercisesByDay: Array<LegendItemData> = [];

    const getMostFrequentExerciseByDayofWeek = (frequentDayExercise: Record<string, number>) => {
        // находим самое частое упражнение дня недели
        const mostExercise = Object.entries(frequentDayExercise).reduce(
            (acc, item) => {
                return acc.value > item[1] ? acc : { type: item[0], value: item[1] };
            },
            { type: '', value: 0 },
        );
        return {
            result: {
                date: start,
                //date: start.format(DateFormat.DOT_DD_MM),
                value: mostExercise.type,
            },
            exerciseCount: mostExercise.value,
        };
    };

    let start = moment().subtract(period - 1, 'days');

    if (period === PeriodValues.perMonth && start.day() !== 1) {
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
                            // if (
                            //     Object.prototype.hasOwnProperty.call(
                            //         mostFrequentExercises,
                            //         exercise.name,
                            //     )
                            // ) {
                            //     mostFrequentExercises[exercise.name] += 1;
                            // } else {
                            //     mostFrequentExercises[exercise.name] = 1;
                            // }

                            //считаем самые частые упражнения по дням недели
                            //!!!!!!! нужно исправлять логику
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
                    //todo fix naming a
                    mostFrequentTrainings[item.name] += 1;
                    const a = item.exercises.reduce((acc, exercise) => {
                        approaches += exercise.approaches;
                        replays += exercise.replays;
                        //const load = +exercise.approaches * +exercise.replays * +exercise.weight;
                        //считаем самые частые упражнения из всех
                        // if (
                        //     Object.prototype.hasOwnProperty.call(
                        //         mostFrequentExercises,
                        //         exercise.name,
                        //     )
                        // ) {
                        //     mostFrequentExercises[exercise.name] += 1;
                        // } else {
                        //     mostFrequentExercises[exercise.name] = 1;
                        // }

                        //считаем самые частые упражнения по дням недели
                        if (
                            Object.prototype.hasOwnProperty.call(frequentDayExercise, exercise.name)
                        ) {
                            frequentDayExercise[exercise.name] += 1;
                        } else {
                            frequentDayExercise[exercise.name] = 1;
                        }

                        return (
                            acc + exercise.approaches * exercise.replays * (exercise.weight || 1)
                        );
                    }, 0);
                    avg += a;
                }
            });
            const { result, exerciseCount } =
                getMostFrequentExerciseByDayofWeek(frequentDayExercise);
            // console.log(`result, value`, result, exerciseCount);
            if (Object.prototype.hasOwnProperty.call(mostFrequentExercises, result.value)) {
                mostFrequentExercises[result.value] += exerciseCount;
            } else {
                mostFrequentExercises[result.value] = exerciseCount;
            }
            mostFrequentExercisesByDay.push(result);
            frequentDayExercise = {};
            console.log(
                'формируем дату',
                start.day(),
                start.format(DateFormat.DOT_DD_MM),
                Number(avg.toFixed(0)),
            );
            avgLoadsByDay.push({
                date: start,
                //date: start.format(DateFormat.DOT_DD_MM),
                value: Number(avg.toFixed(0)),
            });
        } else {
            avgLoadsByDay.push({
                date: start,
                //date: start.format(DateFormat.DOT_DD_MM),
                value: 0,
            });
            mostFrequentExercisesByDay.push({
                date: start,
                // date: start.format(DateFormat.DOT_DD_MM),
                value: '',
            });
        }
        start = moment(start).add(1, 'days');
    }

    //todo сделать из 4 недель - 1 неделю нужна дата, название упражнения(в mostFrequentExercisesByDay это value ) и количество повторов
    // const newFrequentExercises = Object.entries(mostFrequentExercises).reduce((acc, item) => {
    //     console.log('reduce frequentExercises', item[0], item[1]);
    // }, {});
    //mostFrequentExercisesByDay.reduce((acc, item) => {item.}, []);
    //возможно переделать
    avgDailyLoad = Math.floor(avgLoadsByDay.reduce((acc, item) => acc + item.value, 0) / 7);
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

    return {
        avgLoadsByDay: avgLoadsByDay, // для диаграммы
        avgDailyLoad: avgDailyLoad,
        approachesCount: approaches,
        replaysCount: replays,
        mostFrequentTraining: mostFrequentTraining, //for card
        mostFrequentExercise: mostFrequentExercise, //for card
        frequentExercises: mostFrequentExercises, // for diagramm
        frequentExercisesByDayOfWeek: mostFrequentExercisesByDay, //for legend
    };
};
