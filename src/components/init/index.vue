<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Init',
  computed: {
    ...mapGetters(['getProfile']),
    getTheme() {
      return this.getProfile.theme;
    }
  },
  created() {
    if (this.getProfile.theme === 'theme_light') {
      document.body.style.backgroundColor = 'var(--color-global-lightmode)';
    } else {
      document.body.style.backgroundColor = 'var(--color-global-darkmode)';
    }
  },
  watch: {
    getTheme() {
      if (this.getProfile.theme === 'theme_light') {
        document.body.style.backgroundColor = 'var(--color-global-lightmode)';
      } else {
        document.body.style.backgroundColor = 'var(--color-global-darkmode)';
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
