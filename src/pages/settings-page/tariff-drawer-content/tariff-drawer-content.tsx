import { Radio, RadioChangeEvent } from 'antd';
import './tariff-drawer-content.css';
import { CheckCircleFilled, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { ProfileDataTestId } from '@constants/data-test-id';
import { optionsProTariff } from '@constants/tariff';
import { ITariff } from '../../../types/api';

type TariffDrawerContent = {
    isActivePro: boolean;
    dataTariffList: ITariff[] | undefined;
    valuePay: number;
    handleSetValuePay: (e: RadioChangeEvent) => void;
    dateActivePRO?: string;
};
export const TariffDrawerContent = ({
    isActivePro,
    dataTariffList,
    valuePay,
    handleSetValuePay,
    dateActivePRO,
}: TariffDrawerContent) => (
    <div className='drawer-tariff' data-test-id={ProfileDataTestId.TARIFF_SIDER}>
        {isActivePro && (
            <p className='drawer-tariff__active-pro-message'>
                {`Ваш PRO tarif активен до ${dateActivePRO}`}
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
                    <Radio.Group onChange={handleSetValuePay} value={valuePay}>
                        <div className='price__body-column'>
                            {dataTariffList[0].periods.map(({ cost, days }) => (
                                <Radio
                                    className='price-item__radio'
                                    key={days}
                                    value={days}
                                    data-test-id={cost === 10 && ProfileDataTestId.TARIFF_10}
                                />
                            ))}
                        </div>
                    </Radio.Group>
                </div>
            </div>
        )}
    </div>
);
