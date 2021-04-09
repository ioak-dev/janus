import { createStore } from 'vuex';
import profile from './modules/profile';
import schema from './modules/schema';
import table from './modules/table';
import column from './modules/column';
import filter from './modules/filter';
import record from './modules/record';
import space from './modules/space';
import user from './modules/user';
import activity from './modules/activity';
import faicon from './modules/faicon';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: { profile, schema, table, column, filter, record, space, user, activity, faicon }
});
