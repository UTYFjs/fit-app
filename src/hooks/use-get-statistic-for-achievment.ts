import { DateFormat } from '@constants/date';
import { useGetTrainingsQuery, useLazyGetTrainingListQuery } from '@services/training-api';
import { TrainingNames } from '../types/training-types';
import moment from 'moment';
import { useLayoutEffect } from 'react';

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

    useLayoutEffect(() => {
        getTrainingList();
    }, [dataTrainings, getTrainingList]);

    let replays = 0;
    let approaches = 0;
    let avgDailyLoad = 0;
    const avgLoadsByDay = [];

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
            frequentDayExercise = {};
            avgLoadsByDay.push({
                date: start.format(DateFormat.DOT_DD_MM),
                value: Number(avg.toFixed(0)),
            });
        } else {
            avgLoadsByDay.push({
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
