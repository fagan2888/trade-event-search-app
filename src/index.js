import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import App from './containers/App';

const store = configureStore();

ReactDOM.render(
  <Provider store={store} key="provider">
    <App />
  </Provider>, document.getElementById('root'));
