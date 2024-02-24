import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import appReducer from'./app-slice'

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});



export const store = configureStore({
    reducer: combineReducers({
        router: routerReducer,
        app: appReducer,
    }),

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
});



export const history = createReduxHistory(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
