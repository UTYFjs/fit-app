import React, { useState } from 'react';
import styles from'./side-bar.module.css'
import classNames from 'classnames'
import 'antd/dist/antd.css';
import { Button, Layout, Menu } from 'antd';
import {
    CalendarTwoTone,
    HeartFilled,
    IdcardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TrophyFilled,
} from '@ant-design/icons';

import {CleverFitIcon, FitIcon, ExitIcon} from '../custom-icons/custom-icons.tsx';
import { getCssVar } from '@utils/get-css-var.ts';


const {  Sider } = Layout;




export const SideBar: React.FC = () => {

    const [collapsed, setCollapsed] = useState(false);
    const colorPrimaryLight9 = getCssVar('--primary-light-9') || '#000';
    const colorCharacterLightTitle85 = getCssVar('--character-light-title-85') || '#000';
    const styleMenuItem = {
        padding: collapsed ? '0 12px' : '0 16px',

        height: 42,
        letterSpacing: '.8px',
    };
    const menuItems = [
        {
            key: '1',
            icon: <CalendarTwoTone twoToneColor={colorPrimaryLight9} />,
            label: 'Календарь',
            style: styleMenuItem,
        },
        {
            key: '2',
            icon: <HeartFilled style={{ color: colorPrimaryLight9 }} />,
            label: 'Тренировки',
            style: styleMenuItem,
        },
        {
            key: '3',
            icon: <TrophyFilled style={{ color: colorPrimaryLight9 }} />,
            label: 'Достижения',

            style: styleMenuItem,
        },
        {
            key: '4',
            icon: <IdcardOutlined style={{ color: colorPrimaryLight9 }} />,
            label: 'Профиль',
            style: styleMenuItem,
        },
    ];
   const classNameSider = classNames(styles.sider, styles.sider2)


    return (
        <Sider
            className={classNameSider}
            trigger={null}
            collapsible
            collapsed={collapsed}
            collapsedWidth={64}
            width={208}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: 208,
                background: '#fff',
            }}
        >
            <div>
                <div
                    className={styles.logo}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{  marginRight: collapsed ? 0 : '15px' }}
                >
                    {React.createElement(collapsed ? FitIcon : CleverFitIcon, {
                        className: 'trigger',
                    })}
                </div>
                <Menu
                    theme='light'
                    mode='inline'
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: 226,
                        marginTop: 46,
                    }}
                    //defaultSelectedKeys={['1']}
                    items={menuItems}
                />
            </div>
            <Button
                className={styles['button_trigger']}
                onClick={() => setCollapsed(!collapsed)}
                data-test-id='sider-switch'
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>

            <Button type='text' icon={<ExitIcon />} className={styles['button_exit']}>
                {!collapsed && 'Выход'}
            </Button>
        </Sider>
    );
};
