import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import _ from 'lodash';
import * as actions from '../actions';

const messageSendingState = handleActions({
  // [actions.sendMessageRequest]() {
  //   return 'requested';
  // },
  [actions.sendMessageSuccess]() {
    return 'success';
  },
  [actions.sendMessageFailure]() {
    return 'failure';
  },
}, 'none');

const channelAddingState = handleActions({
  [actions.addChannelRequest]() {
    return 'requested';
  },
  [actions.addChannelSuccess]() {
    return 'success';
  },
  [actions.addChannelFailure]() {
    return 'failure';
  },
}, 'none');

const channelRenamingState = handleActions({
  [actions.renameChannelRequest]() {
    return 'requested';
  },
  [actions.renameChannelSuccess]() {
    return 'success';
  },
  [actions.renameChannelFailure]() {
    return 'failure';
  },
}, 'none');

const channelRemovingState = handleActions({
  [actions.removeChannelRequest]() {
    return 'requested';
  },
  [actions.removeChannelSuccess]() {
    return 'success';
  },
  [actions.removeChannelFailure]() {
    return 'failure';
  },
}, 'none');

const channels = handleActions({
  [actions.fetchNewChannel](state, { payload: { channel } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [channel.id]: channel },
      allIds: [...allIds, channel.id],
    };
  },
  [actions.fetchRemovedChannelData](state, { payload: { id } }) {
    const { byId, allIds } = state;
    return {
      byId: _.omit(byId, id),
      allIds: allIds.filter(channelId => channelId !== id),
    };
  },
  [actions.fetchNewChannelName](state, { payload: { id, name } }) {
    const { byId } = state;
    const current = byId[id];
    return {
      ...state,
      byId: { ...byId, [id]: { ...current, name } },
    };
  },
}, { byId: {}, allIds: [] });


const messages = handleActions({
  [actions.fetchNewMessage](state, { payload: { message } }) {
    const { byChannelId } = state;
    const { channelId } = message;
    const messageList = byChannelId[channelId];
    const updatedMessageList = [...messageList, message];
    return {
      byChannelId: { ...byChannelId, [channelId]: updatedMessageList },
    };
  },
  [actions.fetchNewChannel](state, { payload: { channel } }) {
    const { byChannelId } = state;
    const { id } = channel;
    return {
      byChannelId: { ...byChannelId, [id]: [] },
    };
  },
  [actions.fetchRemovedChannelData](state, { payload: { id } }) {
    const { byChannelId } = state;
    return {
      byChannelId: _.omit(byChannelId, id),
    };
  },
}, { byChannelId: [] });


const currentChannelId = handleActions({
  [actions.moveToChannel](state, { payload: { id } }) {
    return id;
  },
  [actions.fetchRemovedChannelData](state, { payload: { id } }) {
    return state === id ? 1 : state;
  },
}, 1);

const modal = handleActions({
  [actions.openModal](state, { payload: { data } }) {
    return { show: true, data };
  },
  [actions.closeModal]() {
    return { show: false, data: {} };
  },
}, { show: false, data: {} });


export default combineReducers({
  channels,
  messages,
  channelAddingState,
  messageSendingState,
  channelRemovingState,
  channelRenamingState,
  currentChannelId,
  modal,
  form: formReducer,
});
