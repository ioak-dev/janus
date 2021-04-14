<template>
  <div class="topbar">
    <div class="topbar__left">
      <bookmark class="desktop-only" />
    </div>
    <div class="topbar__right">
      <global-search class="desktop-only" />
      <dark-mode-switch />
      <div id="topbar-right" />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import DarkModeSwitch from './DarkModeSwitch.vue';
import Bookmark from './Topbar/Bookmark.vue';
import GlobalSearch from './GlobalSearch.vue';

export default {
  name: 'Topbar',
  components: {
    DarkModeSwitch,
    Bookmark,
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
