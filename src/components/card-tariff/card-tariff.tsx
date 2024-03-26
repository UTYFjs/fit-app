import './card-tariff.css';

import 'antd/dist/antd.css';
import { Button, Card } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useState } from 'react';

interface ICardTariffProps {
    isDisable: boolean;
    srcImg: string;
    title: string;
    onClickCompare: () => void;
    dataTestIdCard?: string;
    dataTestIdBtn?: string;
}
export const CardTariff: React.FC<ICardTariffProps> = ({
    isDisable,
    srcImg,
    title,
    onClickCompare,
    dataTestIdCard,
    dataTestIdBtn,
}) => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 576);
    window.addEventListener('resize', () => {
        setIsDesktop(window.innerWidth > 576);
    });
    return (
        <Card
            data-test-id={dataTestIdCard}
            hoverable
            bordered={false}
            className='card-tariff'
            headStyle={{ padding: 0, height: 53 }}
            bodyStyle={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: 27.5,
                paddingTop: 27.5,
                height: isDesktop ? 95 : 64,
            }}
            title={<p className='card-tariff__title'>{title}</p>}
            extra={
                <Button
                    className='card-tariff__btn-more'
                    type='link'
                    style={{ paddingRight: 24 }}
                    onClick={onClickCompare}
                >
                    Подробнее
                </Button>
            }
            cover={
                <img
                    className='card-tariff__img'
                    style={{ filter: isDisable ? 'grayscale(90%) opacity(30%)' : 'none' }}
                    alt='free tariff'
                    src={srcImg}
                />
            }
        >
            {isDisable ? (
                <Button type='primary' key='active' size='large' data-test-id={dataTestIdBtn}>
                    Активировать{' '}
                </Button>
            ) : (
                <>
                    <span className='tariff-active-label'>активен</span> <CheckOutlined />
                </>
            )}
        </Card>
    );
};
