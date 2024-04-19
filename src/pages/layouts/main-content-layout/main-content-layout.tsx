import { Outlet, useLocation } from 'react-router-dom';
import { FooterMy } from '@components/footer/footer-my';
import { HeaderMy } from '@components/header/header-my';
import { SideBar } from '@components/side-bar/side-bar';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './main-content-layout.css';
import { Paths } from '@constants/api';
import { Content } from 'antd/lib/layout/layout';
import { useLazyGetUserInfoQuery } from '@services/user-profile-api';
import { useLazyGetInviteListQuery } from '@services/invite-api';
import { useEffect } from 'react';

export const LayoutMainContent: React.FC = () => {
    const { pathname } = useLocation();
    const [getUserInfo, { isLoading }] = useLazyGetUserInfoQuery();
    const [getInviteList, { isLoading: isLoadingInviteList }] = useLazyGetInviteListQuery();

    useEffect(() => {
        getUserInfo();
        getInviteList();
    }, [getInviteList, getUserInfo]);

    return (
        <>
            <SideBar />
            {!isLoading && !isLoadingInviteList && (
                <Layout
                    className={
                        pathname === Paths.FEEDBACKS
                            ? 'site-layout site-layout_feedbacks'
                            : 'site-layout'
                    }
                >
                    {Object.values(Paths).includes(pathname as Paths) && <HeaderMy />}
                    <Content className='main'>
                        <Outlet />
                    </Content>
                    {pathname === Paths.MAIN && <FooterMy />}
                </Layout>
            )}
        </>
    );
};
