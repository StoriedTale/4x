import React, { useEffect, useState } from 'react';
import { useGameState } from './state/gameState';
import ResourcePanel from './components/ResourcePanel/ResourcePanel';
import GameMenu from './components/GameMenu';
import GameLog from './components/GameLog/GameLog';
import getGameConfig from './services/gameConfigService';
import './App.css'; // Import CSS if needed

const App = () => {
  const {
    selectedGame,
    structures,
    resources,
    turn,
    setSelectedGame,
    addStructure,
    addResource,
    endTurn,
    initializeResources,
    setResourceValue,
  } = useGameState();

  const [log, setLog] = useState([]);
  const [editingResource, setEditingResource] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  useEffect(() => {
    if (selectedGame) {
      const gameConfig = getGameConfig(selectedGame);
      initializeResources(gameConfig.resources);
      addLog(`Game "${selectedGame}" selected.`);
    }
  }, [selectedGame, initializeResources]);

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLog([{ timestamp, message }, ...log]);
  };

  const handleAddStructure = (name) => {
    const gameConfig = getGameConfig(selectedGame);
    const cost = gameConfig.structures[name].cost;
    if (addStructure(name, cost, gameConfig.structures[name])) {
      addLog(`Added ${name}`);
    } else {
      addLog(`Cannot afford to add ${name}`);
    }
  };

  const handleAddResource = (resourceType) => {
    const gameConfig = getGameConfig(selectedGame);
    const cost = gameConfig.resources[resourceType].cost;
    if (addResource(resourceType, cost)) {
      addLog(`Added ${resourceType}`);
    } else {
      addLog(`Cannot afford to add ${resourceType}`);
    }
  };

  const handleEndTurn = () => {
    endTurn();
    addLog(`End of turn ${turn}`);
  };

  const handleDoubleClick = (resourceType) => {
    setEditingResource(resourceType);
    setEditingValue(resources[resourceType]);
  };

  const handleInputChange = (e) => {
    setEditingValue(e.target.value);
  };

  const handleBlur = () => {
    if (editingResource !== null) {
      const oldValue = resources[editingResource];
      const newValue = parseInt(editingValue, 10);
      setResourceValue(editingResource, newValue);
      addLog(`Resource ${editingResource.charAt(0).toUpperCase() + editingResource.slice(1)} manually changed from ${oldValue} to ${newValue}`);
      setEditingResource(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  const gameConfig = selectedGame ? getGameConfig(selectedGame) : null;

  return (
    <div>
      <h1>{selectedGame || "Select a Game"}</h1>
      <GameMenu />
      <GameLog log={log} />
      {selectedGame && (
        <>
          <div className="resource-container">
            {Object.keys(resources).map(resourceType => (
              <div className="resource-item" key={resourceType} onDoubleClick={() => handleDoubleClick(resourceType)}>
                {editingResource === resourceType ? (
                  <input
                    type="number"
                    value={editingValue}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    onKeyPress={handleKeyPress}
                    autoFocus
                  />
                ) : (
                  <span>{resourceType.charAt(0).toUpperCase() + resourceType.slice(1)}: {resources[resourceType]}</span>
                )}
              </div>
            ))}
            <div className="resource-item">
              Turn: {turn}
            </div>
          </div>
          <div className="button-container">
            {Object.keys(gameConfig.structures).map((structure) => (
              <button key={structure} onClick={() => handleAddStructure(structure)}>
                <div>Add {structure}</div>
                <div className="structure-details">
                  <div className="structure-benefits">
                    <strong>Benefits:</strong>
                    {Object.entries(gameConfig.structures[structure]).map(([benefit, amount]) => (
                      benefit !== 'cost' && amount !== 0 && <div key={benefit}>{benefit}: {amount}</div>
                    ))}
                  </div>
                  <div className="structure-costs">
                    <strong>Costs:</strong>
                    {Object.entries(gameConfig.structures[structure].cost).map(([resource, amount]) => (
                      <div key={resource}>{resource}: {amount}</div>
                    ))}
                  </div>
                </div>
              </button>
            ))}
            {Object.keys(gameConfig.resources).map((resource) => (
              <button key={resource} onClick={() => handleAddResource(resource)}>
                Add {resource.charAt(0).toUpperCase() + resource.slice(1)}
              </button>
            ))}
            <button onClick={handleEndTurn}>End Turn</button>
          </div>
          <ResourcePanel structures={structures} />
        </>
      )}
    </div>
  );
};

export default App;