import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Form, InputGroup, Button } from 'react-bootstrap';
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
      <Form onSubmit={handleSubmit(this.handleSubmit)}>
        <InputGroup className="mb-3">
          <Field placeholder=" new channel" className="form-control" component="input" name="name" disabled={submitting} />
          <InputGroup.Append>
            <Button disabled={pristine || submitting} variant="outline-secondary" type="submit">Add</Button>
          </InputGroup.Append>
          {error && <div className="ml-3">{error}</div>}
        </InputGroup>
      </Form>
    );
  }
}

const ConnectedNewChannelForm = connect(mapStateToProps, actionCreators)(NewChannelForm);

export default reduxForm({
  form: 'newChannel',
})(ConnectedNewChannelForm);
