import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@oakui/core-stage';

const app = createApp(App);
app.config.isCustomElement = (tag: any) => {
  if (tag.startsWith('oak-')) {
    return true;
  }
  return false;
};
app.use(store).use(router).mount('#app');
