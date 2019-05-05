const rootPath = 'api/v1';

const getUrl = {
  sendMessage: id => [rootPath, 'channels', id, 'messages'].join('/'),
  addChannel: () => [rootPath, 'channels'].join('/'),
  removeChannel: id => [rootPath, 'channels', id].join('/'),
  renameChannel: id => [rootPath, 'channels', id].join('/'),
};

export default getUrl;
