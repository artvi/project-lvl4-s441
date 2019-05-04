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


/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
/* eslint-enable */
const devtoolsMiddleware = ext && ext();

const initState = normalize(gon);
const store = createStore(
  reducers,
  initState,
  compose(
    applyMiddleware(thunk),
    devtoolsMiddleware,
  ),
);


const userName = faker.name.findName();
cookies.set('username', userName);


const socket = io();
socket.on('newMessage', ({ data }) => {
  const message = data.attributes;
  const { fetchNewMessage } = actions;
  store.dispatch(fetchNewMessage({ message }));
});
socket.on('newChannel', ({ data }) => {
  const channel = data.attributes;
  const { fetchNewChannel } = actions;
  store.dispatch(fetchNewChannel({ channel }));
});
socket.on('removeChannel', ({ data }) => {
  const { id } = data;
  const { fetchRemovedChannel } = actions;
  store.dispatch(fetchRemovedChannel({ id }));
});


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('chat'),
);
