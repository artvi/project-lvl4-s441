import React from 'react';
import { connect } from 'react-redux';
import { Jumbotron } from 'react-bootstrap';

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

    if (messages.length === 0) {
      return null;
    }

    // return (
    //   <div className="messages">
    //     {messages.map(({ id, text, author }) => (
    //       <React.Fragment key={id}>
    //         <div>
    //           <b>{`${author}`}</b>
    //           <br />
    //           {text}
    //           <br />
    //         </div>
    //       </React.Fragment>
    //     ))}
    //   </div>
    // );

    return (
      <Jumbotron fluid>
        {messages.map(({ id, text, author }) => (
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
