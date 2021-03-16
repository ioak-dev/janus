<template>
  <div class="nav-elements">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link :to="`/${getProfile.space}/app`">Apps</router-link>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NavElements',
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
.nav-elements {
  display: flex;
  gap: 12px;
  a {
    transition: background-color ease-in-out 250ms;
    text-decoration: none;
    color: inherit;
    padding: 4px 10px;
    font-size: 14px;
    font-weight: bold;
    // border-radius: var(--global-border-radius);
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
