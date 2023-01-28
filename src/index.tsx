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
import { setLogMessageAction } from './scripts/LogCache';
import { af, en } from './translations/Translations';

// Setup the translations
I18n.fallbacks = true;
I18n.translations = { en, af };
I18n.defaultLocale = 'en';

// Catch errors (to make it visible on the UI)
let cs = require('console-subscriber');
cs.unbind();
/**
 * Function to be called on console output
 * WARNING: calling console.log inside the callback would lead to an infinite recursion
 *
 * @param string $category info|warn|error|debug
 * @param array $args initial arguments of the call 
 */
let callback = (category: string, args: any) => {
    let message = `${category}: ${JSON.stringify(args)}\n`;
    setLogMessageAction(message);
};
cs.bind(callback);

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
