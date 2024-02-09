import React, { useState } from 'react';

import 'antd/dist/antd.css';
import './main-page.css';
import { Layout, Menu, Typography } from 'antd';
import { CalendarTwoTone, HeartFilled, MenuFoldOutlined, MenuUnfoldOutlined, TrophyFilled, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import Profile from 'public/profile.svg'

const { Header, Content, Sider } = Layout;
const {Title, Text} = Typography;



export const MainPage: React.FC = () => {
   const [collapsed, setCollapsed] = useState(false);

   return (
       <Layout className='app'>
           <Sider
               trigger={null}
               collapsible
               collapsed={collapsed}
               style={{ width: 208 }}
               collapsedWidth={64}
               width={208}
           >
               <div className='logo trigger' onClick={() => setCollapsed(!collapsed)}>
                   {collapsed ? 'logo2' : 'logo1'}
                   <img
                       src={
                           collapsed ? '/public/cleverFit_large.svg' : '/public/cleverFit_large.svg'
                       }
                   />
               </div>
               <Menu
                   theme='light'
                   mode='inline'
                   defaultSelectedKeys={['1']}
                   items={[
                       {
                           key: '1',
                           icon: (
                               <CalendarTwoTone twoToneColor='--character-light-primary-inverse' />
                           ),
                           label: 'Календарь',
                       },
                       {
                           key: '2',
                           icon: <HeartFilled />,
                           label: 'Тренировки',
                       },
                       {
                           key: '3',
                           icon: <TrophyFilled />,
                           label: 'Достижения',
                       },
                       {
                           key: '4',
                           icon: <UploadOutlined />,
                           label: 'Профиль',
                       },
                   ]}
               />
           </Sider>
           <Layout className='site-layout' style={{width: collapsed ? 1376: 1232}}>
               <Header className='header' style={{ padding: 0 }}>
                   <Text>Главная</Text>
                   <Title className='title_header'>
                       Приветствуем тебя в приложении CleverFit - приложении, которое поможет тебе
                       добиться своей мечты!
                   </Title>
               </Header>
               <Content
                   className='main'
                   style={{
                       padding: 24,
                       minHeight: 280,
                   }}
               >
                   <Text>

                   </Text>
               </Content>
           </Layout>
       </Layout>
   );
};
