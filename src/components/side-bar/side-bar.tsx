import { useEffect, useState } from 'react';
import styles from'./side-bar.module.css'
import 'antd/dist/antd.css';
import { Button, Layout, Menu } from 'antd';
import {
    HeartFilled,
    IdcardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TrophyFilled,
} from '@ant-design/icons';

import {CleverFitIcon, FitIcon, ExitIcon, CalendarIcon} from '../custom-icons/custom-icons.tsx';
import { getCssVar } from '@utils/get-css-var.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paths } from '@constants/api.ts';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { setAccessToken } from '@redux/user-slice.ts';
import React from 'react';

const {  Sider } = Layout;

export const SideBar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const {pathname} = useLocation();
    //todo в какой момент менять назад и назачать начальное через useLocation&
    const [currentMenuItem, setCurrentMenuItem] = useState(pathname)

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(()=> {setCurrentMenuItem(pathname)},[pathname])


    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth < 768);
    });


    const handleExit = () => {
            localStorage.removeItem('accessToken');
            dispatch(setAccessToken(''));
             navigate(Paths.LOGIN)
        };

    const colorPrimaryLight9 = getCssVar('--primary-light-9') || '#000';
    const styleMenuItem = {
        paddingLeft: isMobile ? 8 : 24,
        paddingRight: isMobile ? 0 : 16,
        marginLeft: collapsed ? '0' : '-8px',
        height: 42,
        letterSpacing: isMobile? '.4px':'.8px',
    };
    const menuItems = [
        {
            key: Paths.CALENDAR,
            icon: (
                <CalendarIcon style={{ color: colorPrimaryLight9 }}/>
            ),
            label: 'Календарь',
            style: styleMenuItem,
        },
        {
            key: Paths.TRAINING,
            icon: <HeartFilled style={{ color: colorPrimaryLight9 }} />,
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
                    onClick= {()=>{navigate(Paths.MAIN)}}
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
                    //selectable = {false}
                    //todo correct selected key
                    onClick={(item)=> {navigate(item.key);}}
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
                onClick = {handleExit}
            >
                {!collapsed && 'Выход'}
            </Button>
        </Sider>
    );
};
