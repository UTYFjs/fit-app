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
import { getCssVar } from '@utils/get-css-var.ts';
import { Button, Layout, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import { CleverFitIcon, FitIcon, ExitIcon, CalendarIcon } from '../custom-icons/custom-icons.tsx';
import { AchievementDataTestId, CalendarDataTeatId } from '@constants/data-test-id.ts';
import { useExitApp } from '@hooks/use-exit-app.ts';
import { useLazyGetTrainingsQuery } from '@services/training-api.ts';
import { ModalServerError } from '@components/modal-server-error/modal-server-error.tsx';
import { BadgeCustom } from '@components/badge-custom/badge-custom.tsx';

const { Sider } = Layout;
type MenuInfo = {
    key: Paths;
    icon: JSX.Element;
    label: string;
    style: React.CSSProperties;
};
export const SideBar: React.FC = () => {
    const [getTrainings, { isError }] = useLazyGetTrainingsQuery();

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
    const menuItems: MenuInfo[] = [
        {
            key: Paths.CALENDAR,
            icon: isMobile ? (
                <span className={styles.empty} />
            ) : (
                <CalendarIcon style={{ color: colorPrimaryLight9 }} />
            ),
            label: 'Календарь',
            style: styleMenuItem,
        },
        {
            key: Paths.TRAINING,
            icon: isMobile ? (
                <span className={styles.empty} />
            ) : (
                <BadgeCustom
                    icon={<HeartFilled style={{ color: colorPrimaryLight9 }} />}
                    isCollapsed={collapsed}
                />
            ),
            label: 'Тренировки',
            style: styleMenuItem,
        },
        {
            key: Paths.ACHIEVEMENT,
            icon: isMobile ? (
                <span className={styles.empty} />
            ) : (
                <TrophyFilled style={{ color: colorPrimaryLight9 }} />
            ),
            label: (
                <p data-test-id={AchievementDataTestId.SIDEBAR_ACHIEVEMENTS}> Достижения</p>
            ) as unknown as string,
            style: styleMenuItem,
        },
        {
            key: Paths.PROFILE,
            icon: isMobile ? (
                <span className={styles.empty} />
            ) : (
                <IdcardOutlined style={{ color: colorPrimaryLight9 }} />
            ),
            label: 'Профиль',
            style: styleMenuItem,
        },
    ];

    const handleOnClickMenu = async (item: { key: string }) => {
        try {
            if (
                item.key === Paths.ACHIEVEMENT ||
                item.key === Paths.TRAINING ||
                item.key === Paths.CALENDAR
            ) {
                await getTrainings().unwrap();
            }
            navigate(item.key);
        } catch {
            () => {};
        }
    };
    return (
        <>
            {' '}
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
                            handleOnClickMenu(item);
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
            {isError && (
                <ModalServerError
                    dataTestId={CalendarDataTeatId.MODAL_NO_REVIEW}
                    isOpen={isError}
                />
            )}
        </>
    );
};
