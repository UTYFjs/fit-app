import {  Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import Loader from '@components/loader/loader';
import { RootState } from '@redux/configure-store';
import 'antd/dist/antd.css';
import './layout-main.css';

export const LayoutMain: React.FC = () => {
    const isLoadingMutation = useAppSelector((state: RootState) =>
       Object.values(state.api.mutations).some((query) => query?.status === 'pending')
    );
    const isLoadingQuery = useAppSelector((state: RootState) =>
            Object.values(state.api.queries).some((query) => query?.status === 'pending'),
        );
    
return (
    <Layout className='app'>
        {(isLoadingMutation || isLoadingQuery) && <Loader />}
        <Outlet />
    </Layout>
);
}


