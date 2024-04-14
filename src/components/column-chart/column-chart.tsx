import { Column } from '@ant-design/charts';
import './column-chart.css';

type ColumnChartProps = {
    currentData: Array<{ date: string; value: number }>;
    containerStyles?: React.CSSProperties;
};

export const ColumnChart = ({ currentData, containerStyles }: ColumnChartProps) => {
    const config = {
        data: currentData,
        xField: 'date',
        yField: 'value',
        axis: {
            y: {
                labelFormatter: (value: number) => `${value} кг`,
                tick: false,
                labelSpacing: 16,
            },
            x: {
                title: 'Нагрузка, кг',
                titleFontSize: 14,
                TitleFontWeight: 400,
                titleFontFamily: 'Inter',
                titleSpacing: 16,
                labelFontSize: 12,
                labelFontWeight: 400,
                labelFontFamily: 'Inter',
                tick: false,
                labelSpacing: 16,
            },
        },
        style: { fill: '#85a5ff', width: 30 },
        tooltip: {
            title: '',
            items: [{ channel: 'y', name: 'Средняя нагрузка' }],
        },
    };
    return (
        <div className='column-chart-wrapper' style={containerStyles}>
            <Column {...config} />
        </div>
    );
};
