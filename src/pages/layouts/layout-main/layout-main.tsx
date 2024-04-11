import { Loader } from '@components/loader/loader';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { RootState } from '@redux/configure-store';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import 'antd/dist/antd.css';
import './layout-main.css';
import classNames from 'classnames';
import { getAccessToken } from '@redux/user-slice';

export const LayoutMain: React.FC = () => {
    const isLoadingMutation = useAppSelector((state: RootState) =>
        Object.values(state.api.mutations).some((query) => query?.status === 'pending'),
    );
    const isLoadingQuery = useAppSelector((state: RootState) =>
        Object.values(state.api.queries).some((query) => query?.status === 'pending'),
    );
    const accessToken = useAppSelector(getAccessToken);

    return (
        <Layout className={classNames('app', !accessToken && 'auth-app')}>
            {(isLoadingMutation || isLoadingQuery) && <Loader />}
            <Outlet />
        </Layout>
    );
};
