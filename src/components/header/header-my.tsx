import styles from './header-my.module.css';
import 'antd/dist/antd.css';
import { Typography, Layout, Breadcrumb, Button } from 'antd';
import {    SettingOutlined} from '@ant-design/icons';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Paths } from '@constants/api';
import classNames from 'classnames';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';




const { Header } = Layout;
const { Title } = Typography;


export const HeaderMy: React.FC = () => {  
    const {pathname} = useLocation();
    
    const headerClass =
        pathname === Paths.MAIN
            ? styles.header
            : classNames(styles.header, styles['header_feedbacks']);
    const location = useAppSelector((state) => state.router.previousLocations) 
    console.log(location)


    return (
        <Header className={headerClass}>
            <Breadcrumb className={styles.breadcrumb}>
                <Breadcrumb.Item>
                    <Link to={Paths.MAIN}>Главная </Link>
                </Breadcrumb.Item>
                {pathname === Paths.FEEDBACKS && <Breadcrumb.Item>
                    <Link to={Paths.FEEDBACKS}>Отзывы пользователей </Link>
                </Breadcrumb.Item>}
            </Breadcrumb>
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

