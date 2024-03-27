import { Button, Radio, RadioChangeEvent, Typography } from 'antd';
import './settings-page.css';
import { CardTariff } from '@components/card-tariff/card-tariff';
import TariffControlsForm from './tariff-controls-form/tariff-controls-form';
import { useEffect, useState } from 'react';
import DrawerCustom from '@components/drawer-custom/drawer-custom';
import { CheckCircleFilled, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import ModalResult from '@components/modal-result/modal-result';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@constants/api';
import { ProfileDataTestId } from '@constants/data-test-id';
import { useChangeTariffMutation, useGetTariffListQuery } from '@services/user-profile-api';
import { getUserTariffInfo, setExitApp } from '@redux/user-slice';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { cardTariffContent, optionsProTariff } from '@constants/tariff';
import moment from 'moment';
import { DateFormat } from '@constants/date';

const { Title } = Typography;

const SettingsPage = () => {
    const { data: dataTariffList } = useGetTariffListQuery();
    const [changeTariff] = useChangeTariffMutation();
    const userInfo = useAppSelector(getUserTariffInfo);

    //console.log('userInfo', userInfo);
    //console.log('dataTariffList', dataTariffList);
    const [isActivePro, setIsActivePro] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [valuePay, setValuePay] = useState(0);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        //console.log('isActivePro', moment(userInfo.tariff.expired).isAfter());

        userInfo.tariff && setIsActivePro(moment(userInfo.tariff.expired).isAfter());
    }, [userInfo]);

    const handleDraweClose = () => {
        setIsDrawerOpen(false);
    };
    const handleDrawerOpen = () => {
        setIsDrawerOpen((state) => !state);
        console.log('opendrawer', isDrawerOpen);
    };
    const handlePay = () => {
        console.log('handlePAy', { tariffId: dataTariffList?.[0]._id, days: valuePay });
        dataTariffList && changeTariff({ tariffId: dataTariffList[0]._id, days: valuePay });
        setIsDrawerOpen(false);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        localStorage.removeItem('accessToken');
        dispatch(setExitApp());
        setIsModalOpen(false);
    };
    const handleWatchReview = () => {
        navigate(Paths.FEEDBACKS);
    };
    return (
        <div className='settings-page_wrapper'>
            <div className='settings-page'>
                <div className='settings__tariff'>
                    <Title className='settings__title' level={5}>
                        Мой тариф{' '}
                    </Title>
                    <div className='settings__card-tariff-wrapper'>
                        {cardTariffContent.map(
                            ({ isPaid, srcImg, dataTestIdButton, title, dataTestIdCard }) => (
                                <CardTariff
                                    key={srcImg}
                                    isPaid={isPaid}
                                    title={title}
                                    srcImg={srcImg}
                                    onClickCompare={handleDrawerOpen}
                                    dataTestIdCard={dataTestIdCard}
                                    dataTestIdBtn={dataTestIdButton}
                                    isActivePro={isActivePro}
                                />
                            ),
                        )}
                    </div>
                </div>
                <TariffControlsForm isActivePro={isActivePro} />
                <div className='settings__btn-wrapper'>
                    <Button type='primary' size='large'>
                        Написать отзыв
                    </Button>
                    <Button type='link' size='large' onClick={handleWatchReview}>
                        Смотреть все отзывы
                    </Button>
                </div>
            </div>
            <ModalResult
                isOpen={isModalOpen}
                typeContent={'sendPayment'}
                handlePrimeButton={handleCloseModal}
                onClose={handleCloseModal}
                dataTestId={ProfileDataTestId.TARIFF_MODAL_SUCCESS}
            />
            <DrawerCustom
                drawerTitle='Сравнить тарифы'
                isDrawerOpen={isDrawerOpen}
                onClose={handleDraweClose}
                footer={
                    !isActivePro && (
                        <Button
                            data-test-id={ProfileDataTestId.TARIFF_SUBMIT}
                            type='primary'
                            disabled={!valuePay}
                            onClick={handlePay}
                            size='large'
                            style={{ width: '100%' }}
                        >
                            {' '}
                            Выбрать и оплатить
                        </Button>
                    )
                }
            >
                <div className='drawer-tariff' data-test-id={ProfileDataTestId.TARIFF_SIDER}>
                    {isActivePro && (
                        <p className='drawer-tariff__active-pro-message'>
                            {`Ваш PRO tarif активен до ${moment(userInfo.tariff.expired).format(
                                DateFormat.DOT_DD_MM,
                            )}`}
                        </p>
                    )}
                    <div className='tariff-labels'>
                        <div className='tariff_free'>FREE</div>
                        <div className={isActivePro ? 'tariff_pro active' : 'tariff_pro'}>
                            PRO{' '}
                            {isActivePro && (
                                <CheckCircleOutlined
                                    style={{
                                        fontSize: 14,
                                        color: 'var(--character-light-success)',
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div className='options-tariff-list'>
                        {optionsProTariff.map((item) => {
                            return (
                                <div key={item.title} className='option-tariff-item'>
                                    <p className='option-tariff-item__title'>{item.title}</p>
                                    {item.available ? (
                                        <CheckCircleFilled
                                            className='icon-black'
                                            style={{
                                                fontSize: 16,
                                                color: 'var(--character-light-title-85)',
                                            }}
                                        />
                                    ) : (
                                        <CloseCircleOutlined
                                            className='icon-disable'
                                            style={{
                                                fontSize: 16,
                                                color: 'var(--character-light-disable-25)',
                                            }}
                                        />
                                    )}
                                    <CheckCircleFilled
                                        className='icon-black'
                                        style={{
                                            fontSize: 16,
                                            color: 'var(--character-light-title-85)',
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    {dataTariffList && !isActivePro && (
                        <div data-test-id={ProfileDataTestId.TARIFF_COST}>
                            <p className='price__title'> Стоимость тарифа</p>
                            <div className='price__body'>
                                <div className='price__body-column'>
                                    {dataTariffList[0].periods.map(({ text }) => (
                                        <p className='price-item__title' key={text}>
                                            {text}
                                        </p>
                                    ))}
                                </div>
                                <div className='price__body-column'>
                                    {dataTariffList[0].periods.map(({ cost }) => (
                                        <p className='price-item__cost' key={cost}>
                                            {cost.toString().replace('.', ',')} $
                                        </p>
                                    ))}
                                </div>
                                <Radio.Group
                                    onChange={(e: RadioChangeEvent) => {
                                        setValuePay(e.target.value);
                                        console.log(e.target.value);
                                    }}
                                    value={valuePay}
                                >
                                    <div className='price__body-column'>
                                        {dataTariffList[0].periods.map(({ cost, days }) => (
                                            <Radio
                                                className='price-item__radio'
                                                key={days}
                                                value={days}
                                                data-test-id={
                                                    cost === 10 && ProfileDataTestId.TARIFF_10
                                                }
                                            />
                                        ))}
                                    </div>
                                </Radio.Group>
                            </div>
                        </div>
                    )}
                </div>
            </DrawerCustom>
        </div>
    );
};

export default SettingsPage;
