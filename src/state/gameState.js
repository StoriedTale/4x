import create from 'zustand';

export const useGameState = create((set, get) => ({
  selectedGame: '',
  structures: [],
  resources: {},
  turn: 1,
  setSelectedGame: (game) => set((state) => ({
    selectedGame: game,
    structures: [],
    resources: {},
    turn: 1,
  })),
  initializeResources: (resourcesConfig) => set((state) => {
    const initialResources = {};
    Object.keys(resourcesConfig).forEach((resource) => {
      initialResources[resource] = resourcesConfig[resource].initial || 0;
    });
    return { resources: initialResources };
  }),
  addStructure: (name, cost, contributions) => {
    if (get().canAfford(cost)) {
      set((state) => {
        const newStructures = [...state.structures, { name, contributions }];
        state.payCost(cost);
        return { structures: newStructures };
      });
      return true;
    }
    return false;
  },
  addResource: (resourceType, cost) => {
    if (get().canAfford(cost)) {
      set((state) => {
        state.payCost(cost);
        return {
          resources: {
            ...state.resources,
            [resourceType]: state.resources[resourceType] + 1,
          },
        };
      });
      return true;
    }
    return false;
  },
  canAfford: (cost) => {
    const state = get();
    return Object.keys(cost).every(resource => state.resources[resource] >= cost[resource]);
  },
  payCost: (cost) => set((state) => {
    const newResources = { ...state.resources };
    Object.keys(cost).forEach(resource => {
      newResources[resource] -= cost[resource];
    });
    return { resources: newResources };
  }),
  endTurn: () => set((state) => {
    const newResources = { ...state.resources };
    state.structures.forEach(structure => {
      Object.keys(structure.contributions).forEach(resourceType => {
        if (resourceType !== "cost") {
          newResources[resourceType] += structure.contributions[resourceType];
        }
      });
    });
    return { resources: newResources, turn: state.turn + 1 };
  }),
  setResourceValue: (resourceType, value) => set((state) => {
    const newResources = { ...state.resources };
    newResources[resourceType] = value;
    return { resources: newResources };
  }),
}));