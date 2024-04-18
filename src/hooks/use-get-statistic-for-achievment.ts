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
    //const [getTrainingList, { data: dataTrainingList }] = useLazyGetTrainingListQuery();
    const { data: dataTrainingList } = useGetTrainingListQuery();

    // useLayoutEffect(() => {
    //     getTrainingList();
    // }, [dataTrainings, getTrainingList]);

    let replays = 0;
    let approaches = 0;
    let avgDailyLoad = 0;
    let totalLoadForPeriod = 0;
    const avgLoadsByDay = [];
    const mostFrequentTrainings = initMostFrequentTrainings(dataTrainingList || []);

    let mostFrequentExercises: Record<string, number> = {};
    let mostFrequentExercisesByDay: Array<LegendItemData & { count: number }> = [];

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
                value: mostExercise.type,
                count: mostExercise.value,
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
            let totalLoadPerDay = 0;
            let countExercisesPerDay = 0;
            const frequentDayExercise: Record<string, number> = {};

            const getTotalLoadFromExercises = (exercises: ExerciseType[]) =>
                exercises.reduce((acc, exercise) => {
                    approaches += exercise.approaches;
                    replays += exercise.replays;

                    countExercisesPerDay += 1;
                    //считаем самые частые упражнения по дням недели
                    //!!!!!!! нужно исправлять логику
                    if (Object.prototype.hasOwnProperty.call(frequentDayExercise, exercise.name)) {
                        frequentDayExercise[exercise.name] += 1;
                    } else {
                        frequentDayExercise[exercise.name] = 1;
                    }

                    return acc + exercise.approaches * exercise.replays * exercise.weight;
                }, 0);

            dataTrainings[start.format(DateFormat.DASH_YYYY_MM_DD)].forEach((item) => {
                if (checkedTag === 'Все') {
                    mostFrequentTrainings[item.name] += 1;
                    const load = getTotalLoadFromExercises(item.exercises);
                    totalLoadPerDay += load;
                } else if (item.name === checkedTag) {
                    mostFrequentTrainings[item.name] += 1;
                    const load = getTotalLoadFromExercises(item.exercises);
                    totalLoadPerDay += load;
                }
            });
            const { result, exerciseCount } =
                getMostFrequentExerciseByDayofWeek(frequentDayExercise);

            if (Object.prototype.hasOwnProperty.call(mostFrequentExercises, result.value)) {
                mostFrequentExercises[result.value] += exerciseCount;
            } else {
                if (result.value) mostFrequentExercises[result.value] = exerciseCount;
            }
            mostFrequentExercisesByDay.push(result);

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
            mostFrequentExercisesByDay.push({
                date: start,
                value: '',
                count: 0,
            });
        }

        start = moment(start).add(1, 'days');
    }

    //если больше 7 дней
    if (mostFrequentExercisesByDay.length > 7) {
        const arr = Array.from({ length: 7 }, () => ({ exercises: {} as Record<string, number> }));

        mostFrequentExercisesByDay.forEach((item) => {
            if (
                Object.prototype.hasOwnProperty.call(arr[item.date.weekday()].exercises, item.value)
            ) {
                arr[item.date.weekday()].exercises[item.value] += item.count;
            } else {
                arr[item.date.weekday()].exercises[item.value] = item.count;
            }
        });

        const newArr: Array<{ value: string; count: number }> = [];

        arr.forEach((item) => {
            let maxCount = 0;
            let exerciseName = '';
            Object.entries(item.exercises).forEach((item) => {
                if (item[1] > maxCount) {
                    maxCount = item[1];
                    exerciseName = item[0];
                }
            });
            newArr.push({ value: exerciseName, count: maxCount });
        });

        const newExercisesForDays: Array<LegendItemData & { count: number }> = [];
        const forPieData: Record<string, number> = {};

        newArr.forEach((item, index) => {
            newExercisesForDays.push({
                date: moment().isoWeekday(index + 1),
                count: item.count,
                value: item.value,
            });
            if (Object.prototype.hasOwnProperty.call(forPieData, item.value) && item.value) {
                forPieData[item.value] += item.count;
            } else if (item.value) {
                forPieData[item.value] = item.count;
            }
        });

        mostFrequentExercises = forPieData;
        mostFrequentExercisesByDay = newExercisesForDays;
    }

    avgDailyLoad = +(totalLoadForPeriod / period).toFixed(1);
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
        totalLoadForPeriod: totalLoadForPeriod,
        mostFrequentTraining: mostFrequentTraining, //for card
        mostFrequentExercise: mostFrequentExercise, //for card
        frequentExercises: mostFrequentExercises, // for diagramm
        frequentExercisesByDayOfWeek: mostFrequentExercisesByDay, //for legend
    };
};
