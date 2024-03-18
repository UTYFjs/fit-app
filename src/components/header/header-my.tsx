import styles from './header-my.module.css';
import 'antd/dist/antd.css';
import { Typography, Layout, Breadcrumb, Button } from 'antd';
import {    SettingOutlined} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { Paths } from '@constants/api';
import classNames from 'classnames';





const { Header } = Layout;
const { Title } = Typography;


export const HeaderMy: React.FC = () => {  
    const {pathname} = useLocation();
    
    const headerSecondClass = {
        [Paths.MAIN]: '',
        [Paths.FEEDBACKS]: 'header_feedbacks',
        [Paths.CALENDAR]: 'header_calendar',
    }
    const headerClass = classNames(styles.header, styles[headerSecondClass[pathname as keyof  typeof headerSecondClass]] || '');
    // const headerClass =
    //     pathname === Paths.MAIN
    //         ? styles.header
    //         : classNames(styles.header, styles['header_feedbacks']);

    return (
        <Header className={headerClass}>
            <Breadcrumb className={styles.breadcrumb}>
                <Breadcrumb.Item>
                    <Link to={Paths.MAIN}>Главная </Link>
                </Breadcrumb.Item>
                {pathname === Paths.FEEDBACKS && <Breadcrumb.Item>
                    <Link to={Paths.FEEDBACKS}>Отзывы пользователей </Link>
                </Breadcrumb.Item>}
                {pathname === Paths.CALENDAR && <Breadcrumb.Item>
                    <Link to={Paths.CALENDAR}>Календарь </Link>
                </Breadcrumb.Item>}
            </Breadcrumb>
            {pathname === Paths.CALENDAR && <Button
                type={'text'}
                icon={<SettingOutlined />}
                className={styles['button_setting-calendar']}
            >
                <span className={styles['button_setting_text']}> Настройки </span>
            </Button>}
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
                    >
                        Настройки
                    </Button>
                </div>
            )}
        </Header>
    );}

