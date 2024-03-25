import { ExclamationCircleOutlined } from '@ant-design/icons';
import './tariff-controls-form.css';
import { ProfileDataTestId } from '@constants/data-test-id';
import { Form, Switch, Tooltip } from 'antd';
import { useState } from 'react';

const controlsData = [
    {
        title: 'Открыт для соместных тренировок',
        tooltipText: 'включеная функция позволит участвовать в совместных тренировках',
        dataTestId: ProfileDataTestId.SWITCH_TARIFF_TRAININGS,
        dataTestIdIcon: ProfileDataTestId.TARIFF_TRAINING_ICON,
    },
    {
        title: 'Уведомления',
        tooltipText: 'включеная функция позволит получать уведомления об активностях',
        dataTestId: ProfileDataTestId.SWITCH_TARIFF_NOTIFICATION,
        dataTestIdIcon: ProfileDataTestId.TARIFF_NOTIFICATIONS_ICON,
    },
    {
        title: 'Темная тема',
        tooltipText: 'темная тема доступна для PRO tariff',
        dataTestId: ProfileDataTestId.SWITCH_TARIFF_THEME,
        dataTestIdIcon: ProfileDataTestId.TARIFF_THEME_ICON,
    },
];

const TariffControlsForm = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 480);
    window.addEventListener('resize', () => {
        setIsDesktop(window.innerWidth > 480);
    });
    return (
        <Form className='settings__control-form'>
            {controlsData.map((item) => (
                <div key={item.dataTestId} className='settings__control-item'>
                    <div className='settings__control-item-title'>
                        <p className='control-title'>{item.title}</p>
                        <Tooltip placement='topRight' title={item.tooltipText}>
                            <ExclamationCircleOutlined />
                        </Tooltip>
                    </div>

                    <Switch defaultChecked size={isDesktop ? 'default' : 'small'} />
                </div>
            ))}
        </Form>
    );
};

export default TariffControlsForm;
