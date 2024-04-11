import { Paths } from '@constants/api';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setAccessToken } from '@redux/user-slice';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

type ProtectedRouteType = {
    isAllowed: boolean;
    redirectPath?: string;
};
export const ProtectedRoute = ({ isAllowed, redirectPath = '/' }: ProtectedRouteType) => {
    const location = useLocation();
    const accessToken = location.search.split('=');
    const dispatch = useAppDispatch();
    if (accessToken[1]) {
        dispatch(setAccessToken(accessToken[1]));
        localStorage.setItem('accessToken', accessToken[1]);
        return <Navigate to={Paths.MAIN} replace />;
    }
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
};
