<template>
  <div class="theme">
    <div
      class="action-icon"
      v-if="getProfile.theme === 'theme_dark'"
      @click="setTheme('theme_light')"
    >
      <font-awesome-icon :icon="['fas', 'sun']" />
    </div>
    <div class="action-icon" v-else @click="setTheme('theme_dark')">
      <font-awesome-icon :icon="['fas', 'moon']" />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'DarkModeSwitch',
  computed: { ...mapGetters(['getProfile']) },
  methods: {
    ...mapActions(['setTheme'])
  }
};
</script>
<style lang="scss" scoped>
.theme {
  user-select: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 60px;
  line-height: 60px;
  margin: 0px 10px;
  .action-icon {
    cursor: pointer;
  }
}
</style>
