import React, { useEffect, useState } from 'react';

import styles from './side-bar.module.css';

import 'antd/dist/antd.css';
import {
    HeartFilled,
    IdcardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TrophyFilled,
} from '@ant-design/icons';
import { Paths } from '@constants/api.ts';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { getCssVar } from '@utils/get-css-var.ts';
import { Badge, Button, Layout, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import { CleverFitIcon, FitIcon, ExitIcon, CalendarIcon } from '../custom-icons/custom-icons.tsx';
import { getInviteList } from '@redux/invite-slice.ts';
import { TrainingDataTestId } from '@constants/data-test-id.ts';
import { useExitApp } from '@hooks/use-exit-app.ts';

const { Sider } = Layout;

export const SideBar: React.FC = () => {
    const inviteList = useAppSelector(getInviteList);
    const { pathname } = useLocation();

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [collapsed, setCollapsed] = useState(isMobile);
    const [currentMenuItem, setCurrentMenuItem] = useState(pathname);

    const navigate = useNavigate();
    const exitApp = useExitApp();

    useEffect(() => {
        setCurrentMenuItem(pathname);
    }, [pathname]);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth < 768);
        setCollapsed(window.innerWidth < 768);
    });

    const colorPrimaryLight9 = getCssVar('--primary-light-9') || '#000';
    const styleMenuItem = {
        paddingLeft: isMobile ? 8 : 24,
        paddingRight: isMobile ? 0 : 16,
        marginLeft: collapsed ? '0' : '-8px',
        height: 42,
        letterSpacing: isMobile ? '.4px' : '.8px',
    };
    const menuItems = [
        {
            key: Paths.CALENDAR,
            icon: <CalendarIcon style={{ color: colorPrimaryLight9 }} />,
            label: 'Календарь',
            style: styleMenuItem,
        },
        {
            key: Paths.TRAINING,
            icon: (
                <Badge
                    data-test-id={TrainingDataTestId.NOTIFICATION_ABOUT_JOINT_TRAINING}
                    count={inviteList.length ? inviteList.length : 0}
                    size='small'
                >
                    <HeartFilled style={{ color: colorPrimaryLight9 }} />
                </Badge>
            ),
            label: 'Тренировки',
            style: styleMenuItem,
        },
        {
            key: Paths.ACHIEVEMENT,
            icon: <TrophyFilled style={{ color: colorPrimaryLight9 }} />,
            label: 'Достижения',
            style: styleMenuItem,
        },
        {
            key: Paths.PROFILE,
            icon: <IdcardOutlined style={{ color: colorPrimaryLight9 }} />,
            label: 'Профиль',
            style: styleMenuItem,
        },
    ];

    return (
        <Sider
            className={styles.sider}
            trigger={null}
            collapsed={collapsed}
            collapsedWidth={isMobile ? 0 : 64}
            width={isMobile ? 106 : 208}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                zIndex: 3,
                background: '#fff',
            }}
        >
            <div>
                <div
                    className={styles.logo}
                    style={{ marginRight: collapsed ? 0 : '15px' }}
                    onClick={() => {
                        navigate(Paths.MAIN);
                    }}
                >
                    {React.createElement(collapsed ? FitIcon : CleverFitIcon, {
                        className: 'trigger',
                    })}
                </div>
                <Menu
                    className={styles.menu}
                    theme='light'
                    mode='inline'
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: isMobile ? 192 : 230,
                        marginTop: isMobile ? 16 : 42,
                    }}
                    onClick={(item) => {
                        navigate(item.key);
                    }}
                    selectedKeys={[currentMenuItem]}
                    items={menuItems}
                />
            </div>
            <Button
                className={styles['button_trigger']}
                onClick={() => setCollapsed(!collapsed)}
                data-test-id={isMobile ? 'sider-switch-mobile' : 'sider-switch'}
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>

            <Button
                type='text'
                icon={isMobile ? '' : <ExitIcon />}
                className={styles['button_exit']}
                onClick={exitApp}
            >
                {!collapsed && 'Выход'}
            </Button>
        </Sider>
    );
};
