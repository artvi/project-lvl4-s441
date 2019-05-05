import React from 'react';
import ChannelsList from './ChannelsList';
import ChannelFeed from './ChannelFeed';
import NewMessageForm from './NewMessageForm';
import NewChannelForm from './NewChannelForm';
import Modal from './Modal';

const App = () => (
  <div className="row">
    <div className="col-3">
      <NewChannelForm />
      <ChannelsList />
    </div>
    <div className="col-5">
      <NewMessageForm />
      <ChannelFeed />
    </div>
    <Modal />
  </div>
);
export default App;
