import { createApp, h, provide } from 'vue';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import AppRoot from './AppRoot.vue';
import router from './router';
import store from './store';
import '@oakui/core-stage';
import { defaultClient } from './apollo';

library.add(faMoon);
library.add(faSun);

// Create the default apollo client
// const defaultClient = new ApolloClient({
//   uri: 'http://localhost:4000/graphql',
//   cache: new InMemoryCache()
// });

const app = createApp({
  setup() {
    provide(DefaultApolloClient, defaultClient);
  },
  render() {
    return h(AppRoot);
  }
});
app.component('font-awesome-icon', FontAwesomeIcon);

app.config.isCustomElement = (tag: any) => {
  if (tag.startsWith('oak-')) {
    return true;
  }
  return false;
};
app.use(store).use(router).mount('#app');
