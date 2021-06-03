<template>
  <div class="datagrid" v-if="!loading" id="datagrid-reference">
    <oak-form :formGroupName="formId" @form-submit="applyQuickFilter" />
    <div>
      <oak-infinite-scroll
        variant="custom-selector"
        :customSelector="`#${scrollId}`"
        @infinite-scroll-change="loadMore"
      >
        <div class="datagrid__table" :id="scrollId">
          <table :class="tableStyle">
            <thead>
              <tr tabindex="0" @keyup="headerKeyup" id="datagrid-table-header-reference">
                <th className="checkbox">
                  <oak-checkbox
                    v-if="multiselect"
                    :value="isSelectAll"
                    name="all"
                    @input-change="handleSelectAll"
                    color="secondary"
                  ></oak-checkbox>
                </th>
                <th @click="toggleQuickFilter">#</th>
                <th v-for="item in columns" :key="item.id" @click="toggleQuickFilter">
                  {{ item.name }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="datagrid__table__filter"
                :class="`${isShowQuickFilter ? 'datagrid__table__filter--active' : ''}`"
              >
                <td colspan="2">
                  <div class="datagrid__table__filter__action">
                    <oak-button
                      size="xsmall"
                      shape="icon"
                      variant="appear"
                      theme="info"
                      @button-click="applyQuickFilter"
                    >
                      <font-awesome-icon :icon="['fas', 'save']" />
                    </oak-button>
                    <oak-button
                      size="xsmall"
                      shape="icon"
                      variant="appear"
                      theme="info"
                      @button-click="applyQuickFilter"
                    >
                      <font-awesome-icon :icon="['fas', 'upload']" />
                    </oak-button>
                    <oak-button
                      v-if="isQuickFilterApplied"
                      size="xsmall"
                      shape="icon"
                      variant="appear"
                      theme="info"
                      @button-click="clearQuickFilter"
                    >
                      <font-awesome-icon :icon="['fas', 'times']" />
                    </oak-button>
                    <oak-button
                      v-else
                      size="xsmall"
                      shape="icon"
                      variant="appear"
                      theme="primary"
                      @button-click="applyQuickFilter"
                    >
                      <font-awesome-icon :icon="['fas', 'check']" />
                    </oak-button>
                  </div>
                </td>
                <td v-for="column in columns" :key="column.id">
                  <div>
                    <datatype-form
                      hideLabel
                      :value="quickFilter.current[column.id]"
                      :cellHeader="column"
                      @change="handleQuickFilterValueChange"
                      :formGroupName="formId"
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
                <td class="link-column">
                  <oak-link @link-click="goToView(item)" color="primary"
                    ><oak-typography variant="body2">{{ item.reference }}</oak-typography></oak-link
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
    </div>
  </div>
</template>

<script>
import store from '@/store';
import { compose } from '@oakui/core-stage/style-composer/OakTableComposer';
import { computed, defineComponent, reactive, ref, toRefs } from 'vue';
import { mapGetters, useStore } from 'vuex';
import { uuid } from 'uuidv4';
import { isEqual } from 'lodash';
import { recordParameterChangedSubject } from '@/events/RecordParameterChangedEvent';
import { loadMoreRecordCommandSubject } from '@/events/LoadMoreRecordCommand';
import DatatypeTableView from '@/components/DatatypeTableView/index.vue';
import DatatypeForm from './DatatypeForm.vue';

export default defineComponent({
  name: 'Datagrid',
  props: {
    tableId: String,
    selectedRecords: Array,
    dense: Boolean,
    multiselect: Boolean,
    wrap: Boolean,
    filter: Object,
    isSelectAll: Boolean,
    secondaryGrid: Boolean,
    scrollId: String
  },
  emits: ['record-toggled', 'record-selected', 'select-all', 'select-none'],
  components: { DatatypeTableView, DatatypeForm },
  computed: {
    ...mapGetters(['getProfile', 'getColumnByTable', 'getTableReverseLookup']),
    columns() {
      return this.getColumnByTable(this.tableId);
    },
    tableStyle() {
      return `${compose({ variant: 'outlined', color: 'global', dense: this.dense })} ${
        this.secondaryGrid ? ' do-not-limit-height' : ''
      }`;
    }
  },
  created() {
    // this.fetchRecords();
    recordParameterChangedSubject.next({
      tableId: this.tableId,
      filter: this.filter,
      quickFilter: this.quickFilter.current,
      secondary: this.secondaryGrid
    });
  },
  methods: {
    loadMore() {
      console.log('*********');
      loadMoreRecordCommandSubject.next({
        secondary: this.secondaryGrid
      });
    },
    goToView(record) {
      this.$router.push(
        `/${this.getProfile.space}/schema/${this.getProfile.schema}/table/${
          this.getTableReverseLookup[record.tableId]
        }/record/${record.reference}`
      );
    },
    headerKeyup(event) {
      if (event.srcElement.id === 'datagrid-table-header-reference' && event.key === 'Enter') {
        this.toggleQuickFilter();
      }
    },
    toggleQuickFilter() {
      this.isShowQuickFilter = !this.isShowQuickFilter;
    },
    handleQuickFilterValueChange(event) {
      console.log(event);
      this.quickFilter.current[event.detail.name] = event.detail.value;
    },
    applyQuickFilter(event) {
      this.quickFilter.applied = { ...this.quickFilter.current };
      recordParameterChangedSubject.next({
        tableId: this.tableId,
        filter: this.filter,
        quickFilter: this.quickFilter.current,
        secondary: this.secondaryGrid
      });
      this.$emit('select-none');
    },
    clearQuickFilter() {
      this.quickFilter.current = {};
      this.quickFilter.applied = {};
      recordParameterChangedSubject.next({
        tableId: this.tableId,
        filter: this.filter,
        quickFilter: this.quickFilter.current,
        secondary: this.secondaryGrid
      });
    },
    toggleRecordSelectionEvent(event) {
      const record = this.records.find((item) => item.id === event.detail.name);
      this.$emit(
        'record-toggled',
        record,
        !this.selectedRecords?.includes(record.id) ? 'active' : '',
        true
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
    }
  },
  setup(props) {
    const formId = uuid();
    const records = computed(() => store.getters.getRecord(props.secondaryGrid));
    const isShowQuickFilter = ref(false);
    const quickFilter = reactive({ current: {}, applied: {} });
    const isQuickFilterApplied = computed(() => isEqual(quickFilter.current, quickFilter.applied));
    return {
      records,
      isShowQuickFilter,
      quickFilter,
      isQuickFilterApplied,
      formId
    };
  },
  watch: {
    filter(newVal, _) {
      // this.fetchRecords();
      recordParameterChangedSubject.next({
        tableId: this.tableId,
        filter: newVal,
        quickFilter: this.quickFilter.current,
        secondary: this.secondaryGrid
      });
      this.$emit('select-none');
    },
    tableId(newVal, _) {
      // this.fetchRecords();
      recordParameterChangedSubject.next({
        tableId: newVal,
        filter: this.filter,
        quickFilter: this.quickFilter.current,
        secondary: this.secondaryGrid
      });
      this.$emit('select-none');
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
    font-size: 14px;
  }
  tbody tr {
    border-top: 1px solid var(--color-info-lighter);
  }
  tbody tr.active td,
  tbody tr.active:hover td {
    background-color: var(--color-primary-transparent);
  }
  tbody tr td.checkbox {
    min-width: 0px;
  }
  tbody tr td.link-column {
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
  height: calc(100vh - var(--oak-app-layout-topbar-height) - var(--oak-toolbar-min-height));
  &.do-not-limit-height {
    height: 100%;
  }
}
table {
  border-collapse: collapse;
}
thead tr th {
  position: sticky;
  top: 0;
  font-size: 14px;
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
.datagrid__table__filter td > div {
  transition: height 250ms ease-in-out;
  height: 0px;
  overflow-y: hidden;
  padding: 0px;
}
.datagrid__table__filter--active,
.datagrid__table__filter--active td,
.datagrid__table__filter--active td > div {
  height: 50px;
}
.datagrid__table__filter td > div {
  display: flex;
  align-items: center;
  padding: 0px 10px;
}
.datagrid__table__filter:hover,
.datagrid__table__filter:hover td {
  background-color: transparent;
}
.datagrid__table__filter__action {
  display: grid;
  justify-content: flex-end;
  column-gap: 4px;
}
.oak-table--dense {
  tr {
    border-top: none;
  }
}
</style>
