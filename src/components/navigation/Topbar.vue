<template>
  <div class="topbar">
    <div class="topbar__left">
      <schema-info class="desktop-only" />
      <div id="topbar-left" />
    </div>
    <div class="topbar__right">
      <global-search />
      <dark-mode-switch />
      <div id="topbar-right" />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import DarkModeSwitch from './DarkModeSwitch.vue';
import UserAccount from './UserAccount.vue';
import SchemaInfo from './Topbar/SchemaInfo.vue';
import GlobalSearch from './GlobalSearch.vue';

export default {
  name: 'Topbar',
  components: {
    DarkModeSwitch,
    SchemaInfo,
    GlobalSearch
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

.topbar__left,
.topbar__right {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
