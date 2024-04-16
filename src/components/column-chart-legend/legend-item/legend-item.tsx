import './legend-item.css';
import { Badge, BadgeProps } from 'antd';
import { LegendItemData } from '../column-chart-legend';
import { getStringDayOfWeekByNumber } from '@utils/get-string-day-of-week';

type ColumnChartProps = BadgeProps & {
    item: LegendItemData;
    index: number;
    colorBadge: { primary: string; secondary: string };
    colorText: { primary: string; secondary: string };
};

export const LegendItem = ({ item, index, colorBadge, colorText, ...rest }: ColumnChartProps) => {
    return (
        <div className='legend-item'>
            <Badge
                count={index + 1}
                size='small'
                {...rest}
                color={item.value ? colorBadge.primary : colorBadge.secondary}
                style={{
                    color: item.value ? colorText.primary : colorText.secondary,
                    fontWeight: 400,
                    fontSize: 12,
                    lineHeight: '16px',
                    fontFamily: 'var(--font-family)',
                    width: 16,
                    height: 16,
                }}
            />{' '}
            <span className='legend-item__day'>{getStringDayOfWeekByNumber(index)}</span>{' '}
            <span className='legend-item__value'>{item.value}</span>
        </div>
    );
};
