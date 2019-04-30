import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import addChannel from '../actions';

const channels = handleActions({
  [addChannel](state, { payload: { channel } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [channel.id]: channel },
      allIds: [channel.id, ...allIds],
    };
  },
}, { byId: {}, allIds: [] });


export default combineReducers({
  channels,
});
