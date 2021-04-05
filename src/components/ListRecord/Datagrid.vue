<template>
  <div class="datagrid" v-if="!loading" id="datagrid-reference">
    <oak-table navPlacement="none" fill="global" elevation="0" :dense="dense">
      <oak-infinite-scroll
        variant="custom-selector"
        customSelector="#datagrid-table-reference"
        @infinite-scroll-change="loadMore"
      >
        <div :class="tableStyle" class="datagrid__table" id="datagrid-table-reference">
          <table>
            <thead>
              <tr
                tabindex="0"
                @click="toggleQuickFilter"
                @keyup="headerKeyup"
                id="datagrid-table-header-reference"
              >
                <th className="checkbox">
                  <oak-checkbox
                    v-if="multiselect"
                    :value="isSelectAll"
                    name="all"
                    @input-change="handleSelectAll"
                    color="secondary"
                  ></oak-checkbox>
                </th>
                <th>Reference</th>
                <th v-for="item in columns" :key="item.id">
                  {{ item.name }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="datagrid__table__filter"
                :class="`${isShowQuickFilter ? 'datagrid__table__filter--active' : ''}`"
              >
                <td />
                <td />
                <td v-for="column in columns" :key="column.id">
                  <div>
                    <datatype-form
                      :value="quickFilter[column.id]"
                      :cellHeader="column"
                      @change="handleQuickFilterValueChange"
                    />
                  </div>
                </td>
              </tr>
              <tr
                v-for="item in records"
                :key="item.id"
                :class="selectedRecords.includes(item.id) ? 'active' : ''"
              >
                <td className="checkbox">
                  <oak-radio
                    v-if="!multiselect"
                    :value="selectedRecords.includes(item.id)"
                    :name="item.id"
                    color="secondary"
                    @input-change="recordSelectedEvent"
                  ></oak-radio>
                  <oak-checkbox
                    v-else
                    :value="selectedRecords.includes(item.id)"
                    :name="item.id"
                    @input-change="toggleRecordSelectionEvent"
                    color="secondary"
                  ></oak-checkbox>
                </td>
                <td>
                  <oak-link @link-click="goToView(item)" color="primary"
                    ><oak-typography variant="body2">Link-125</oak-typography></oak-link
                  >
                </td>
                <!-- <td @click="goToEdit(item)" v-for="column in columns" :key="column.id"> -->
                <td @click="handleRecordClick(item)" v-for="column in columns" :key="column.id">
                  <datatype-table-view :rowData="item" :cellHeader="column" :wrap="wrap" />
                </td>
              </tr>
              <tr v-if="data?.length === 0">
                No data present
              </tr>
            </tbody>
          </table>
        </div>
      </oak-infinite-scroll>
    </oak-table>
  </div>
</template>

<script>
import { defaultClient } from '@/apollo';
import store from '@/store';
import { searchSchemaTableDataQuery } from '@/graphql/searchSchemaTableData.query';
import { compose } from '@oakui/core-stage/style-composer/OakTableComposer';
import { computed, defineComponent, reactive, ref } from 'vue';
import { mapGetters, useStore } from 'vuex';
import DatatypeForm from './DatatypeForm.vue';
import DatatypeTableView from './DatatypeTableView/index.vue';

export default defineComponent({
  name: 'DataGrid',
  props: {
    id: String,
    selectedRecords: Array,
    dense: Boolean,
    multiselect: Boolean,
    wrap: Boolean,
    filter: Object,
    isSelectAll: Boolean
  },
  components: { DatatypeTableView, DatatypeForm },
  computed: {
    ...mapGetters(['getProfile', 'getColumnByTable']),
    columns() {
      return this.getColumnByTable(this.id);
    },
    tableStyle() {
      return compose({ variant: 'outlined', fill: 'global', dense: this.dense });
    }
  },
  mounted() {
    this.updateScrollHeight();
    this.fetchRecords();
  },
  methods: {
    updateScrollHeight() {
      const el = document.getElementById('datagrid-reference');
      const tableEl = document.getElementById('datagrid-table-reference');
      const actionBarEl = document.getElementById('action-bar-reference');
      if (tableEl) {
        tableEl.style.height = `${window.innerHeight - 42 - 20 - 20}px`;
      } else {
        setTimeout(() => {
          this.updateScrollHeight();
        }, 250);
      }
    },
    goToView(record) {
      this.$router.push(
        `/${this.getProfile.space}/schema/${this.getProfile.schema}/table/${record.tableId}/record/${record.id}`
      );
    },
    headerKeyup(event) {
      console.log(event);
      console.log(event.srcElement.id);
    },
    toggleQuickFilter(event) {
      console.log(event);
      // this.isShowQuickFilter = !this.isShowQuickFilter;
    },
    handleQuickFilterValueChange(event) {
      console.log(event);
    },
    toggleRecordSelectionEvent(event) {
      const record = this.records.find((item) => item.id === event.detail.name);
      this.$emit(
        'record-toggled',
        record,
        !this.selectedRecords?.includes(record.id) ? 'active' : ''
      );
    },
    recordSelectedEvent(event) {
      const record = this.records.find((item) => item.id === event.detail.name);
      this.$emit('record-selected', record);
    },
    handleSelectAll(event) {
      if (event.detail.value) {
        this.$emit('select-all', this.records);
      } else {
        this.$emit('select-none');
      }
    },
    handleRecordClick(record) {
      if (this.multiselect) {
        this.$emit(
          'record-toggled',
          record,
          !this.selectedRecords?.includes(record.id) ? 'active' : ''
        );
      } else {
        this.$emit('record-selected', record);
      }
    },
    fetchRecords() {
      this.pageNo = 0;
      defaultClient
        .query({
          query: searchSchemaTableDataQuery,
          variables: {
            tableId: this.id,
            anonymousFilter: this.filter,
            pageSize: 14,
            pageNo: this.pageNo
          }
        })
        .then((response) => {
          if (response) {
            console.log(response.data.searchSchemaTableData);
            this.pageNo = response.data.searchSchemaTableData.pageNo;
            this.hasMore = response.data.searchSchemaTableData.hasMore;
            store.dispatch('refreshRecord', response.data.searchSchemaTableData.results);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadMore() {
      if (!this.hasMore) {
        return;
      }
      defaultClient
        .query({
          query: searchSchemaTableDataQuery,
          variables: {
            tableId: this.id,
            anonymousFilter: this.filter,
            pageSize: 14,
            pageNo: this.pageNo
          }
        })
        .then((response) => {
          if (response) {
            console.log(response.data.searchSchemaTableData);
            this.pageNo = response.data.searchSchemaTableData.pageNo;
            this.hasMore = response.data.searchSchemaTableData.hasMore;
            store.dispatch('appendRecord', response.data.searchSchemaTableData.results);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  setup() {
    const pageNo = ref(0);
    const hasMore = ref(true);
    const records = computed(() => store.getters.getRecord);
    const isShowQuickFilter = ref(false);
    const quickFilter = reactive({});
    return {
      pageNo,
      hasMore,
      records,
      isShowQuickFilter,
      quickFilter
    };
  },
  watch: {
    filter(newVal, _) {
      this.fetchRecords();
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
table {
  thead tr th {
    background-color: var(--color-global);
    color: var(--color-default-lighter);
    cursor: default;
    height: 26px;
    z-index: 1;
  }
  tbody tr td {
    cursor: default;
  }
  tbody tr {
    border-top: 1px solid var(--color-info-lighter);
  }
  tbody tr.active,
  tbody tr.active:hover td {
    background-color: var(--color-primary-transparent);
  }
  tbody tr td.checkbox {
    min-width: 0px;
  }
  // tbody {
  //   display: block;
  //   height: 100px;
  //   overflow-y: auto;
  // }
  // tr {
  //   display: table;
  //   width: 100%;
  //   table-layout: fixed;
  // }
}
.datagrid__table {
  overflow: auto;
}
table {
  border-collapse: collapse;
}
thead tr th {
  position: sticky;
  top: 0;
}
// table thead tr th {
//   background-color: var(--color-primary);
//   color: var(--color-primary-i);
// }
table thead tr:focus {
  outline-style: var(--oak-global-outline-style);
  outline-width: var(--oak-global-outline-width);
  outline-offset: 0px;
  outline-color: var(--oak-global-outline-color);
}
.datagrid__table__filter,
.datagrid__table__filter td,
.datagrid__table__filter td div {
  transition: height 250ms ease-in-out;
  height: 0px;
  overflow-y: hidden;
  padding: 0px;
}
.datagrid__table__filter--active,
.datagrid__table__filter--active td,
.datagrid__table__filter--active td div {
  height: 50px;
}
.datagrid__table__filter td div {
  display: flex;
  align-items: center;
  padding: 0px 10px;
}
.datagrid__table__filter:hover,
.datagrid__table__filter:hover td {
  background-color: transparent;
}
</style>
