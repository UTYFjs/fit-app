import styles from './header-my.module.css';

import 'antd/dist/antd.css';
import { ArrowLeftOutlined, SettingOutlined } from '@ant-design/icons';
import { Paths } from '@constants/api';
import { Typography, Layout, Breadcrumb, Button } from 'antd';
import classNames from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ProfileDataTestId } from '@constants/data-test-id';
import { useLazyGetTariffListQuery } from '@services/user-profile-api';

const { Header } = Layout;
const { Title } = Typography;

const TitleLevel4 = {
    [Paths.PROFILE]: 'Профиль',
    [Paths.SETTINGS]: 'Настройки',
};
export const HeaderMy: React.FC = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [getTariffList] = useLazyGetTariffListQuery();

    const isBreadcrumb = [Paths.MAIN, Paths.CALENDAR, Paths.FEEDBACKS, Paths.TRAINING].includes(
        pathname as Paths,
    );
    const isTitleLevel4 = [Paths.PROFILE, Paths.SETTINGS].includes(pathname as Paths);
    const isSettings = [Paths.CALENDAR, Paths.PROFILE, Paths.TRAINING].includes(pathname as Paths);

    const headerSecondClass = {
        [Paths.MAIN]: '',
        [Paths.FEEDBACKS]: 'header_feedbacks',
        [Paths.CALENDAR]: 'header_calendar',
        [Paths.SETTINGS]: 'header_settings',
        [Paths.PROFILE]: 'header_profile',
        [Paths.TRAINING]: 'header_training',
    };
    const headerClass = classNames(
        styles.header,
        styles[headerSecondClass[pathname as keyof typeof headerSecondClass]] || '',
    );

    const handleGoBack = () => navigate(-1);
    const handleGoToSettings = () => {
        getTariffList();
        navigate(Paths.SETTINGS);
    };
    return (
        <Header className={headerClass}>
            {isBreadcrumb && (
                <Breadcrumb className={styles.breadcrumb}>
                    <Breadcrumb.Item>
                        <Link to={Paths.MAIN}>Главная </Link>
                    </Breadcrumb.Item>
                    {pathname === Paths.FEEDBACKS && (
                        <Breadcrumb.Item>
                            <Link to={Paths.FEEDBACKS}>Отзывы пользователей </Link>
                        </Breadcrumb.Item>
                    )}
                    {pathname === Paths.CALENDAR && (
                        <Breadcrumb.Item>
                            <Link to={Paths.CALENDAR}>Календарь </Link>
                        </Breadcrumb.Item>
                    )}
                    {pathname === Paths.TRAINING && (
                        <Breadcrumb.Item>
                            <Link to={Paths.TRAINING}>Тренировки </Link>
                        </Breadcrumb.Item>
                    )}
                </Breadcrumb>
            )}

            {isTitleLevel4 && (
                <div className={styles['title4__wrapper']}>
                    {pathname === Paths.SETTINGS && (
                        <Button
                            data-test-id={ProfileDataTestId.SETTINGS_BACK}
                            type='text'
                            size='small'
                            style={{ width: 14, height: 14 }}
                            icon={<ArrowLeftOutlined style={{ width: 14, height: 14 }} />}
                            onClick={handleGoBack}
                        />
                    )}
                    <Title className={styles['title_header4']} level={4}>
                        {TitleLevel4[pathname as keyof typeof TitleLevel4] || 'Заголовок'}
                    </Title>
                </div>
            )}
            {isSettings && (
                <Button
                    type={'text'}
                    icon={<SettingOutlined />}
                    className={styles['button_setting-calendar']}
                    onClick={handleGoToSettings}
                    data-test-id={ProfileDataTestId.HEADER_SETTINGS}
                >
                    <span className={styles['button_setting_text']}> Настройки </span>
                </Button>
            )}
            {pathname === Paths.MAIN && (
                <div className={styles['title__wrapper']}>
                    {' '}
                    <Title className={styles['title_header']}>
                        Приветствуем тебя в&nbsp;CleverFit — приложении,
                        <br />
                        которое&nbsp;поможет&nbsp;тебе добиться&nbsp;своей мечты!
                    </Title>
                    <Button
                        type={'text'}
                        icon={<SettingOutlined />}
                        className={styles['button_setting']}
                        onClick={handleGoToSettings}
                        data-test-id={ProfileDataTestId.HEADER_SETTINGS}
                    >
                        Настройки
                    </Button>
                </div>
            )}
        </Header>
    );
};
