import { Paths } from '@constants/api';
import { setExitAppInvite } from '@redux/invite-slice';
import { setExitAppProfile, setExitAppUserInfo } from '@redux/profile-slice';
import { setExitAppTraining } from '@redux/training-slice';
import { setExitApp } from '@redux/user-slice';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useExitApp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const exitApp = useCallback(() => {
        localStorage.removeItem('accessToken');
        dispatch(setExitAppInvite());
        dispatch(setExitAppProfile());
        dispatch(setExitAppTraining());
        dispatch(setExitApp());
        dispatch(setExitAppUserInfo());
        navigate(Paths.LOGIN);
    }, [dispatch, navigate]);

    return exitApp;
};
