import './achievment-page.css';
import { useGetTrainingsQuery, useLazyGetTrainingListQuery } from '@services/training-api';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Space, Tabs } from 'antd';
import { TrainingNames } from '../../types/training-types';
import { ColumnChart } from '@components/column-chart/column-chart';
import { ColumnChartLegend } from '@components/column-chart-legend/column-chart-legend';
import { PieChart } from '@components/pie-chart/pie-chart';
import { useGetStatisticsForAchievement } from '@hooks/use-get-statistic-for-achievment';
import { TagsList } from '@components/tags-list/tags-list';
import { useWindowWidth } from '@hooks/useWindowWidth';
import classNames from 'classnames';
import { getMaxWidthColumnChart } from '@utils/get-max-width-column-chart';
import { NoAchievementStats } from '@components/no-achievement/no-achievement';
import {
    getTextForTitleColumnLegendChart,
    getTextForTitleFrequentExercise,
} from '@utils/utils-for-achievement-statistics';

enum PeriodStatistic {
    PER_WEEK = 'perWeek',
    PER_MONTH = 'perMonth',
    ALL_TIME = 'allTime',
}
export type Period = 7 | 28 | 1000;

export const PeriodValues: Record<PeriodStatistic, Period> = {
    [PeriodStatistic.PER_WEEK]: 7,
    [PeriodStatistic.PER_MONTH]: 28,
    [PeriodStatistic.ALL_TIME]: 1000,
};
export type TagTrainingsListType = TrainingNames | 'Все';

export const AchievmentPage = () => {
    const { data: dataTrainings } = useGetTrainingsQuery();
    const [getTrainingList, { data: dataTrainingList }] = useLazyGetTrainingListQuery();
    const [checkedTag, setCheckedTag] = useState<TagTrainingsListType>('Все');
    const [period, setPeriod] = useState<Period>(7);

    const { isDesktop } = useWindowWidth();

    useLayoutEffect(() => {
        getTrainingList();
    }, [dataTrainings, getTrainingList]);

    const {
        avgLoadsByDay, // для диаграммы
        avgDailyLoad,
        approachesCount,
        replaysCount,
        totalLoadForPeriod,
        mostFrequentTraining, //for card
        mostFrequentExercise, //for card
        frequentExercises, // for diagramm
        frequentExercisesByDayOfWeek, //for legend
    } = useGetStatisticsForAchievement({ period, checkedTag });

    useEffect(() => {
        console.log('use Effect frequent exercises', frequentExercises);
    }, [frequentExercises]);

    const tabItems = [
        { label: 'За неделю', key: PeriodStatistic.PER_WEEK },
        { label: 'За месяц', key: PeriodStatistic.PER_MONTH },
        {
            label: <div className='tabs-title_disabled'>За все время (PRO)</div>,
            key: PeriodStatistic.ALL_TIME,
            disabled: true,
        },
    ];

    const pieData = Object.entries(frequentExercises).reduce((acc, item) => {
        acc.push({ type: item[0], value: item[1] });
        return acc;
    }, [] as Array<{ type: string; value: number }>);

    const handleOnChangeTag = (tagName: TagTrainingsListType) => setCheckedTag(tagName);

    const onChangeTabs = (key: string) => {
        switch (key) {
            case PeriodStatistic.PER_WEEK:
                setPeriod(PeriodValues[PeriodStatistic.PER_WEEK]);
                break;
            case PeriodStatistic.PER_MONTH:
                setPeriod(PeriodValues[PeriodStatistic.PER_MONTH]);
                break;
            case PeriodStatistic.ALL_TIME:
                setPeriod(PeriodValues[PeriodStatistic.ALL_TIME]);
                break;
        }
        setCheckedTag('Все');
        console.log(period);
    };

    return (
        <div className='training-page achievement-page'>
            <Tabs items={tabItems} centered onChange={onChangeTabs} />
            <TagsList
                checkedTag={checkedTag}
                handleOnChangeTag={handleOnChangeTag}
                dataTrainingList={dataTrainingList || []}
            />
            <Space className='achievement-page-wrapper' direction='vertical' size='large'>
                {Object.keys(frequentExercises).length === 0 ? (
                    <NoAchievementStats period={period} />
                ) : (
                    <>
                        <div
                            className={classNames(
                                period === PeriodValues.perWeek ? 'load' : 'load_column',
                            )}
                        >
                            {period === PeriodValues.perWeek && (
                                <ColumnChart
                                    currentData={avgLoadsByDay}
                                    containerStyles={{
                                        maxWidth: getMaxWidthColumnChart(isDesktop, period),
                                        height: isDesktop ? 374 : 236,
                                    }}
                                />
                            )}
                            {period === PeriodValues.perMonth && (
                                <ColumnChart
                                    currentData={avgLoadsByDay}
                                    containerStyles={{
                                        maxWidth: '100%',
                                        height: isDesktop ? 374 : 236,
                                    }}
                                    scrollbar={true}
                                />
                            )}

                            <ColumnChartLegend
                                legendTitle={`Средняя ${getTextForTitleColumnLegendChart(
                                    checkedTag,
                                )} по дням недели`}
                                badgeData={avgLoadsByDay.map((item) => ({
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
                                customClassTitle='legend__title_shorter'
                            />
                        </div>
                        <div className='cards-load-block'>
                            <div className='card-load'>
                                <div className='card-load__title'>{totalLoadForPeriod}</div>
                                <div className='card-load__subtitle'>Общая нагрузка, кг</div>
                            </div>
                            <div className='card-load'>
                                <div className='card-load__title'>{avgDailyLoad}</div>
                                <div className='card-load__subtitle'>Нагрузка в день, кг</div>
                            </div>
                            <div className='card-load'>
                                <div className='card-load__title'>{replaysCount}</div>
                                <div className='card-load__subtitle'>
                                    Количество повторений, раз
                                </div>
                            </div>
                            <div className='card-load'>
                                <div className='card-load__title'>{approachesCount}</div>
                                <div className='card-load__subtitle'>Подходы, раз</div>
                            </div>
                        </div>
                        <div className='most-frequent'>
                            {checkedTag === 'Все' && (
                                <>
                                    <div className='most-frequent__title'>
                                        Самая частая тренировка
                                    </div>
                                    <div className='most-frequent__name'>
                                        {mostFrequentTraining.toLowerCase()}
                                    </div>
                                </>
                            )}
                            <div className='most-frequent__title'>
                                Самое частое упражнение{getTextForTitleFrequentExercise(checkedTag)}
                            </div>
                            <div className='most-frequent__name'>
                                {mostFrequentExercise.toLowerCase()}{' '}
                            </div>
                        </div>
                        <div className='load'>
                            {pieData.length && <PieChart pieData={pieData} />}{' '}
                            <ColumnChartLegend
                                legendTitle={`Самые частые упражнения по дням недели${
                                    period === PeriodValues.perMonth ? ' за месяц' : ''
                                }`}
                                badgeData={frequentExercisesByDayOfWeek}
                                colorBadge={{
                                    primary: 'var(--character-light-error)',
                                    secondary: 'var(--red-1)',
                                }}
                                colorText={{
                                    primary: 'var(--character-light-primary-inverse)',
                                    secondary: 'var(--character-light-error)',
                                }}
                            />
                        </div>{' '}
                    </>
                )}
            </Space>
        </div>
    );
};
