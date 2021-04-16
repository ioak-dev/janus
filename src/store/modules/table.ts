const state = {
  data: [],
  lookup: {},
  reverseLookup: {}
};

const listToMap = (listInput: any[], reverse = false) => {
  const mapOutput: any = {};
  listInput.forEach((item) => {
    mapOutput[reverse ? item.id : item.reference] = reverse ? item.reference : item.id;
  });
  return mapOutput;
};

const getters = {
  getTable: (state: any): any[] => {
    return state.data;
  },
  getTableLookup: (state: any): any[] => {
    return state.lookup;
  },
  getTableReverseLookup: (state: any): any[] => {
    return state.reverseLookup;
  },
  getTableById: (state: any) => (id: string): any[] => {
    return state.data.find((item: any) => item.id === id);
  },
  getTableByReference: (state: any) => (reference: string): any[] => {
    return state.data.find((item: any) => item.reference === reference);
  },
  tableRefToId: (state: any) => (reference: string): any[] => {
    return state.lookup[reference];
  },
  tableIdToRef: (state: any) => (id: string): any[] => {
    return state.reverseLookup[id];
  },
  getTableBySchema: (state: any) => (schemaId: string) => {
    return state.data.filter((item: any) => item.schemaId === schemaId);
  },
  getTableInCurrentSchema: (state: any, rootState: any) => {
    return state.data.filter(
      (item: any) => rootState.schemaIdToRef(item.schemaId) === rootState.getProfile.schema
    );
  }
};

const actions = {
  refreshTable({ commit }: any, payload: any) {
    commit('REFRESH_TABLE', payload);
  },
  appendTable({ commit }: any, payload: any) {
    commit('APPEND_TABLE', payload);
  },
  deleteTable({ commit }: any, idList: string[]) {
    commit('DELETE_TABLE', idList);
  }
};

const mutations = {
  REFRESH_TABLE: (state: any, payload: any) => {
    state.data = payload;
    state.lookup = listToMap(state.data);
    state.reverseLookup = listToMap(state.data, true);
  },
  APPEND_TABLE: (state: any, payload: any) => {
    const _data = [...state.data];
    let matchingIndex = -1;
    _data.forEach((item, index) => {
      if (item.id === payload.id) {
        matchingIndex = index;
      }
    });
    if (matchingIndex >= 0) {
      _data[matchingIndex] = payload;
    } else {
      _data.push(payload);
    }
    state.data = _data;
    state.lookup = listToMap(state.data);
    state.reverseLookup = listToMap(state.data, true);
  },
  DELETE_TABLE: (state: any, idList: string[]) => {
    state.data = state.data.filter((item: any) => !idList.includes(item.id));
    state.lookup = listToMap(state.data);
    state.reverseLookup = listToMap(state.data, true);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
