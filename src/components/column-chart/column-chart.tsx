import { Column } from '@ant-design/charts';
import './column-chart.css';
import { useWindowWidth } from '@hooks/useWindowWidth';
import { PeriodValues } from '@pages/achievment-page/achievment-page';
import { useEffect, useState } from 'react';

type ColumnChartProps = {
    currentData: Array<{ date: string; value: number }>;
    containerStyles: React.CSSProperties;
    scrollbar?: boolean;
};

export const ColumnChart = ({ currentData, containerStyles, scrollbar }: ColumnChartProps) => {
    const { isDesktop } = useWindowWidth();

    const config = {
        data: currentData,
        xField: 'date',
        yField: 'value',
        axis: {
            y: {
                labelFormatter: (value: number) => `${value} кг`,
                tick: false,
                labelFontSize: isDesktop ? 12 : 7,
                labelFontWeight: 400,
                labelFontFamily: 'Inter',
                labelSpacing: 5,
            },
            x: {
                title: 'Нагрузка, кг',
                titleFontSize: isDesktop ? 14 : 8,
                TitleFontWeight: 400,
                titleFontFamily: 'Inter',
                titleSpacing: isDesktop ? 16 : 10,
                labelFontSize: isDesktop ? 12 : 7,
                labelFontWeight: 400,
                labelFontFamily: 'Inter',
                tick: false,
                labelSpacing: isDesktop ? 16 : 10,
            },
        },
        style: { fill: '#85a5ff', width: isDesktop ? 30 : 19 },
        tooltip: {
            title: '',
            items: [{ channel: 'y', name: 'Средняя нагрузка' }],
        },
        //scrollbar: scrollbar ? { x: scrollbar ? { ratio: 0.5 } : '' } : {},
        scrollbar: scrollbar ? { x: { ratio: 0.5 } } : 0,
    };

    return (
        <div className='column-chart-wrapper' style={containerStyles}>
            <Column {...config} />
        </div>
    );
};
