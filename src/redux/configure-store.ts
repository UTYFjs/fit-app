import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from '@services/api';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';

import userReducer from './user-slice';
import userInfoReducer from './profile-slice';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
    savePreviousLocations: 1,
});

export const store = configureStore({
    reducer: combineReducers({
        router: routerReducer,
        user: userReducer,
        userInfo: userInfoReducer,
        [api.reducerPath]: api.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(routerMiddleware, api.middleware),
});

export const history = createReduxHistory(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
