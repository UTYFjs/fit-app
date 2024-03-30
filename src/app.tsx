import ProtectedRoute from '@components/protected-route/protected-route';
import { ResultComponent } from '@components/result-component/result-component';
import { Paths } from '@constants/api';
import AchievmentPage from '@pages/achievment-page/achievment-page';
import { Auth } from '@pages/auth/auth';
import CalendarPage from '@pages/calendar-page/calendar-page';
import ChangePassword from '@pages/change-password/change-password';
import ConfirmEmail from '@pages/confirm-email/confirm-email';
import Feedbacks from '@pages/feedbacks/feedbacks';
import { LayoutAuth } from '@pages/layouts/auth-layout/layout-auth';
import { LayoutMain } from '@pages/layouts/layout-main/layout-main';
import { LayoutMainContent } from '@pages/layouts/main-content-layout/main-content-layout';
import ProfilePage from '@pages/profile-page/profile-page';
import TrainingPage from '@pages/training-page/training-page';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppSelector } from './hooks';
import { MainPage } from './pages';
import SettingsPage from '@pages/settings-page/settings-page';
import NotFound from '@pages/not-found/not-found';

const App = () => {
    const { previousLocations } = useAppSelector((state) => state.router);
    const { accessToken } = useAppSelector((state) => state.user);
    return (
        <>
            <Routes>
                <Route path='/' element={<LayoutMain />}>
                    <Route
                        element={
                            <ProtectedRoute isAllowed={!!accessToken} redirectPath={Paths.LOGIN} />
                        }
                    >
                        <Route element={<LayoutMainContent />}>
                            <Route path='/' element={<Navigate to={Paths.MAIN} replace />} />
                            <Route path={Paths.MAIN} element={<MainPage />} />
                            <Route path={Paths.FEEDBACKS} element={<Feedbacks />} />
                            <Route path={Paths.CALENDAR} element={<CalendarPage />} />
                            <Route path={Paths.TRAINING} element={<TrainingPage />} />
                            <Route path={Paths.ACHIEVEMENT} element={<AchievmentPage />} />
                            <Route path={Paths.PROFILE} element={<ProfilePage />} />
                            <Route path={Paths.SETTINGS} element={<SettingsPage />} />
                            <Route path='*' element={<NotFound />} />
                        </Route>
                    </Route>
                    <Route
                        element={
                            <ProtectedRoute isAllowed={!accessToken} redirectPath={Paths.MAIN} />
                        }
                    >
                        <Route path={Paths.LOGIN} element={<LayoutAuth />}>
                            <Route index element={<Auth />} />
                            <Route path={Paths.REGISTRATION} element={<Auth />} />
                            <Route path={Paths.CONFIRM_EMAIL} element={<ConfirmEmail />} />
                            <Route path={Paths.CHANGE_PASSWORD} element={<ChangePassword />} />
                        </Route>
                    </Route>

                    <Route
                        element={
                            <ProtectedRoute
                                isAllowed={!(!previousLocations || previousLocations?.length === 1)}
                                redirectPath={Paths.MAIN}
                            />
                        }
                    >
                        <Route path={Paths.RESULT} element={<LayoutAuth />}>
                            <Route path={Paths.SUCCESS} element={<ResultComponent />} />
                            <Route path={Paths.ERROR} element={<ResultComponent />} />
                            <Route path={Paths.ERROR_USER_EXIST} element={<ResultComponent />} />
                            <Route path={Paths.ERROR_LOGIN} element={<ResultComponent />} />
                            <Route
                                path={Paths.ERROR_CHECK_EMAIL_NO_EXIST}
                                element={<ResultComponent />}
                            />
                            <Route path={Paths.ERROR_CHECK_EMAIL} element={<ResultComponent />} />
                            <Route
                                path={Paths.ERROR_CHANGE_PASSWORD}
                                element={<ResultComponent />}
                            />
                            <Route
                                path={Paths.SUCCESS_CHANGE_PASSWORD}
                                element={<ResultComponent />}
                            />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </>
    );
};

export default App;
