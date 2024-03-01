import styles from './footer-my.module.css';
import 'antd/dist/antd.css';
import { Card, Layout, Button } from 'antd';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Paths } from '@constants/api';
import { useGetFeedbacksQuery } from '@services/feedback-api';


const { Footer } = Layout;
const {Meta} = Card

export const FooterMy: React.FC = () => {
    //const {data,refetch,   } = useGetFeedbacksQuery('', {})

    
    const handleFeedbacks = () =>{
        
        console.log();
    }
    
    return(
    <Footer className={styles.footer}>
        <Button type='text' className={styles['button_review']}>
            <Link to={Paths.FEEDBACKS}>Смотреть отзывы</Link>
        </Button>
        <Card
            className={styles['footer__card']}
            actions={[
                <Button onClick={handleFeedbacks} type='text' icon={<AndroidFilled />} className={styles['button_android']}>
                    Android OS
                </Button>,
                <Button type='text' icon={<AppleFilled />} className={styles['button_apple']}>
                    Apple iOS
                </Button>,
            ]}
        >
            <Meta
                title='Скачать на телефон'
                description='Доступно в PRO-тарифе'
                className={styles['card-body']}
            />
        </Card>
    </Footer>
);}

