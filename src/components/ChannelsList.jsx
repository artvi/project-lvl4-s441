import React from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
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
  removeChannel: actions.removeChannel,
  removeChannelFailure: actions.removeChannelFailure,
};

class ChannelsList extends React.Component {
  handleClick = id => (e) => {
    e.preventDefault();
    const { moveToChannel } = this.props;
    moveToChannel({ id });
  }

  handleRemove = id => async (e) => {
    e.preventDefault();
    const { removeChannel, removeChannelFailure } = this.props;
    try {
      await removeChannel({ id });
    } catch (err) {
      removeChannelFailure();
    }
  }

  render() {
    const { channels, currentChannelId } = this.props;

    if (channels.length === 0) {
      return null;
    }

    return (
      <div className="channels">
        <ListGroup>
          {channels.map(({ id, name, removable }) => (
            <React.Fragment key={id}>
              <ListGroup.Item
                action
                active={id === currentChannelId}
                onClick={this.handleClick(id)}
              >
                {name}
                {removable && (
                <FontAwesomeIcon
                  className="float-right"
                  icon={faTrashAlt}
                  onClick={this.handleRemove(id)}
                />
                )}
              </ListGroup.Item>
            </React.Fragment>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(ChannelsList);
