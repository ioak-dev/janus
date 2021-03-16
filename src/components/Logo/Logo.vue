<template>
  <img
    v-if="getProfile.theme === 'theme_dark'"
    class="logo"
    src="../../assets/janus_white.svg"
    alt="Janus logo"
  />
  <img v-else class="logo" src="../../assets/janus_black.svg" alt="Janus logo" />
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Logo',
  computed: {
    ...mapGetters(['getProfile'])
  }
};
</script>
<style lang="scss" scoped>
img {
  &.logo {
    height: 24px;
    width: auto;
  }
}
</style>
