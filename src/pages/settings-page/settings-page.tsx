import { Button, RadioChangeEvent, Typography } from 'antd';
import './settings-page.css';
import { CardTariff } from '@components/card-tariff/card-tariff';
import TariffControlsForm from './tariff-controls-form/tariff-controls-form';
import { useEffect, useState } from 'react';
import DrawerCustom from '@components/drawer-custom/drawer-custom';
import ModalResult from '@components/modal-result/modal-result';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@constants/api';
import { ProfileDataTestId } from '@constants/data-test-id';
import { useChangeTariffMutation, useGetTariffListQuery } from '@services/user-profile-api';
import { setExitApp } from '@redux/user-slice';
import { getUserInfo, setExitAppUserInfo } from '@redux/profile-slice';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { cardTariffContent } from '@constants/tariff';
import moment from 'moment';
import { DateFormat } from '@constants/date';
import ButtonModalFeedback from '@components/button-modal-feedback/button-modal-feedback';
import TariffDrawerContent from './tariff-drawer-content/tariff-drawer-content';

const { Title } = Typography;

const SettingsPage = () => {
    const { data: dataTariffList } = useGetTariffListQuery();
    const [changeTariff] = useChangeTariffMutation();

    const userInfo = useAppSelector(getUserInfo);

    const [isActivePro, setIsActivePro] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [valuePay, setValuePay] = useState(0);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        userInfo.tariff && setIsActivePro(moment(userInfo.tariff.expired).isAfter());
    }, [userInfo]);

    const dateActivePRO = moment(userInfo.tariff.expired).format(DateFormat.DOT_DD_MM);

    const handleSetValuePay = (e: RadioChangeEvent) => setValuePay(e.target.value);

    const handleDrawerClose = () => setIsDrawerOpen(false);

    const handleDrawerOpen = () => setIsDrawerOpen((state) => !state);

    const handlePay = () => {
        dataTariffList && changeTariff({ tariffId: dataTariffList[0]._id, days: valuePay });
        setIsDrawerOpen(false);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        localStorage.removeItem('accessToken');
        dispatch(setExitApp());
        dispatch(setExitAppUserInfo());
        setIsModalOpen(false);
    };
    const handleWatchReview = () => navigate(Paths.FEEDBACKS);

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
                    <ButtonModalFeedback />
                    <Button type='link' size='large' onClick={handleWatchReview}>
                        Смотреть все отзывы
                    </Button>
                </div>
            </div>

            <DrawerCustom
                drawerTitle='Сравнить тарифы'
                isDrawerOpen={isDrawerOpen}
                onClose={handleDrawerClose}
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
                            Выбрать и оплатить
                        </Button>
                    )
                }
            >
                <TariffDrawerContent
                    isActivePro={isActivePro}
                    dataTariffList={dataTariffList}
                    valuePay={valuePay}
                    handleSetValuePay={handleSetValuePay}
                    dateActivePRO={dateActivePRO}
                />
            </DrawerCustom>
            <ModalResult
                isOpen={isModalOpen}
                typeContent={'sendPayment'}
                handlePrimeButton={handleCloseModal}
                onClose={handleCloseModal}
                dataTestId={ProfileDataTestId.TARIFF_MODAL_SUCCESS}
            />
        </div>
    );
};

export default SettingsPage;
