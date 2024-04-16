import './column-chart-legend.css';
import { BadgeProps, Collapse } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { splitArrayToChunks } from '@utils/split-array-to-chunks';
import { useWindowWidth } from '@hooks/useWindowWidth';
import { useEffect, useState } from 'react';
import { LegendItem } from './legend-item/legend-item';

export type LegendItemData = {
    date: string;
    value: string;
};
type ColumnChartProps = BadgeProps & {
    legendTitle: string;
    badgeData: Array<LegendItemData>;
    colorBadge: { primary: string; secondary: string };
    colorText: { primary: string; secondary: string };
};
const { Panel } = Collapse;
export const ColumnChartLegend = ({
    legendTitle,
    badgeData,
    colorBadge,
    colorText,
    ...rest
}: ColumnChartProps) => {
    const data = splitArrayToChunks(badgeData, 7);

    const { isMobile } = useWindowWidth();

    const [isCollapsed, setIsCollapsed] = useState(data.length > 1 && isMobile ? true : false);
    useEffect(() => {
        setIsCollapsed(data.length > 1 && isMobile ? true : false);
        console.log(isCollapsed);
    }, [badgeData, data, isMobile]);

    const keys = ['key1', 'key2', 'key3', 'key4'];
    const defaultActiveKey = isMobile && data.length > 1 ? [] : keys;
    const getLegendTitle = (weekData: LegendItemData[]) => {
        if (data.length > 1)
            return `Неделя ${weekData[0].date}-${weekData[weekData.length - 1].date}`;
        return legendTitle;
    };

    return (
        <>
            {data.length > 1 ? (
                <Collapse
                    className='legend'
                    defaultActiveKey={defaultActiveKey}
                    bordered={false}
                    expandIconPosition='end'
                    expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
                    ghost
                    style={{ padding: 0 }}
                >
                    {data.map((weekData, index) => (
                        <Panel
                            key={keys[index]}
                            header={<p className='legend__title'>{getLegendTitle(weekData)}</p>}
                            collapsible={data.length > 1 && isMobile ? 'header' : 'disabled'}
                            showArrow={data.length > 1 && isMobile ? true : false}
                        >
                            <div className='legend-item__wrapper'>
                                {weekData.map((item, index) => {
                                    return (
                                        <LegendItem
                                            key={item.date}
                                            colorBadge={colorBadge}
                                            colorText={colorText}
                                            index={index}
                                            item={item}
                                            {...rest}
                                        />
                                    );
                                })}
                            </div>
                        </Panel>
                    ))}
                </Collapse>
            ) : (
                <div className='legend_single'>
                    <p className='legend__title'>{legendTitle}</p>
                    <div className='legend-item__wrapper'>
                        {badgeData.map((item, index) => (
                            <LegendItem
                                key={item.date}
                                colorBadge={colorBadge}
                                colorText={colorText}
                                index={index}
                                item={item}
                                {...rest}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};
