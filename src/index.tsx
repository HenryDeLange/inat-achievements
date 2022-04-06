import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import ReduxStore from './redux/ReduxStore';

const root = createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <Provider store={ReduxStore}>
            <App />
        </Provider>
    </React.StrictMode>
);
