import React from 'react';
import _ from 'lodash';
import cookies from 'js-cookie';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import connect from '../connect';

const mapStateToProps = (state) => {
  const { currentChannelId } = state;
  return { currentChannelId };
};

@connect(mapStateToProps)
@reduxForm({
  form: 'newMessage',
})

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
      <Form onSubmit={handleSubmit(this.handleSubmit)}>
        <InputGroup className="mb-3">
          <Field placeholder=" Your message" className="form-control" component="input" name="text" disabled={submitting} />
          <InputGroup.Append>
            <Button disabled={pristine || submitting} variant="outline-secondary" type="submit">Send</Button>
          </InputGroup.Append>
          {error && <div className="ml-3">{error}</div>}
        </InputGroup>
      </Form>
    );
  }
}

export default NewMessageForm;
