<script>
import { mapGetters, mapActions } from 'vuex';
import { getCookie, setCookie } from '../../router/library';

export default {
  name: 'Login',
  computed: {
    ...mapGetters(['getProfile'])
  },
  methods: {
    ...mapActions(['setSpace'])
  },
  created() {
    if (this.$route.query.space && this.$route.query.authKey) {
      console.log(this.$route.query);
      this.setSpace(this.$route.query.space);

      // this.$cookies.set(`janus_${this.$route.query.space}`, this.$route.query.authKey);
      setCookie(`janus_${this.$route.query.space}`, this.$route.query.authKey);
      this.$router.push({
        name: 'CreateAppView',
        params: { space: this.$route.query.space }
      });
    }
  }
};
</script>
<style scoped lang="scss"></style>
