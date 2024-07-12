// components/ResourcePanel/ResourcePanel.js

import React from 'react';
import PropTypes from 'prop-types';
import './ResourcePanel.css'; // Import the CSS file

const ResourcePanel = ({ structures }) => {
  const calculateGrid = (items) => {
    const N = items.length;
    const c = Math.ceil(Math.sqrt(N));
    const r = Math.ceil(N / c);

    let grid = [];
    for (let i = 0; i < r; i++) {
      grid.push(items.slice(i * c, (i + 1) * c));
    }

    return grid;
  };

  const grid = calculateGrid(structures.map(structure => structure.name));

  return (
    <div className="resource-panel">
      <h2>Resources</h2>
      {/* Other resource display elements */}
      <h2>Display</h2>
      <div className="grid-container">
        {grid.map((row, rowIndex) => (
          <div className="grid-row" key={rowIndex}>
            {row.map((item, colIndex) => (
              <div className="grid-item" key={colIndex}>
                {item}
              </div>
            ))}
            {/* Add empty boxes if necessary to fill the row */}
            {Array(grid[0].length - row.length).fill(null).map((_, emptyIndex) => (
              <div className="grid-item empty" key={`empty-${emptyIndex}`}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

ResourcePanel.propTypes = {
  structures: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default ResourcePanel;