import React from 'react';
// import { connect } from 'react-redux';
import { Jumbotron } from 'react-bootstrap';
import connect from '../connect';

const mapStateToProps = (state) => {
  const { currentChannelId, messages: { byChannelId } } = state;
  const currenChannelMessages = byChannelId[currentChannelId];
  return {
    messages: currenChannelMessages,
  };
};

@connect(mapStateToProps)

class ChannelFeed extends React.PureComponent {
  render() {
    const { messages } = this.props;

    return (
      <Jumbotron fluid className="h-100 pl-3 pt-3">
        {messages.length > 0 && messages.map(({ id, text, author }) => (
          <React.Fragment key={id}>
            <div>
              <b>{`${author}`}</b>
              <br />
              <p>{text}</p>
            </div>
          </React.Fragment>
        ))}
      </Jumbotron>
    );
  }
}

export default ChannelFeed;
