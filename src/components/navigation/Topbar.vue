<template>
  <div class="topbar">
    <div class="topbar__left">
      <schema-info />
      <div id="topbar-left" />
    </div>
    <div class="topbar__right">
      <dark-mode-switch />
      <user-account />
      <div id="topbar-right" />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import DarkModeSwitch from './DarkModeSwitch.vue';
import UserAccount from './UserAccount.vue';
import SchemaInfo from './Topbar/SchemaInfo.vue';

export default {
  name: 'Topbar',
  components: {
    DarkModeSwitch,
    UserAccount,
    SchemaInfo
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
