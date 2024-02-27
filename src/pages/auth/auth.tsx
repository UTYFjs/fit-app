import React from 'react';
import styles from'./auth.module.css';
import 'antd/dist/antd.css';
import { CleverFitIcon } from '@components/custom-icons/custom-icons';
import { Tabs } from 'antd';
import { Login } from '@components/login/login';
import { Link, useLocation } from 'react-router-dom';
import { Registration } from '@components/registration/registration';
import Loader from '@components/loader/loader';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { isLoadingState } from '@redux/app-slice';



export const Auth: React.FC = () => {
 const { pathname } = useLocation();
 const isLoading = useAppSelector(isLoadingState)
    const items = [
        { label: <Link to='/auth'>Вход</Link>, key: 'login', children: <Login /> }, // remember to pass the key prop
        {
            label: <Link to='/auth/registration'>Регистрация</Link>,
            key: 'registration',
            children: <Registration />,
        },
    ];


    return (
        <>
            {' '}
            {isLoading && <Loader />}
            <div className={styles.logo}>
                <CleverFitIcon />
            </div>
            <Tabs
                className={styles['auth_tabs']}
                defaultActiveKey={pathname === '/auth' ? 'login' : 'registration'}
                centered
                tabBarGutter={0}
                tabBarStyle={{
                    width: '100%',
                    margin: '0 auto',
                   
                }}
                style={{
                    marginBottom: pathname === '/auth' ? 110 : 0,
                    //height: pathname === '/auth/login' ? 380 : 418,
                }}
                size='large'
                items={items}
            />
        </>
    );};
