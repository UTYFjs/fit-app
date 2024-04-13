import './column-chart-legend.css';
import { Badge } from 'antd';
import { getStringDayOfWeekByNumber } from '@utils/get-string-day-of-week';

type ColumnChartProps = {
    currentData: Array<{ date: string; value: number }>;
};

export const ColumnChartLegend = ({ currentData }: ColumnChartProps) => {
    console.log('проверка дян ', getStringDayOfWeekByNumber(6));
    return (
        <div className='legend'>
            <p className='legend__title'>Средняя нагрузка по дням недели</p>
            <div className='legend-item__wrapper'>
                {currentData.map((item, index) => (
                    <div key={item.date} className='legend-item'>
                        <Badge
                            count={index + 1}
                            color={item.value ? 'var(--primary-light-6)' : 'var(--primary-light-1)'}
                            style={{
                                color: item.value
                                    ? ' var(--character-light-primary-inverse)'
                                    : 'var(--primary-light-6)',
                                fontWeight: 400,
                                fontSize: 12,
                                fontFamily: 'var(--font-family)',
                            }}
                        />{' '}
                        <span className='legend-item__day'>
                            {getStringDayOfWeekByNumber(index)}
                        </span>{' '}
                        <span className='legend-item__value'>
                            {item.value ? `${item.value} кг` : ''}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
