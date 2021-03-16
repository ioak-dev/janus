<template>
  <div class="topbar">
    <div class="topbar__left">
      <logo />
      <nav-elements />
    </div>
    <div>
      <dark-mode-switch />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Logo from '../Logo/Logo.vue';
import DarkModeSwitch from './DarkModeSwitch.vue';
import NavElements from './NavElements.vue';

export default {
  name: 'Topbar',
  components: {
    NavElements,
    Logo,
    DarkModeSwitch
  },
  computed: {
    ...mapGetters(['getProfile'])
  },
  methods: {
    ...mapActions(['removeAuth']),
    logout() {
      this.removeAuth(this.$cookies);
    }
  }
};
</script>

<style lang="scss">
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
}

.topbar__left {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
