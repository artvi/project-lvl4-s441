import React from 'react';
import _ from 'lodash';
import cookies from 'js-cookie';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { currentChannelId } = state;
  return { currentChannelId };
};

const actionCreators = {
  sendMessage: actions.sendMessage,
  sendMessageFailure: actions.sendMessageFailure,
};

class NewMessageForm extends React.Component {
  handleSubmit = async (values) => {
    const {
      sendMessageFailure,
      sendMessage,
      reset,
      currentChannelId,
    } = this.props;

    const message = {
      ...values,
      id: _.uniqueId(),
      channelId: currentChannelId,
      author: cookies.get('username'),
    };
    try {
      await sendMessage({ message });
    } catch (err) {
      sendMessageFailure();
      throw new SubmissionError({ _error: err.message });
    }
    reset();
  }

  render() {
    const {
      handleSubmit, submitting, pristine, error,
    } = this.props;
    return (
      <form className="form-inline" onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-group mx-3">
          <Field placeholder=" enter your message" name="text" required disabled={submitting} component="input" type="text" />
        </div>
        <input type="submit" disabled={pristine || submitting} className="btn btn-primary btn-sm" value="Send" />
        {error && <div className="ml-3">{error}</div>}
      </form>
    );
  }
}

const ConnectedNewMessageForm = connect(mapStateToProps, actionCreators)(NewMessageForm);

export default reduxForm({
  form: 'newMessage',
})(ConnectedNewMessageForm);
