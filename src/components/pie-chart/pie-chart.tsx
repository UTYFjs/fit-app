import { Pie } from '@ant-design/charts';
import './pie-chart.css';
import { useWindowWidth } from '@hooks/useWindowWidth';

type PieChartProps = {
    pieData: Array<{ type: string; value: number }>;
    containerStyles?: React.CSSProperties;
};

export const PieChart = ({ pieData, containerStyles }: PieChartProps) => {
    const { isDesktop, width } = useWindowWidth();
    const configPie = {
        data: pieData,
        angleField: 'value',
        colorField: 'type',
        padding: width > 850 ? 75 : 10,
        innerRadius: 0.71,
        width: isDesktop ? 510 : 328,
        height: width > 850 ? 334 : 211,
        label: {
            text: 'type',
            position: 'outside',
            connector: false,
            style: {
                fontSize: 14,
                textBaseline: 'middle',
                fill: '#000',
            },
            offset: 10,
        },
        tooltip: {
            field: 'value',
            name: 'Количество',
        },
        legend: false,
    };
    return (
        <div className='pie-chart-wrapper' style={containerStyles}>
            <Pie {...configPie} />
        </div>
    );
};
