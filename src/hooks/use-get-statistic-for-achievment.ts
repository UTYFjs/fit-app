import { Paths } from '@constants/api';
import { setExitAppInvite } from '@redux/invite-slice';
import { setExitAppProfile, setExitAppUserInfo } from '@redux/profile-slice';
import { setExitAppTraining } from '@redux/training-slice';
import { setExitApp } from '@redux/user-slice';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useGetStatisticsForAchievement = () => {
    return {
        avgLoadByDay: [], // для диаграммы
        approachesCount: 0,
        replaysCount: 0,
        mostFrequentTraining: '', //for card
        mostFrequentExercise: '', //for card
        frequentExercises: [], // for diagramm
        frequentExercisesByDayOfWeek: [], //for legend
    };
};
