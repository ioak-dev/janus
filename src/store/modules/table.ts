const state = {
  data: []
};

const getters = {
  getTable: (state: any): any[] => {
    return state.data;
  },
  getTableById: (state: any) => (id: string): any[] => {
    return state.data.find((item: any) => item.id === id);
  },
  getTableBySchema: (state: any) => (schemaId: string) => {
    return state.data.filter((item: any) => item.schemaId === schemaId);
  },
  getTableInCurrentSchema: (state: any, rootState: any) => {
    return state.data.filter((item: any) => item.schemaId === rootState.getProfile.schema);
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
  },
  DELETE_TABLE: (state: any, idList: string[]) => {
    state.data = state.data.filter((item: any) => !idList.includes(item.id));
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
