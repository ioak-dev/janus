const state = {
  data: []
};

const getters = {
  getIcon: (state: any) => {
    return state.data;
  }
};

const actions = {
  refreshIcon({ commit }: any, payload: any) {
    commit('REFRESH_ICON', payload);
  }
};

const mutations = {
  REFRESH_ICON: (state: any, payload: any) => {
    state.data = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
