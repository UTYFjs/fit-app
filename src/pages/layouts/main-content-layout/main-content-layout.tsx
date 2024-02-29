
import { Outlet } from 'react-router-dom';
import { FooterMy } from '@components/footer/footer-my';
import { HeaderMy } from '@components/header/header-my';
import { SideBar } from '@components/side-bar/side-bar';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './main-content-layout.css';
import { Content } from 'antd/lib/layout/layout';

export const LayoutMainContent: React.FC = () => {

    return (
        <>
            <SideBar />
            <Layout className='site-layout'>
                <HeaderMy />
                <Content className='main'>
                    <Outlet />
                </Content>
                <FooterMy />
            </Layout>
        </>
    );
};
