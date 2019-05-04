import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { currentChannelId } = state;
  return { currentChannelId };
};

const actionCreators = {
  addChannel: actions.addChannel,
  addChannelFailure: actions.addChannelFailure,
};

class NewChannelForm extends React.Component {
  handleSubmit = async (values) => {
    const {
      addChannel,
      addChannelFailure,
      reset,
    } = this.props;
    const channel = {
      ...values,
      id: _.uniqueId(),
    };
    try {
      await addChannel({ channel });
    } catch (err) {
      addChannelFailure();
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
          <Field placeholder="Create Your Own Channel" name="name" required disabled={submitting} component="input" type="text" />
        </div>
        <input type="submit" disabled={pristine || submitting} className="btn btn-primary btn-sm" value="Create" />
        {error && <div className="ml-3">{error}</div>}
      </form>
    );
  }
}

const ConnectedNewChannelForm = connect(mapStateToProps, actionCreators)(NewChannelForm);

export default reduxForm({
  form: 'newChannel',
})(ConnectedNewChannelForm);
