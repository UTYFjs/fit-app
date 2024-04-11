import { Paths } from '@constants/api';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setAccessToken } from '@redux/user-slice';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

type ProtectedRouteType = {
    isAllowed: boolean;
    redirectPath?: string;
};
export const ProtectedRoute = ({ isAllowed, redirectPath = '/' }: ProtectedRouteType) => {
    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    useEffect(() => {
        const accessToken = location.search.split('=');
        if (accessToken[1]) {
            dispatch(setAccessToken(accessToken[1]));
            localStorage.setItem('accessToken', accessToken[1]);
            navigate(Paths.MAIN, { replace: true });
        }
    }, [dispatch, navigate, location.search]);

    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
};
