import './card-tariff.css';

import 'antd/dist/antd.css';
import { Button, Card } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { getUserInfo } from '@redux/profile-slice';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import moment from 'moment';
import { DateFormat } from '@constants/date';
import { useWindowWidth } from '@hooks/useWindowWidth';
import FreeImg from '@assets/free.png';
import ProImg from '@assets/pro_able.png';
import { cardTariffContent } from '@constants/tariff';

type ICardTariffProps = {
    isPaid: boolean;
    srcImg: string;
    title: string;
    onClickCompare: () => void;
    dataTestIdCard?: string;
    dataTestIdBtn?: string;
    isActivePro?: boolean;
};
export const CardTariff: React.FC<ICardTariffProps> = ({
    isPaid,
    srcImg,
    title,
    onClickCompare,
    dataTestIdCard,
    dataTestIdBtn,
    isActivePro,
}) => {
    const { isDesktop } = useWindowWidth();
    const userInfo = useAppSelector(getUserInfo);
    const imageForGhPages = srcImg === cardTariffContent[0].srcImg ? FreeImg : ProImg;
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
                    alt={title}
                    src={imageForGhPages}
                />
            }
        >
            {isPaid && !isActivePro ? (
                <Button
                    type='primary'
                    key='active'
                    size='large'
                    data-test-id={dataTestIdBtn}
                    onClick={onClickCompare}
                >
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
