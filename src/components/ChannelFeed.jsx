import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { currentChannelId, messages: { byChannelId } } = state;
  const currenChannelMessages = byChannelId[currentChannelId];
  return {
    messages: currenChannelMessages,
  };
};


class ChannelFeed extends React.PureComponent {
  render() {
    const { messages } = this.props;

    if (messages.length === 0) {
      return null;
    }

    return (
      <div className="messages">
        {messages.map(({ id, text, author }) => (
          <React.Fragment key={id}>
            <div>
              <b>{`${author}`}</b>
              <br />
              {text}
              <br />
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ChannelFeed);
