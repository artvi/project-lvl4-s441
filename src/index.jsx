import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

import faker from 'faker';
import gon from 'gon';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/App.jsx';
import normalize from './normalize.js';
import * as actions from './actions';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const userName = faker.name.findName();
cookies.set('username', userName);

const socket = io();

const initState = normalize(gon);

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
/* eslint-enable */
const devtoolsMiddleware = ext && ext();


const store = createStore(
  reducers,
  initState,
  compose(
    applyMiddleware(thunk),
    devtoolsMiddleware,
  ),
);

socket.on('newMessage', ({ data }) => {
  const message = data.attributes;
  const { fetchMessage } = actions;
  if (message.author !== userName) {
    store.dispatch(fetchMessage({ message }));
  }
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('chat'),
);
