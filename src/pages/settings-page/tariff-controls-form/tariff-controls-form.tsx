import { ExclamationCircleOutlined } from '@ant-design/icons';
import './tariff-controls-form.css';
import { ProfileDataTestId } from '@constants/data-test-id';
import { Form, FormProps, Switch, Tooltip } from 'antd';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { getUserInfo, setUserInfo } from '@redux/profile-slice';
import { useUpdateUserInfoMutation } from '@services/user-profile-api';
import { useWindowWidth } from '@hooks/useWindowWidth';

const controlsData = [
    {
        name: 'readyForJointTraining',
        title: 'Открыт для соместных тренировок',
        tooltipText: 'включеная функция позволит участвовать в совместных тренировках',
        dataTestId: ProfileDataTestId.SWITCH_TARIFF_TRAININGS,
        dataTestIdIcon: ProfileDataTestId.TARIFF_TRAINING_ICON,
    },
    {
        name: 'sendNotification',
        title: 'Уведомления',
        tooltipText: 'включеная функция позволит получать уведомления об активностях',
        dataTestId: ProfileDataTestId.SWITCH_TARIFF_NOTIFICATION,
        dataTestIdIcon: ProfileDataTestId.TARIFF_NOTIFICATIONS_ICON,
    },
    {
        name: 'darkTheme',
        title: 'Темная тема',
        tooltipText: 'темная тема доступна для PRO tariff',
        dataTestId: ProfileDataTestId.SWITCH_TARIFF_THEME,
        dataTestIdIcon: ProfileDataTestId.TARIFF_THEME_ICON,
        pro: true,
    },
];

type TariffControlsFormPropsType = {
    isActivePro: boolean;
};
export const TariffControlsForm = ({ isActivePro }: TariffControlsFormPropsType) => {
    const userInfo = useAppSelector(getUserInfo);
    const [updateUserInfo] = useUpdateUserInfoMutation();
    const dispatch = useAppDispatch();
    const { isDesktop } = useWindowWidth();

    const onChangeSwitchForm: FormProps['onFieldsChange'] = (value) => {
        const dto = { [value[0].name[0]]: value[0].value };
        if (value[0].name[0] !== controlsData[2].name) {
            updateUserInfo(dto);
        }
        dispatch(setUserInfo(dto));
    };
    return (
        <Form
            className='settings__control-form'
            initialValues={{
                ...userInfo,
            }}
            onFieldsChange={onChangeSwitchForm}
        >
            {controlsData.map((item) => (
                <div
                    key={item.dataTestId}
                    className={
                        item?.pro && !isActivePro
                            ? 'settings__control-item disable'
                            : 'settings__control-item'
                    }
                >
                    <div className='settings__control-item-title'>
                        <p className='control-title'>{item.title}</p>
                        <Tooltip
                            placement={isDesktop ? 'topRight' : 'bottom'}
                            title={item.tooltipText}
                        >
                            <ExclamationCircleOutlined data-test-id={item.dataTestIdIcon} />
                        </Tooltip>
                    </div>
                    <Form.Item
                        name={item.name}
                        valuePropName={'checked'}
                        className='settings__control-item-switch'
                    >
                        <Switch
                            size={isDesktop ? 'default' : 'small'}
                            data-test-id={item.dataTestId}
                            disabled={item?.pro && !isActivePro}
                        />
                    </Form.Item>
                </div>
            ))}
        </Form>
    );
};
