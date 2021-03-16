import { createApp } from 'vue';
import VueCookies from 'vue3-cookies';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import AppRoot from './AppRoot.vue';
import router from './router';
import store from './store';
import '@oakui/core-stage';

library.add(faMoon);
library.add(faSun);

const app = createApp(AppRoot);
app.component('font-awesome-icon', FontAwesomeIcon);

app.config.isCustomElement = (tag: any) => {
  if (tag.startsWith('oak-')) {
    return true;
  }
  return false;
};
app.use(store).use(router).mount('#app');
