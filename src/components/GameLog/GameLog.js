import React from 'react';
import PropTypes from 'prop-types';
import './GameLog.css';

const GameLog = ({ log }) => {
  return (
    <div className="game-log">
      {log.map((entry, index) => (
        <div key={index} className="log-entry">
          <span className="timestamp">{entry.timestamp}</span>
          <span className="message">{entry.message}</span>
        </div>
      ))}
    </div>
  );
};

GameLog.propTypes = {
  log: PropTypes.arrayOf(PropTypes.shape({
    timestamp: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  })).isRequired,
};

export default GameLog;