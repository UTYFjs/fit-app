import React from 'react';

import { store, history } from '@redux/configure-store';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6';

import App from './app';
import 'normalize.css';
import './index.css';

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
