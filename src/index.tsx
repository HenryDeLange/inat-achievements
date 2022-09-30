import 'bootstrap/dist/css/bootstrap.min.css';
import I18n from 'i18n-js';
import React from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import './index.css';
import { persistor, store } from './redux/ReduxStore';
import { af, en } from './translations/Translations';

// Setup the translations
I18n.fallbacks = true;
I18n.translations = { en, af };
I18n.defaultLocale = 'en';

// Setup the App
const root = createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
