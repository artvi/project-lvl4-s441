import { createAction } from 'redux-actions';
import axios from 'axios';


export const sendMessageRequest = createAction('MESSAGE_SEND_REQUEST');
export const sendMessageSuccess = createAction('MESSAGE_SEND_SUCCESS');
export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');

export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');


export const removeChannelRequest = createAction('CHANNEL_REMOVE_REQUEST');
export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');

export const fetchNewMessage = createAction('MESSAGE_FETCH');
export const fetchNewChannel = createAction('CHANNEL_FETCH_NEW');
export const fetchRemovedChannel = createAction('CHANNEL_FETCH_REMOVED');
export const moveToChannel = createAction('CURRENT_CHANNEL_CHANGE');


export const sendMessage = ({ message }) => async (dispatch) => {
  dispatch(sendMessageRequest());
  const data = { attributes: message };
  const { channelId } = message;
  await axios.post(`api/v1/channels/${message.channelId}/messages`, { data, channelId });
  dispatch(sendMessageSuccess({ message }));
};


export const addChannel = ({ channel }) => async (dispatch) => {
  dispatch(addChannelRequest());
  const data = { attributes: channel };
  await axios.post('api/v1/channels/', { data });
  dispatch(addChannelSuccess({ channel }));
};

export const removeChannel = ({ id }) => async (dispatch) => {
  dispatch(removeChannelRequest());
  const data = { attributes: id };
  await axios.delete(`api/v1/channels/${id}`, { data });
  dispatch(removeChannelSuccess({ id }));
};
