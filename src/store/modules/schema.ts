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
  getSchema: (state: any) => {
    return state.data;
  },
  getSchemaLookup: (state: any): any[] => {
    return state.lookup;
  },
  getSchemaReverseLookup: (state: any): any[] => {
    return state.reverseLookup;
  },
  getSchemaById: (state: any) => (id: string) => {
    return state.data.find((item: any) => item.id === id);
  },
  getSchemaByReference:
    (state: any) =>
    (reference: string): any[] => {
      return state.data.find((item: any) => item.reference === reference);
    },
  schemaRefToId:
    (state: any) =>
    (reference: string): any[] => {
      return state.lookup[reference];
    },
  schemaIdToRef:
    (state: any) =>
    (id: string): any[] => {
      return state.reverseLookup[id];
    }
};

const actions = {
  refreshSchema({ commit }: any, payload: any) {
    commit('REFRESH_SCHEMA', payload);
  },
  appendSchema({ commit }: any, payload: any) {
    commit('APPEND_SCHEMA', payload);
  },
  deleteSchema({ commit }: any, idList: string[]) {
    commit('DELETE_SCHEMA', idList);
  }
};

const mutations = {
  REFRESH_SCHEMA: (state: any, payload: any) => {
    state.data = payload;
    state.lookup = listToMap(state.data);
    state.reverseLookup = listToMap(state.data, true);
  },
  APPEND_SCHEMA: (state: any, payload: any) => {
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
  DELETE_SCHEMA: (state: any, idList: string[]) => {
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
