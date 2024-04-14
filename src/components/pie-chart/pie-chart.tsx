import { Column, Pie } from '@ant-design/charts';
import './pie-chart.css';

type PieChartProps = {
    pieData: Array<{ type: string; value: number }>;
    containerStyles?: React.CSSProperties;
};

export const PieChart = ({ pieData, containerStyles }: PieChartProps) => {
    const configPie = {
        data: pieData,
        angleField: 'value',
        colorField: 'type',
        // paddingRight: 80,
        innerRadius: 0.8,
        width: 450,
        height: 450,
        // padding: 70,
        // label: {
        //     text: 'type',
        //     style: {
        //         fontSize: 14,
        //         fill: '#262626FF',
        //     },
        //     offset: 45,
        // },

        label: {
            text: 'type',
            position: 'outside',
            // position: 'spider',
            //position: 'surround',
            // textAlign: 'center',
            // textBaseline: 'top',
            connector: false,
            //render: customLabel,
            // lineWidth: 0,
            // lineDash: [0, 0],
            // connector: false,
            // connectorStroke: 'none',
            // connectorLineWidth: 0,
            style: {
                fontSize: 14,
                textAlign: 'start',
                fill: '#000',
            },
            offset: 10,
            //transform: [{ type: 'overlapDodgeX' }],
        },
        legend: false,
    };
    return (
        <div className='column-chart-wrapper' style={containerStyles}>
            <Pie {...configPie} />
        </div>
    );
};
