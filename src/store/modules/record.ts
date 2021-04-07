import { uniqBy } from 'lodash';

const state = {
  data: [],
  parameter: {
    tableId: '',
    pageNo: 0,
    pageSize: 15,
    filter: null,
    hasMore: true
  },
  secondaryData: [],
  secondaryParameter: {
    tableId: '',
    pageNo: 0,
    pageSize: 15,
    filter: null,
    hasMore: true
  }
};

const getters = {
  getRecord: (state: any) => (secondary = false) => {
    console.log('0000000000000000000000000000000000000', secondary);
    return secondary ? state.secondaryData : state.data;
  },
  getRecordParameter: (state: any) => (secondary = false) => {
    return secondary ? state.secondaryParameter : state.parameter;
  }
};

const actions = {
  refreshRecordParameter({ commit }: any, { payload, secondary }: any) {
    if (secondary) {
      commit('REFRESH_SECONDARY_RECORD_PARAMETER', payload);
    } else {
      commit('REFRESH_RECORD_PARAMETER', payload);
    }
  },
  refreshRecord({ commit }: any, { payload, secondary }: any) {
    console.log('0000000000000 record.ts', secondary);
    if (secondary) {
      commit('REFRESH_SECONDARY_RECORD', payload);
    } else {
      commit('REFRESH_RECORD', payload);
    }
  },
  appendRecord({ commit }: any, { payload, secondary }: any) {
    if (secondary) {
      commit('APPEND_SECONDARY_RECORD', payload);
    } else {
      commit('APPEND_RECORD', payload);
    }
  },
  editRecord({ commit }: any, payload: any) {
    commit('EDIT_RECORD', payload);
  },
  deleteRecord({ commit }: any, idList: string[]) {
    commit('DELETE_RECORD', idList);
  }
};

const mutations = {
  REFRESH_RECORD: (state: any, payload: any) => {
    state.data = payload;
  },
  REFRESH_RECORD_PARAMETER: (state: any, payload: any) => {
    state.parameter = { ...state.parameter, ...payload };
  },
  REFRESH_SECONDARY_RECORD: (state: any, payload: any) => {
    state.secondaryData = payload;
  },
  REFRESH_SECONDARY_RECORD_PARAMETER: (state: any, payload: any) => {
    state.secondaryParameter = { ...state.secondaryParameter, ...payload };
  },
  APPEND_RECORD: (state: any, payload: any) => {
    state.data = uniqBy([...state.data, ...payload], 'id');
  },
  APPEND_SECONDARY_RECORD: (state: any, payload: any) => {
    state.secondaryData = uniqBy([...state.data, ...payload], 'id');
  },
  EDIT_RECORD: (state: any, payload: any) => {
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
  DELETE_RECORD: (state: any, idList: string[]) => {
    state.data = state.data.filter((item: any) => !idList.includes(item.id));
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
