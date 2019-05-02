import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const channels = handleActions({
  [actions.addChannel](state, { payload: { channel } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [channel.id]: channel },
      allIds: [channel.id, ...allIds],
    };
  },
}, { byId: {}, allIds: [] });

const messages = handleActions({
  [actions.sendMessageSuccess](state, { payload: { message } }) {
    const { byChannelId } = state;
    const { channelId } = message;
    const messageList = byChannelId[channelId];
    const updatedMessageList = [...messageList, message];
    return {
      byChannelId: { ...byChannelId, [channelId]: updatedMessageList },
    };
  },
  [actions.fetchMessage](state, { payload: { message } }) {
    const { byChannelId } = state;
    const { channelId } = message;
    const messageList = byChannelId[channelId];
    const updatedMessageList = [...messageList, message];
    return {
      byChannelId: { ...byChannelId, [channelId]: updatedMessageList },
    };
  },
}, { byId: {}, allIds: [] });

const messageSendingState = handleActions({
  [actions.sendMessageRequest]() {
    return 'requested';
  },
  [actions.sendMessageSuccess]() {
    return 'success';
  },
  [actions.sendMessageFailure]() {
    return 'failure';
  },
}, 'none');

const currentChannelId = handleActions({
  [actions.moveToChannel](state, { payload: id }) {
    return id;
  },
}, 1);

export default combineReducers({
  channels,
  messages,
  messageSendingState,
  currentChannelId,
  form: formReducer,
});
