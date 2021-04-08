<script>
import { mapGetters, useStore } from 'vuex';
import { computed } from 'vue';
import store from '@/store';
import { isEqual } from 'lodash';
import { recordParameterChangedSubject } from '@/events/RecordParameterChangedEvent';
import { loadMoreRecordCommandSubject } from '@/events/LoadMoreRecordCommand';
import { searchSchemaTableDataQuery } from '@/graphql/searchSchemaTableData.query';
import { defaultClient } from '../../apollo';

export default {
  name: 'RecordInit',
  mounted() {
    recordParameterChangedSubject.asObservable().subscribe((message) => {
      if (message.secondary) {
        const parameterChanged =
          message.tableId &&
          (this.secondaryRecordParameter.tableId !== message.tableId ||
            !isEqual(this.secondaryRecordParameter.filter, message.filter));
        if (parameterChanged) {
          this.fetchRecords(message.tableId, message.filter, true);
        }
      } else {
        const parameterChanged =
          message.tableId &&
          (this.recordParameter.tableId !== message.tableId ||
            !isEqual(this.recordParameter.filter, message.filter));
        if (parameterChanged) {
          this.fetchRecords(message.tableId, message.filter);
        }
      }
    });
    loadMoreRecordCommandSubject.asObservable().subscribe((message) => {
      console.log(message, this.secondaryRecordParameter);
      if (
        message.secondary &&
        this.secondaryRecordParameter.tableId &&
        this.secondaryRecordParameter.hasMore
      ) {
        this.loadMore(message.secondary);
      } else if (
        !message.secondary &&
        this.recordParameter.tableId &&
        this.recordParameter.hasMore
      ) {
        this.loadMore(message.secondary);
      }
    });
  },
  setup() {
    const storeVuex = useStore();
    const recordParameter = computed(() => storeVuex.getters.getRecordParameter(false));
    const secondaryRecordParameter = computed(() => storeVuex.getters.getRecordParameter(true));
    return { recordParameter, secondaryRecordParameter };
  },
  methods: {
    fetchRecords(tableId, filter, secondary = false) {
      defaultClient
        .query({
          query: searchSchemaTableDataQuery,
          variables: {
            tableId,
            anonymousFilter: filter,
            pageSize: this.recordParameter.pageSize,
            pageNo: 0
          }
        })
        .then((response) => {
          if (response) {
            const { pageNo, hasMore, results } = response.data.searchSchemaTableData;
            store.dispatch('refreshRecordParameter', {
              secondary,
              payload: { pageNo, hasMore, filter, tableId }
            });
            store.dispatch('refreshRecord', { secondary, payload: results });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadMore(secondary = false) {
      const param = secondary ? this.secondaryRecordParameter : this.recordParameter;

      console.log(param, secondary);

      if (!param.hasMore) {
        return;
      }
      defaultClient
        .query({
          query: searchSchemaTableDataQuery,
          variables: {
            tableId: param.tableId,
            anonymousFilter: param.filter,
            pageSize: param.pageSize,
            pageNo: param.pageNo
          }
        })
        .then((response) => {
          if (response) {
            console.log(Response);
            const { pageNo, hasMore, results } = response.data.searchSchemaTableData;
            store.dispatch('refreshRecordParameter', {
              secondary,
              payload: { pageNo, hasMore }
            });
            store.dispatch('appendRecord', { secondary, payload: results });
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
