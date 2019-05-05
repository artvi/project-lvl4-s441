import React from 'react';
import ChannelsList from './ChannelsList';
import ChannelFeed from './ChannelFeed';
import NewMessageForm from './NewMessageForm';
import NewChannelForm from './NewChannelForm';
import Modal from './Modal';

const App = () => (
  <div className="row h-200">
    <div className="col-3">
      <h2 className="pb-2">Channels</h2>
      <NewChannelForm />
      <ChannelsList />
    </div>
    <div className="col-6">
      <ChannelFeed />
      <NewMessageForm />
    </div>
    <Modal />
  </div>
);
export default App;
