import { Column, Pie } from '@ant-design/charts';
import './pie-chart.css';
import { useWindowWidth } from '@hooks/useWindowWidth';

type PieChartProps = {
    pieData: Array<{ type: string; value: number }>;
    containerStyles?: React.CSSProperties;
};

export const PieChart = ({ pieData, containerStyles }: PieChartProps) => {
    const { isDesktop, width } = useWindowWidth();
    console.log('pie data', pieData);
    const configPie = {
        data: pieData,
        angleField: 'value',
        colorField: 'type',
        padding: width > 850 ? 60 : 10,
        innerRadius: 0.7,
        width: isDesktop ? 510 : 328,
        height: width > 850 ? 334 : 211,
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
                //textAlign: 'start',
                textBaseline: 'middle',
                fill: '#000',
            },
            offset: 10,
            //transform: [{ type: 'overlapDodgeX' }],
        },
        tooltip: {
            field: 'value',
            name: 'Количество',
            // items: [
            //     {
            //         // value: 'value',
            //         // channel: 'y',
            //         name: 'Количество',
            //     },
            // ],
        },
        legend: false,
    };
    return (
        <div className='pie-chart-wrapper' style={containerStyles}>
            <Pie {...configPie} />
        </div>
    );
};
