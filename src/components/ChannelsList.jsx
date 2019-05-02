import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { channels, currentChannelId } = state;
  const { allIds, byId } = channels;
  return {
    channels: allIds.map(id => byId[id]),
    currentChannelId,
  };
};

const actionCreators = {
  addChannel: actions.addChannel,
  moveToChannel: actions.moveToChannel,
};

class ChannelsList extends React.Component {
  handleClick = id => (e) => {
    e.preventDefault();
    const { moveToChannel } = this.props;
    moveToChannel(id);
  }

  render() {
    const { channels, currentChannelId } = this.props;

    if (channels.length === 0) {
      return null;
    }
    const selectedChannelClasses = 'list-group-item active';
    const channelClasses = 'list-group-item';
    return (
      <div className="channels">
        <ul className="list-group">
          {channels.map(({ id, name }) => (
            <React.Fragment key={id}>
              <li className={id === currentChannelId ? selectedChannelClasses : channelClasses}>
                <button onClick={this.handleClick(id)} type="button" className="btn btn-primary">
                  {name}
                </button>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(ChannelsList);
