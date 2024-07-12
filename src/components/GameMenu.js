import React from 'react';
import { useGameState } from '../state/gameState';
import games from '../services/gameConfigs'; // Import games

const GameMenu = () => {
  const { selectedGame, setSelectedGame } = useGameState();

  return (
    <div className="game-menu">
      <label>Select Game: </label>
      <select
        value={selectedGame}
        onChange={(e) => setSelectedGame(e.target.value)}
      >
        <option value="" disabled>Select Game</option>
        {Object.keys(games).map((gameName) => (
          <option key={gameName} value={gameName}>
            {gameName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GameMenu;