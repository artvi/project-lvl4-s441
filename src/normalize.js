import _ from 'lodash';

export default ({ channels, messages, currentChannelId }) => {
  const normalizedChannels = {
    byId: _.keyBy(channels, 'id'),
    allIds: channels.reduce((acc, el) => [...acc, el.id], []),
  };

  const { allIds } = normalizedChannels;
  const byChannelIdColl = allIds.reduce((acc, el) => ({ ...acc, [el]: [] }), {});
  const messagesByChannelId = _.groupBy(messages, 'channelId');

  return {
    channels: normalizedChannels,
    messages: { byChannelId: { ...byChannelIdColl, ...messagesByChannelId } },
    modal: { show: false, data: {} },
    currentChannelId,
  };
};
