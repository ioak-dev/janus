<script>
import { useRoute, useRouter } from 'vue-router';
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
  setup() {
    const route = useRoute();
    const router = useRouter();
    if (route.query.realm && route.query.access_token && route.query.refresh_token) {
      // const { result, loading, error } = useQuery(session, {
      //   id: route.query.authKey,
      //   space: route.query.space
      // });
      // console.log(result, loading, error);

      setCookie(`janus_${route.query.realm}-access_token`, route.query.access_token);
      setCookie(`janus_${route.query.realm}-refresh_token`, route.query.refresh_token);
      router.push({
        name: 'ListSchemaView',
        params: { space: route.query.realm }
      });
    }
  }
};
</script>
<style scoped lang="scss"></style>
