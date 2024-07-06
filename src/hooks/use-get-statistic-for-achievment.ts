import { DateFormat } from '@constants/date';
import { useGetTrainingListQuery, useGetTrainingsQuery } from '@services/training-api';
import { ExerciseType, TrainingNames } from '../types/training-types';
import moment from 'moment';
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
    const { data: dataTrainingList } = useGetTrainingListQuery();

    let replays = 0;
    let approaches = 0;
    let avgDailyLoad = 0;
    let totalLoadForPeriod = 0;
    let mostFrequentTraining = '';
    let mostFrequentExercise = '';
    const avgLoadsByDay = [];
    const mostFrequentExercises: Record<string, number> = {};
    let mostFrequentExercisesByDay: Array<LegendItemData & { count: number }> = [];

    const mostFrequentTrainings = initMostFrequentTrainings(dataTrainingList || []);
    const exercisesCount: Record<string, number> = {};
    const exercisesCountByDayOfWeek = Array.from({ length: 7 }, () => ({
        exercises: {} as Record<string, number>,
    }));

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
            let totalLoadPerDay = 0;
            let countExercisesPerDay = 0;

            const getTotalLoadFromExercisesAndCountingStatistic = (
                exercises: ExerciseType[],
                date: string,
            ) => {
                const weekDay = moment(date).weekday();

                return exercises.reduce((acc, exercise) => {
                    const name = exercise.name;
                    approaches += exercise.approaches;
                    replays += exercise.replays;
                    countExercisesPerDay += 1;

                    if (Object.prototype.hasOwnProperty.call(exercisesCount, name)) {
                        exercisesCount[name] += 1;
                    } else {
                        exercisesCount[name] = 1;
                    }
                    if (
                        Object.prototype.hasOwnProperty.call(
                            exercisesCountByDayOfWeek[weekDay].exercises,
                            name,
                        )
                    ) {
                        exercisesCountByDayOfWeek[weekDay].exercises[name] += 1;
                    } else {
                        exercisesCountByDayOfWeek[weekDay].exercises[name] = 1;
                    }

                    return acc + exercise.approaches * exercise.replays * exercise.weight;
                }, 0);
            };

            dataTrainings[start.format(DateFormat.DASH_YYYY_MM_DD)].forEach((item) => {
                if (checkedTag === 'Все') {
                    mostFrequentTrainings[item.name] += 1;
                    const load = getTotalLoadFromExercisesAndCountingStatistic(
                        item.exercises,
                        item.date,
                    );
                    totalLoadPerDay += load;
                } else if (item.name === checkedTag) {
                    mostFrequentTrainings[item.name] += 1;
                    const load = getTotalLoadFromExercisesAndCountingStatistic(
                        item.exercises,
                        item.date,
                    );
                    totalLoadPerDay += load;
                }
            });

            avgLoadsByDay.push({
                date: start,
                value: +(totalLoadPerDay / countExercisesPerDay).toFixed(0),
            });
            totalLoadForPeriod += totalLoadPerDay;
        } else {
            avgLoadsByDay.push({
                date: start,
                value: 0,
            });
        }

        start = moment(start).add(1, 'days');
    }

    mostFrequentExercisesByDay = exercisesCountByDayOfWeek.map((item, index) => {
        const frequentExercise = Object.entries(item.exercises).reduce(
            (acc, item) => (item[1] > acc[1] ? item : acc),
            ['', 0],
        );

        if (frequentExercise[0])
            mostFrequentExercises[frequentExercise[0]] = exercisesCount[frequentExercise[0]];

        return {
            date: moment().isoWeekday(index + 1),
            value: frequentExercise[0],
            count: exercisesCount[frequentExercise[0]],
        };
    });

    avgDailyLoad = +(totalLoadForPeriod / period).toFixed(1);

    mostFrequentTraining = Object.entries(mostFrequentTrainings).reduce(
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

    mostFrequentExercise = Object.entries(mostFrequentExercises).reduce(
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
        replaysCount: replays,
        approachesCount: approaches,
        avgDailyLoad: avgDailyLoad,
        totalLoadForPeriod: totalLoadForPeriod,
        mostFrequentTraining: mostFrequentTraining,
        mostFrequentExercise: mostFrequentExercise,

        avgLoadsByDay: avgLoadsByDay,
        frequentExercises: mostFrequentExercises,
        frequentExercisesByDayOfWeek: mostFrequentExercisesByDay,
    };
};
