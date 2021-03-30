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
    if (route.query.space && route.query.authKey) {
      // const { result, loading, error } = useQuery(session, {
      //   id: route.query.authKey,
      //   space: route.query.space
      // });
      // console.log(result, loading, error);

      setCookie(`janus_${route.query.space}`, route.query.authKey);
      router.push({
        name: 'ListSchemaView',
        params: { space: route.query.space }
      });
    }
  }
};
</script>
<style scoped lang="scss"></style>
