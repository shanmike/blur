import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {unregister} from './registerServiceWorker';
import {Provider} from 'react-redux'
import store from './store'
import {HashRouter} from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui/styles';

ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <MuiThemeProvider>
            <App />
            </MuiThemeProvider>
        </Provider>
    </HashRouter>
    , document.getElementById('root'));
unregister();