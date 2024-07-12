// App.js
import React, { useState, useEffect } from 'react';
import ResourcePanel from './components/ResourcePanel';
import games from './gameConfigs';
import './App.css'; // Import CSS if needed

const App = () => {
  const [selectedGame, setSelectedGame] = useState("");
  const [structures, setStructures] = useState([]);
  const [resources, setResources] = useState({});
  const [turn, setTurn] = useState(1);

  const gameConfig = games[selectedGame];

  const initializeResources = () => {
    const initialResources = {};
    Object.keys(gameConfig.resources).forEach(resource => {
      initialResources[resource] = 0;
    });
    setResources(initialResources);
  };

  const canAfford = (cost) => {
    return Object.keys(cost).every(resource => resources[resource] >= cost[resource]);
  };

  const payCost = (cost) => {
    const newResources = { ...resources };
    Object.keys(cost).forEach(resource => {
      newResources[resource] -= cost[resource];
    });
    setResources(newResources);
  };

  const addStructure = (name) => {
    const cost = gameConfig.structures[name].cost;
    if (canAfford(cost)) {
      payCost(cost);
      setStructures([...structures, { name }]);
    } else {
      alert(`Cannot afford to add ${name}`);
    }
  };

  const addResource = (resourceType) => {
    const cost = gameConfig.resources[resourceType].cost;
    if (canAfford(cost)) {
      payCost(cost);
      setResources({
        ...resources,
        [resourceType]: resources[resourceType] + 1,
      });
    } else {
      alert(`Cannot afford to add ${resourceType}`);
    }
  };

  const endTurn = () => {
    setTurn(turn + 1);

    let newResources = { ...resources };

    structures.forEach(structure => {
      const contributions = gameConfig.structures[structure.name];
      Object.keys(contributions).forEach(resourceType => {
        if (resourceType !== "cost") {
          newResources[resourceType] += contributions[resourceType];
        }
      });
    });

    setResources(newResources);
  };

  useEffect(() => {
    if (selectedGame) {
      initializeResources();
    }
  }, [selectedGame]);

  return (
    <div>
      <h1>{selectedGame || "Select a Game"}</h1>
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
      {selectedGame && (
        <>
          <div className="button-container">
            {Object.keys(gameConfig.structures).map((structure) => (
              <button key={structure} onClick={() => addStructure(structure)}>
                Add {structure}
              </button>
            ))}
            {Object.keys(gameConfig.resources).map((resource) => (
              <button key={resource} onClick={() => addResource(resource)}>
                Add {resource.charAt(0).toUpperCase() + resource.slice(1)}
              </button>
            ))}
            <button onClick={endTurn}>End Turn</button>
          </div>
          <div>
            {Object.keys(resources).map(resourceType => (
              <h2 key={resourceType}>{resourceType.charAt(0).toUpperCase() + resourceType.slice(1)}: {resources[resourceType]}</h2>
            ))}
            <h2>Turn: {turn}</h2>
          </div>
          <ResourcePanel structures={structures} />
        </>
      )}
    </div>
  );
};

export default App;