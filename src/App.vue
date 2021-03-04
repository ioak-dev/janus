<template>
  <div class="theme_light">
    <oak-app-layout topbarVariant="sticky" topbarColor="global" topElevation="4">
      <div slot="topbar" class="topbar">
        <div id="nav">
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
          <router-link to="/business-process">Business Process</router-link>
        </div>
      </div>
      <div slot="content" class="content">
        <router-view />
      </div>
    </oak-app-layout>
  </div>
</template>

<style lang="scss">
@import './oak-styles/index.scss';
@import '../node_modules/@oakui/core-stage/style/index.css';

body {
  margin: 0;
  background-color: var(--color-global-lightmode);
  color: var(--color-global-i);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.topbar {
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 10px;
}

.drawer-left {
  height: 100vh;
}

.content {
  height: 100%;
  padding: 20px;
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
