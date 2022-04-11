import 'bootstrap/dist/css/bootstrap.min.css';
import I18n from 'i18n-js';
import React from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import ReduxStore from './redux/ReduxStore';
import { af, en } from './translations/Translations';

// Setup the translations
I18n.fallbacks = true;
I18n.translations = { en, af };
I18n.defaultLocale = 'en';
// TODO: How to get this from the browser?
I18n.locale = 'af';

// Setup the App
const root = createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <Provider store={ReduxStore}>
            <App />
        </Provider>
    </React.StrictMode>
);
