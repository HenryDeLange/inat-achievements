import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import ReduxStore from './redux/ReduxStore';

const root = createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <Provider store={ReduxStore}>
            <App />
        </Provider>
    </React.StrictMode>
);
