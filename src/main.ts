import { createApp, h, provide } from 'vue';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
// import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

import AppRoot from './AppRoot.vue';
import router from './router';
import store from './store';
import '@oakui/core-stage';
import { defaultClient } from './apollo';

library.add(fas);
library.add(far);
library.add(fab);

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
