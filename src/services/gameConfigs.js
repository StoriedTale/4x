// gameConfigs.js

const games = {
  "4x Game": {
    resources: {
      food: { cost: { gold: 2 }, initial: 10 },
      gold: { cost: { wood: 2, food: 1 }, initial: 50 },
      wood: { cost: {}, initial: 20 }, // No cost to add wood, initial quantity defined
    },
    structures: {
      Farm: { food: 5, gold: 0, wood: 0, cost: { gold: 10, wood: 5 } },
      Mine: { food: 0, gold: 3, wood: 0, cost: { gold: 15, wood: 10 } },
      Barracks: { food: 0, gold: 0, wood: 0, cost: { gold: 20, wood: 15 } },
    },
  },
  "Survival Game": {
    resources: {
      energy: { cost: { health: 2 }, initial: 8 },
      health: { cost: { energy: 1 }, initial: 12 },
      stamina: { cost: { energy: 3 }, initial: 15 },
    },
    structures: {
      Shelter: { energy: 2, health: 1, stamina: 0, cost: { health: 5, stamina: 3 } },
      Well: { energy: 0, health: 0, stamina: 5, cost: { health: 3, stamina: 5 } },
      Clinic: { energy: 0, health: 5, stamina: 0, cost: { health: 10, stamina: 8 } },
    },
  },
};

export default games;