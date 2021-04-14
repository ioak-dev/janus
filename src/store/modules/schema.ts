const state = {
  data: []
};

const getters = {
  getSchema: (state: any) => {
    return state.data;
  },
  getSchemaById: (state: any) => (id: string) => {
    return state.data.find((item: any) => item.id === id);
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
  },
  DELETE_SCHEMA: (state: any, idList: string[]) => {
    state.data = state.data.filter((item: any) => !idList.includes(item.id));
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
