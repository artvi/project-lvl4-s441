import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import connect from '../connect';

const mapStateToProps = (state) => {
  const { modal } = state;
  return { ...modal.data };
};

@connect(mapStateToProps)

@reduxForm({
  form: 'newChannelName',
})

class NewChannelNameForm extends React.Component {
  handleSubmit = async (values) => {
    const {
      renameChannel,
      renameChannelFailure,
      closeModal,
      id,
    } = this.props;

    const channel = { ...values, id };

    try {
      await renameChannel({ channel });
    } catch (err) {
      renameChannelFailure();
      throw new SubmissionError({ _error: err.message });
    }
    closeModal();
  }

  render() {
    const {
      handleSubmit, submitting, pristine, error,
    } = this.props;


    return (
      <Form onSubmit={handleSubmit(this.handleSubmit)}>
        <InputGroup className="mb-3">
          <Field className="form-control" component="input" name="name" disabled={submitting} />
          <InputGroup.Append>
            <Button disabled={pristine || submitting} variant="outline-secondary" type="submit">Submit</Button>
          </InputGroup.Append>
          {error && <div className="ml-3">{error}</div>}
        </InputGroup>
      </Form>
    );
  }
}

export default NewChannelNameForm;
