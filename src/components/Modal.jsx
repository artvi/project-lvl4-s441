import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';
import NewChannelNameForm from './NewChannelNameForm';

const mapStateToProps = (state) => {
  const { modal } = state;
  return { ...modal };
};

const actionCreators = {
  openModal: actions.openModal,
  closeModal: actions.closeModal,
  removeChannel: actions.removeChannel,
  removeChannelFailure: actions.removeChannelFailure,
};

class MyModal extends React.Component {
  handleRemove = async (e) => {
    e.preventDefault();
    const {
      closeModal,
      removeChannel,
      removeChannelFailure,
      data,
    } = this.props;
    const { id } = data;
    try {
      await removeChannel({ id });
    } catch (err) {
      removeChannelFailure();
    }
    closeModal();
  }

  render() {
    const { show, data: { type, name }, closeModal } = this.props;
    if (!show) {
      return null;
    }

    const footer = (
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button variant="danger" onClick={this.handleRemove}>
          Delete
        </Button>
      </Modal.Footer>
    );

    const content = {
      remove: {
        title: 'Are you sure?',
        body: `You're going to remove '${name}' channel`,
        footer,
      },
      edit: {
        title: 'Edit channel name',
        body: <NewChannelNameForm initialValues={{ name }} />,
        footer: null,
      },
    };

    return (
      <Modal show onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{content[type].title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content[type].body}</Modal.Body>
        {content[type].footer}
      </Modal>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(MyModal);
