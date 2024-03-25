import { Button, Radio, RadioChangeEvent, Typography } from 'antd';
import './settings-page.css';
import { CardTariff } from '@components/card-tariff/card-tariff';
import TariffControlsForm from './tariff-controls-form/tariff-controls-form';
import { useState } from 'react';
import DrawerCustom from '@components/drawer-custom/drawer-custom';
import { CheckCircleFilled, CloseCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const cardTariffContent = [
    {
        title: 'FREE tariff',
        actions: '',
        isDisable: false,
        srcImg: '/free.png',
    },
    {
        title: 'PRO tariff',
        actions: '',
        isDisable: true,
        srcImg: '/pro_able.png',
    },
];

const options = [
    {
        title: 'Cтатистика за месяц',
        available: true,
    },
    {
        title: 'Cтатистика за все время',
        available: false,
    },
    {
        title: 'Совместные тренировки',
        available: true,
    },
    {
        title: 'Участие в марафонах',
        available: false,
    },
    {
        title: 'Приложение iOS',
        available: false,
    },
    {
        title: 'Приложение Android',
        available: false,
    },
    {
        title: 'Индивидуальный Chat GPT',
        available: false,
    },
];

const SettingsPage = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [valuePay, setValuePay] = useState(0);
    const handleDraweClose = () => {
        setIsDrawerOpen(false);
    };
    const handleDrawerOpen = () => {
        setIsDrawerOpen((state) => !state);
        console.log('opendrawer', isDrawerOpen);
    };
    const handlePay = () => {
        console.log('Pay');
    };
    return (
        <div className='settings-page_wrapper'>
            <div className='settings-page'>
                <div className='settings__tariff'>
                    <Title className='settings__title' level={5}>
                        {' '}
                        Мой тариф{' '}
                    </Title>
                    <div className='settings__card-tariff-wrapper'>
                        {cardTariffContent.map((item) => (
                            <CardTariff
                                key={item.srcImg}
                                isDisable={item.isDisable}
                                title={item.title}
                                srcImg={item.srcImg}
                                onClickCompare={handleDrawerOpen}
                            />
                        ))}
                    </div>
                </div>
                <TariffControlsForm />
                <div className='settings__btn-wrapper'>
                    <Button type='primary' size='large'>
                        {' '}
                        Написать отзыв
                    </Button>
                    <Button type='link' size='large'>
                        {' '}
                        Смотреть все отзывы
                    </Button>
                </div>
            </div>
            <DrawerCustom
                drawerTitle='Сравнить тарифы'
                isDrawerOpen={isDrawerOpen}
                onClose={handleDraweClose}
                footer={
                    <Button
                        type='primary'
                        onClick={handlePay}
                        size='large'
                        style={{ width: '100%' }}
                    >
                        {' '}
                        Выбрать и оплатить
                    </Button>
                }
            >
                <div className='drawer-tariff'>
                    <div className='tariff-labels'>
                        <div className='tariff_free'>FREE</div>
                        <div className='tariff_pro'>PRO</div>
                    </div>
                    <div className='options-tariff-list'>
                        {options.map((item) => {
                            return (
                                <div key={item.title} className='option-tariff-item'>
                                    <p className='option-tariff-item__title'>{item.title}</p>
                                    {item.available ? (
                                        <CheckCircleFilled
                                            className='icon-black'
                                            style={{ fontSize: 16 }}
                                        />
                                    ) : (
                                        <CloseCircleOutlined
                                            className='icon-disable'
                                            style={{ fontSize: 16 }}
                                        />
                                    )}
                                    <CheckCircleFilled
                                        className='icon-black'
                                        style={{ fontSize: 16 }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div>
                        <p className='price__title'> Стоимость тарифа</p>
                        <div className='price__body'>
                            <div className='price__body-column'>
                                <p className='price-item__title'>6 месяцев</p>
                                <p className='price-item__title'>9 месяцев</p>
                                <p className='price-item__title'>12 месяцев</p>
                            </div>
                            <div className='price__body-column'>
                                <p className='price-item__cost'> 5,5 $</p>
                                <p className='price-item__cost'> 8,5 $</p>
                                <p className='price-item__cost'> 10 $</p>
                            </div>
                            <Radio.Group
                                onChange={(e: RadioChangeEvent) => {
                                    setValuePay(e.target.value);
                                }}
                                value={valuePay}
                            >
                                <div className='price__body-column'>
                                    <Radio className='price-item__radio' value={1} />
                                    <Radio className='price-item__radio' value={2} />
                                    <Radio className='price-item__radio' value={3} />
                                </div>
                            </Radio.Group>
                        </div>
                    </div>
                </div>
            </DrawerCustom>
        </div>
    );
};

export default SettingsPage;
