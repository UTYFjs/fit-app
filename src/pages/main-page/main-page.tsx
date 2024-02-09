import React, { useState } from 'react';

import 'antd/dist/antd.css';
import './main-page.css';
import { Layout, Menu, Typography } from 'antd';
import { CalendarTwoTone, HeartFilled, IdcardOutlined, MenuFoldOutlined, MenuUnfoldOutlined, TrophyFilled, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import Profile from 'public/profile.svg'
import { SideBar } from '@components/side-bar/side-bar';

const { Header, Content, Sider } = Layout;
const {Title, Text} = Typography;



export const MainPage: React.FC = () => {
   const [collapsed, setCollapsed] = useState(false);

   return (
       <Layout className='app'>
        <SideBar/>
           
           <Layout className='site-layout' style={{ width: collapsed ? 1376 : 1232 }}>
               <Header className='header'>
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
                   <Text></Text>
               </Content>
           </Layout>
       </Layout>
   );
};
