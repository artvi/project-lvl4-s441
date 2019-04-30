import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

// import faker from 'faker';
import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { createStore } from 'redux';
import reducers from './reducers';
import App from './components/App.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

// ReactDOM.render(<App channels={gon.channels} />, document.getElementById('chat'));

/* eslint-disable no-underscore-dangle */
const { channels } = gon;
const byId = {};
channels.forEach((channel) => {
  byId[channel.id] = channel;
});
const allIds = channels.map(item => item.id);
const initState = {
  channels: {
    byId,
    allIds,
  },
};

const store = createStore(
  reducers,
  initState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('chat'),
);
