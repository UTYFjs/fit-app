import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6';
import { store, history } from '@redux/configure-store';
import App from './app';
import 'normalize.css';
import './index.css';
import { ConfigProvider } from 'antd';
import ru_RU from 'antd/lib/locale-provider/ru_RU'


const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>
                    <App />
            </HistoryRouter>
        </Provider>
    </React.StrictMode>,
);
