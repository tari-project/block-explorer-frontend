import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

import './index.css';

const rootElement = document.getElementById('root');
function render(AppComponent: () => JSX.Element) {
    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <AppComponent />
            </Provider>
        </React.StrictMode>,
        rootElement
    );
}

render(App);

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        render(NextApp);
    });
}
