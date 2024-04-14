import './column-chart-legend.css';
import { Badge, BadgeProps } from 'antd';
import { getStringDayOfWeekByNumber } from '@utils/get-string-day-of-week';

type ColumnChartProps = BadgeProps & {
    legendTitle: string;
    badgeData: Array<{ date: string; value: string }>;
    colorBadge: { primary: string; secondary: string };
    colorText: { primary: string; secondary: string };
};

export const ColumnChartLegend = ({
    legendTitle,
    badgeData,
    colorBadge,
    colorText,
    ...rest
}: ColumnChartProps) => {
    return (
        <div className='legend'>
            <p className='legend__title'>{legendTitle}</p>
            <div className='legend-item__wrapper'>
                {badgeData.map((item, index) => (
                    <div key={item.date} className='legend-item'>
                        <Badge
                            count={index + 1}
                            {...rest}
                            color={item.value ? colorBadge.primary : colorBadge.secondary}
                            style={{
                                color: item.value ? colorText.primary : colorText.secondary,
                                fontWeight: 400,
                                fontSize: 12,
                                fontFamily: 'var(--font-family)',
                            }}
                        />{' '}
                        <span className='legend-item__day'>
                            {getStringDayOfWeekByNumber(index)}
                        </span>{' '}
                        <span className='legend-item__value'>{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
