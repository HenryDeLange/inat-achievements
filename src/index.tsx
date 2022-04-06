import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import ReduxStore from './redux/ReduxStore';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={ReduxStore}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
