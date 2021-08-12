<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AuthInit',
  computed: {
    ...mapGetters(['getProfile'])
  },
  created() {
    const accessToken = this.$cookies.get(`janus_${this.getProfile.space}-access_token`);
    const refreshToken = this.$cookies.get(`janus_${this.getProfile.space}-refresh_token`);
    if (accessToken && refreshToken) {
      this.addAuth({ access_token: accessToken, refresh_token: refreshToken });
    }
  },
  methods: {
    ...mapActions(['addAuth'])
  }
};
</script>
