import React from 'react';
import ChannelsList from './ChannelsList';
import ChannelFeed from './ChannelFeed';
import NewMessageForm from './NewMessageForm';
import NewChannelForm from './NewChannelForm';

const App = () => (
  <div className="row">
    <div className="col-3">
      <ChannelsList />
      <NewChannelForm />
    </div>
    <div className="col-5">
      <NewMessageForm />
      <ChannelFeed />
    </div>
  </div>
);
export default App;
