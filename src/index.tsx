import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { HistoryRouter } from 'redux-first-history/rr6';


import { store, history } from '@redux/configure-store';
import { MainPage } from './pages';

import 'normalize.css';
import './index.css';
import { LayoutMain } from '@pages/layouts/layout-main/layout-main';
import { Auth } from '@pages/auth/auth';
import { LayoutAuth } from '@pages/layouts/auth-layout/layout-auth';
import { ResultComponent } from '@components/result-component/result-component';
import ConfirmEmail from '@pages/confirm-email/confirm-email';
import ChangePassword from '@pages/change-password/change-password';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>
                <Routes>
                    <Route path='/' element={<LayoutMain />}>
                        <Route index path='/main' element={<MainPage />} />
                        <Route path='auth' element={<LayoutAuth />}>
                            <Route index element={<Auth />} />
                            <Route path='registration' element={<Auth />} />
                            <Route path='change-password'element={<ChangePassword/>} />
                            <Route path='confirm-email' element={<ConfirmEmail />} />
                        </Route>

                        <Route path='result' element={<LayoutAuth />}>
                            <Route path='success' element={<ResultComponent />} />
                            <Route path='error' element={<ResultComponent />} />
                            <Route path='error-user-exist' element={<ResultComponent />} />
                            <Route path='error-login' element={<ResultComponent />} />
                            <Route
                                path='error-check-email-no-exist'
                                element={<ResultComponent />}
                            />
                            <Route path='error-check-email' element={<ResultComponent />} />
                            <Route path='error-change-password' element={<ResultComponent />} />
                            <Route path='success-change-password' element={<ResultComponent />} />
                        </Route>
                    </Route>
                </Routes>
            </HistoryRouter>
        </Provider>
    </React.StrictMode>,
);
