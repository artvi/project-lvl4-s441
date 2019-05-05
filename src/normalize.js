export default ({ channels, messages, currentChannelId }) => {
  const normalizedChannels = channels.reduce((acc, el) => {
    const { byId, allIds } = acc;
    const { id } = el;
    return {
      byId: { ...byId, [id]: el },
      allIds: [...allIds, id],
    };
  },
  {
    byId: {},
    allIds: [],
  });

  const init = {};
  normalizedChannels.allIds.forEach((id) => {
    init[id] = [];
  });

  const normalizedMessages = messages.reduce((acc, el) => {
    const { channelId } = el;
    const results = acc[channelId];
    return {
      ...acc,
      [channelId]: [...results, el],
    };
  }, init);

  return {
    channels: normalizedChannels,
    messages: { byChannelId: normalizedMessages },
    modal: { show: false, data: {} },
    currentChannelId,
  };
};
