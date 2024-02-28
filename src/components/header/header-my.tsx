import styles from './header-my.module.css';
import 'antd/dist/antd.css';
import { Typography, Layout, Breadcrumb, Button } from 'antd';
import {    SettingOutlined} from '@ant-design/icons';




const { Header } = Layout;
const { Title } = Typography;


export const HeaderMy: React.FC = () => 
     (
        <Header className={styles.header}>
            <Breadcrumb className={styles.breadcrumb}>Главная </Breadcrumb>
            <div className={styles['title__wrapper']}>
                {' '}
                <Title
                    className={styles['title_header']}
                >
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
        </Header>
    );

