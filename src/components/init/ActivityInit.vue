<script>
import store from '@/store';
import { fetchActivityCommandSubject } from '@/events/FetchActivityCommand';
import { activityQuery } from '@/graphql/activity.query';
import { defaultClient } from '../../apollo';

export default {
  name: 'ActivityInit',
  mounted() {
    fetchActivityCommandSubject.asObservable().subscribe((message) => {
      if (message.tableId) {
        this.fetchActivity('record', message.tableId);
      }
    });
  },
  methods: {
    fetchActivity(domain, parentReference) {
      defaultClient
        .query({
          query: activityQuery,
          variables: {
            domain,
            parentReference
          }
        })
        .then((response) => {
          if (response) {
            // const { pageNo, hasMore, results } = response.data.activity;
            console.log('**', response.data.activity);
            store.dispatch('refreshActivity', response.data.activity);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped></style>
