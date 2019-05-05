import React from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { channels, currentChannelId, modal } = state;
  const { allIds, byId } = channels;
  return {
    channels: allIds.map(id => byId[id]),
    currentChannelId,
    modal,
  };
};

const actionCreators = {
  addChannel: actions.addChannel,
  moveToChannel: actions.moveToChannel,
  openModal: actions.openModal,
};

@connect(mapStateToProps, actionCreators)

class ChannelsList extends React.Component {
  handleClick = id => (e) => {
    e.preventDefault();
    const { moveToChannel } = this.props;
    moveToChannel({ id });
  }


  handleOpenModal = (id, name, action) => () => {
    const { openModal } = this.props;
    openModal({ data: { id, name, type: action } });
  }


  render() {
    const { channels, currentChannelId } = this.props;

    if (channels.length === 0) {
      return null;
    }

    const renderButtons = (id, name) => (
      <React.Fragment>
        <FontAwesomeIcon
          className="float-right ml-2"
          icon={faTrashAlt}
          onClick={this.handleOpenModal(id, name, 'remove')}
        />
        <FontAwesomeIcon
          className="float-right"
          icon={faEdit}
          onClick={this.handleOpenModal(id, name, 'edit')}
        />
      </React.Fragment>
    );

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
                {removable && renderButtons(id, name)}
              </ListGroup.Item>
            </React.Fragment>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default ChannelsList;
