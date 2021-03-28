<template>
  <div class="sidebar">
    <Header />
    <user-profile />
    <div class="sidebar__container">
      <!-- <div class="sidebar-section__divider" /> -->
      <schema-nav />
      <!-- <div class="sidebar-section__divider" /> -->
      <schema-nav />
      <static-nav />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Header from './Header.vue';
import UserProfile from './UserProfile.vue';
import SchemaNav from './SchemaNav.vue';
import StaticNav from './StaticNav.vue';

export default {
  name: 'Sidebar',
  components: {
    Header,
    UserProfile,
    SchemaNav,
    StaticNav
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
.sidebar-section__divider {
  // padding: 10px 0;
}
</style>
