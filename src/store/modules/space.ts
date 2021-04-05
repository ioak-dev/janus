const state = {
  data: []
};

const getters = {
  getSpace: (state: any) => {
    return state.data;
  }
};

const actions = {
  refreshSpace({ commit }: any, payload: any) {
    commit('REFRESH_SPACE', payload);
  }
};

const mutations = {
  REFRESH_SPACE: (state: any, payload: any) => {
    state.data = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
