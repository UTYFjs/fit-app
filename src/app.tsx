import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { LayoutMain } from '@pages/layouts/layout-main/layout-main';
import { Auth } from '@pages/auth/auth';
import { LayoutAuth } from '@pages/layouts/auth-layout/layout-auth';
import { ResultComponent } from '@components/result-component/result-component';
import ConfirmEmail from '@pages/confirm-email/confirm-email';
import ChangePassword from '@pages/change-password/change-password';
import { MainPage } from './pages';
import ProtectedRoute from '@components/protected-route/protected-route';
import { Paths } from '@constants/api';
import { useAppSelector } from './hooks';



const App = () => {
  const { previousLocations } = useAppSelector((state) => state.router);
  const { accessToken } = useAppSelector((state) => state.user);

  const isAllowedChangePassword =
      previousLocations?.[1]?.location?.pathname === Paths.CONFIRM_EMAIL;
  const isAllowedConfirmEmail =
      previousLocations?.[1]?.location?.pathname === Paths.LOGIN;

  return (
      <>
          <Routes>
              <Route path='/' element={<LayoutMain />}>
                  <Route
                      element={
                          <ProtectedRoute isAllowed={!!accessToken} redirectPath={Paths.LOGIN} />
                      }
                  >
                      <Route path='/' element={<Navigate to={'/main'} replace/>} />
                      <Route path='/main' element={<MainPage />} />
                  </Route>
                  <Route
                      element={
                          <ProtectedRoute isAllowed={!accessToken} redirectPath={Paths.MAIN} />
                      }
                  >
                      <Route path='auth' element={<LayoutAuth />}>
                          <Route index element={<Auth />} />
                          <Route path='registration' element={<Auth />} />

                          {/* <Route
                              element={
                                  <ProtectedRoute
                                      isAllowed={isAllowedConfirmEmail}
                                      redirectPath={Paths.LOGIN}
                                  />
                              }
                          ></Route>
                          <Route
                              element={
                                  <ProtectedRoute
                                      isAllowed={isAllowedChangePassword}
                                      redirectPath={Paths.LOGIN}
                                  />
                              }
                          ></Route> */}
                          <Route path='confirm-email' element={<ConfirmEmail />} />
                          <Route path='change-password' element={<ChangePassword />} />
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
                      <Route path='result' element={<LayoutAuth />}>
                          <Route path='success' element={<ResultComponent />} />
                          <Route path='error' element={<ResultComponent />} />
                          <Route path='error-user-exist' element={<ResultComponent />} />
                          <Route path='error-login' element={<ResultComponent />} />
                          <Route path='error-check-email-no-exist' element={<ResultComponent />} />
                          <Route path='error-check-email' element={<ResultComponent />} />
                          <Route path='error-change-password' element={<ResultComponent />} />
                          <Route path='success-change-password' element={<ResultComponent />} />
                      </Route>
                  </Route>
              </Route>
          </Routes>
      </>
  );
}

export default App
