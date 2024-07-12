// gameConfigs.js

const games = {
    "4x Game": {
      resources: {
        food: { cost: { gold: 2 } },
        gold: { cost: { wood: 2, food: 1 } },
        wood: { cost: {} }, // No cost to add wood
      },
      structures: {
        Farm: { food: 5, gold: 0, wood: 0, cost: { gold: 10, wood: 5 } },
        Mine: { food: 0, gold: 3, wood: 0, cost: { gold: 15, wood: 10 } },
        Barracks: { food: 0, gold: 0, wood: 0, cost: { gold: 20, wood: 15 } },
        // Add other structures as needed
      },
    },
    "Survival Game": {
      resources: {
        energy: { cost: { health: 2 } },
        health: { cost: { energy: 1 } },
        stamina: { cost: { energy: 3 } },
        // Add other resources as needed
      },
      structures: {
        Shelter: { energy: 2, health: 1, stamina: 0, cost: { health: 5, stamina: 3 } },
        Well: { energy: 0, health: 0, stamina: 5, cost: { health: 3, stamina: 5 } },
        Clinic: { energy: 0, health: 5, stamina: 0, cost: { health: 10, stamina: 8 } },
        // Add other structures as needed
      },
    },
    // Add more games as needed
  };
  
  export default games;  