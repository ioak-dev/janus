<template>
  <div class="sidebar">
    <Header />
    <user-profile />
    <div class="sidebar__container">
      <!-- <div class="sidebar-section__divider" /> -->
      <primary-nav />
      <schema-nav />
      <!-- <div class="sidebar-section__divider" /> -->
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
import PrimaryNav from './PrimaryNav.vue';

export default {
  name: 'Sidebar',
  components: {
    Header,
    UserProfile,
    SchemaNav,
    StaticNav,
    PrimaryNav
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
