import './card-tariff.css';

import 'antd/dist/antd.css';
import { Button, Card } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { getUserTariffInfo } from '@redux/user-slice';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import moment from 'moment';
import { DateFormat } from '@constants/date';

interface ICardTariffProps {
    isPaid: boolean;
    srcImg: string;
    title: string;
    onClickCompare: () => void;
    dataTestIdCard?: string;
    dataTestIdBtn?: string;
    isActivePro?: boolean;
}
export const CardTariff: React.FC<ICardTariffProps> = ({
    isPaid,
    srcImg,
    title,
    onClickCompare,
    dataTestIdCard,
    dataTestIdBtn,
    isActivePro,
}) => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 576);
    const userInfo = useAppSelector(getUserTariffInfo);
    //todo истекает в будущем
    //const [isProActive, setIsProActive] = useState(userInfo.tariff.expired);
    window.addEventListener('resize', () => {
        setIsDesktop(window.innerWidth > 576);
    });
    //console.log('card active', isActivePro, isPaid);
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
                    style={{
                        filter: isPaid
                            ? isActivePro
                                ? 'none'
                                : 'grayscale(90%) opacity(30%)'
                            : 'none',
                    }}
                    alt='free tariff'
                    src={srcImg}
                />
            }
        >
            {isPaid && !isActivePro ? (
                <Button type='primary' key='active' size='large' data-test-id={dataTestIdBtn}>
                    Активировать{' '}
                </Button>
            ) : (
                <div>
                    <span className='tariff-active-label'>активен</span>
                    {!isPaid && <CheckOutlined />}
                    {isPaid && (
                        <p className='tariff-active-label'>
                            до {moment(userInfo.tariff.expired).format(DateFormat.DOT_DD_MM)}
                        </p>
                    )}
                </div>
            )}
        </Card>
    );
};
