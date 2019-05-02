import { createAction } from 'redux-actions';
import axios from 'axios';


export const addChannel = createAction('NEW_CHANNEL_ADD');

export const sendMessageRequest = createAction('MESSAGE_SEND_REQUEST');
export const sendMessageSuccess = createAction('MESSAGE_SEND_SUCCESS');
export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');

// export const fetchMessagesRequest = createAction('MESSAGES_FETCH_REQUEST');
// export const fetchMessagesSuccess = createAction('MESSAGES_FETCH_SUCCESS');
// export const fetchMessagesFailure = createAction('MESSAGES_FETCH_FAILURE');

export const sendMessage = ({ message }) => async (dispatch) => {
  dispatch(sendMessageRequest());
  const data = { attributes: message };
  const { channelId } = message;
  await axios.post(`api/v1/channels/${message.channelId}/messages`, { data, channelId });
  dispatch(sendMessageSuccess({ message }));
};

export const fetchMessage = createAction('MESSAGE_FETCH');

export const moveToChannel = createAction('CURRENT_CHANNEL_CHANGE');
