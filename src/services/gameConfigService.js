// services/gameConfigService.js

import games from './gameConfigs';

const getGameConfig = (gameName) => {
  return games[gameName];
};

export default getGameConfig;