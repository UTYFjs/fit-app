import React, { useState } from 'react';

import 'antd/dist/antd.css';
import './main-page.css';
import { Card, Col, Layout, Menu, Row, Typography } from 'antd';
import { CalendarTwoTone, HeartFilled, IdcardOutlined, MenuFoldOutlined, MenuUnfoldOutlined, TrophyFilled, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import Profile from 'public/profile.svg'
import { SideBar } from '@components/side-bar/side-bar';
import { HeaderMy } from '@components/header/header-my';
import { FooterMy } from '@components/footer/footer-my';


const { Header, Content, Sider } = Layout;
const {Title, Text, Paragraph} = Typography;



export const MainPage: React.FC = () => {
   const [collapsed, setCollapsed] = useState(false);

   return (
       <Layout className='app'>
           <SideBar />

           <Layout className='site-layout'>
               <HeaderMy />
               <Content
                   className='main'
                   style={{
                       padding: 24,
                       minHeight: 280,
                   }}
               >
                   <Card style={{ maxWidth: 752 }}>
                       <p>С CleverFit ты сможешь:</p>
                       <p>
                           {' '}
                           — планировать свои тренировки на календаре, выбирая тип и уровень
                           нагрузки;
                       </p>
                       <p>
                           — отслеживать свои достижения в разделе статистики, сравнивая свои
                           результаты с нормами и рекордами;{' '}
                       </p>
                       <p>
                           — создавать свой профиль, где ты можешь загружать свои фото, видео и
                           отзывы о тренировках;{' '}
                       </p>
                       <p>
                           — выполнять расписанные тренировки для разных частей тела, следуя
                           подробным инструкциям и советам профессиональных тренеров.
                       </p>
                   </Card>
                   <Card style={{ maxWidth: 752 }}>
                       <p>
                           CleverFit — это не просто приложение, а твой личный помощник в мире
                           фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!
                       </p>
                   </Card>

                   <Row>
                       <Col>
                           <Card title='Расписать тренировки'>1111 </Card>
                       </Col>
                       <Col>
                           <Card title='Назначить календаль'>22222 </Card>
                       </Col>
                       <Col>
                           {' '}
                           <Card title='Заполнить профиль'>33333 </Card>
                       </Col>
                   </Row>
               </Content>
               <FooterMy />
           </Layout>
       </Layout>
   );
};
