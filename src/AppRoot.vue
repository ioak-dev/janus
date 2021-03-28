<template>
  <div :class="getProfile.theme">
    <init />
    <oak-app-layout
      topbarVariant="sticky"
      topbarColor="surface"
      topbarElevation="0"
      sidebarElevation="0"
      sidebarColor="container"
    >
      <div slot="topbar" class="topbar-container">
        <topbar />
      </div>
      <div slot="main" class="content-container">
        <router-view :key="$route.fullPath" />
      </div>
      <div slot="sidebar" class="sidebar-container">
        <sidebar />
      </div>
    </oak-app-layout>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Sidebar from '@/components/navigation/Sidebar/index.vue';
import Topbar from '@/components/navigation/Topbar.vue';
import Init from '@/components/Init/index.vue';

export default {
  name: 'AppRoot',
  components: {
    Topbar,
    Sidebar,
    Init
  },
  computed: {
    ...mapGetters(['getProfile'])
  }
};
</script>

<style lang="scss">
@import './oak-styles/index.scss';
@import '../node_modules/@oakui/core-stage/style/index.css';
@import './styles/index.scss';

body {
  margin: 0;
  background-color: var(--color-global-lightmode);
  color: var(--color-global-i);
}

* {
  text-align: left;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.topbar-container {
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 10px;
}

.content-container {
  height: 100%;
  // padding: 20px;
}

#nav {
  display: flex;
  gap: 20px;
  a {
    transition: background-color ease-in-out 250ms;
    text-decoration: none;
    color: inherit;
    padding: 6px 10px;
    font-size: 14px;
    font-weight: bold;
    border-radius: var(--global-border-radius);
    border: none;
    &:hover {
      background-color: var(--color-info-lighter);
    }
    &.router-link-exact-active {
      background-color: var(--color-info-light);
    }
  }
}
</style>
