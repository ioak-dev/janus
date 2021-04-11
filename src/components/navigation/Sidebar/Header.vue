<template>
  <div class="sidebar-header">
    <logo />
  </div>
</template>
<script>
import Logo from '../../Logo/Logo.vue';

export default {
  name: 'SidebarHeader',
  components: {
    Logo
  }
};
</script>

<style lang="scss">
.sidebar-header {
  height: var(--oak-app-layout-topbar-height);
  display: flex;
  justify-content: center;
  align-items: center;
  // margin: 0 10px;
}
</style>
