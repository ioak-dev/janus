<template>
  <div class="list-table-data">
    <toolbar
      :table="table"
      @toggle-dense-view="toggleDenseView"
      :dense="dense"
      :multiselect="multiselect"
      @toggle-multiselect="toggleMultiselect"
      :wrap="wrap"
      @toggle-wrap="toggleWrap"
    />
    <div class="list-table-data__container">
      <div class="list-table-data__container__main">
        <action-bar
          :selectedRecords="selectedRecords"
          :multiselect="multiselect"
          :sidepaneContent="sidepaneContent"
          @clear-selection="clearSelectedRecords"
          @view="goToView"
          @delete="deleteSelectedRecords"
          @create="openCreate"
          @clone="openClone"
          @settings="updateSidepaneContent('settings')"
          @filter="updateSidepaneContent('filter')"
          @activity="updateSidepaneContent('activity')"
          @edit="updateSidepaneContent('edit')"
        />
        <div class="list-table-data__container__main__datagrid">
          <datagrid
            :tableId="tableId"
            :selectedRecords="selectedRecords"
            :dense="dense"
            :multiselect="multiselect"
            :wrap="wrap"
            :filter="filter"
            :isSelectAll="isSelectAll"
            scrollId="iscroll-1"
            @select-none="clearSelectedRecords"
            @select-all="selectAllRecords"
            @record-toggled="handleRecordToggled"
            @record-selected="handleRecordSelected"
          />
        </div>
      </div>
      <div class="list-table-data__container__side" :class="sidepaneStyle">
        <column-settings
          v-if="sidepaneContent === 'settings'"
          @saved="updateSidepaneContent(sidepaneContent)"
          :tableId="table.id"
          :selectedRecords="selectedRecordsObject"
          :isSidepaneExpanded="isSidepaneExpanded"
          @close="updateSidepaneContent(sidepaneContent)"
          @expand="expandSidepane"
          @collapse="collapseSidepane"
        />
        <edit-record
          v-if="sidepaneContent === 'edit'"
          @saved="handleRecordUpdate"
          :tableId="table.id"
          :selectedRecords="selectedRecordsObject"
          :isSidepaneExpanded="isSidepaneExpanded"
          @close="updateSidepaneContent(sidepaneContent)"
          @expand="expandSidepane"
          @collapse="collapseSidepane"
        />
        <activity
          v-if="sidepaneContent === 'activity'"
          :table="table"
          :selectedRecords="selectedRecords"
          :isSidepaneExpanded="isSidepaneExpanded"
          @close="updateSidepaneContent(sidepaneContent)"
          @expand="expandSidepane"
          @collapse="collapseSidepane"
        />
        <create-record
          v-if="['create', 'clone'].includes(sidepaneContent)"
          :tableId="tableId"
          :record="recordToClone"
          :filter="filter"
          :isSidepaneExpanded="isSidepaneExpanded"
          @saved="updateSidepaneContent(sidepaneContent)"
          @close="updateSidepaneContent(sidepaneContent)"
          @expand="expandSidepane"
          @collapse="collapseSidepane"
        />
        <filter-pane
          v-if="sidepaneContent === 'filter'"
          :isOpen="isFilterDialogOpen"
          :tableId="table.id"
          :filter="filter"
          :isSidepaneExpanded="isSidepaneExpanded"
          @close="updateSidepaneContent(sidepaneContent)"
          @expand="expandSidepane"
          @collapse="collapseSidepane"
          @apply="handleApplyFilter"
          @clear="handleClearFilter"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import store from '@/store';
import { useStore } from 'vuex';
import { compose as spacingCompose } from '@oakui/core-stage/style-composer/OakSpacingComposer';
import { deleteSchemaTableDataMutation } from '@/graphql/deleteSchemaTableData.mutation';
import Activity from '@/components/Activity/index.vue';
import ColumnSettings from '@/components/ColumnSettings/index.vue';
import Toolbar from './Toolbar.vue';
import Datagrid from './Datagrid.vue';
import ActionBar from './ActionBar.vue';
import CreateRecord from './CreateRecord.vue';
import EditRecord from './EditRecord.vue';
import FilterPane from '../Filter/FilterPane.vue';

export default defineComponent({
  name: 'ListRecord',
  components: {
    Datagrid,
    Toolbar,
    ActionBar,
    CreateRecord,
    EditRecord,
    Activity,
    FilterPane,
    ColumnSettings
  },
  props: { tableId: String },
  data() {
    return {
      selectedRecords: [] as string[],
      selectedRecordsObject: [] as any[],
      multiselect: true,
      wrap: true,
      recordToClone: null,
      filter: undefined as any,
      isSelectAll: false
    };
  },
  methods: {
    updateSidepaneContent(contentType: string) {
      this.sidepaneContent = this.sidepaneContent === contentType ? '' : contentType;
    },
    openCreate() {
      this.recordToClone = null;
      this.updateSidepaneContent('create');
    },
    openClone() {
      this.recordToClone =
        this.selectedRecordsObject.length === 1 ? this.selectedRecordsObject[0] : null;
      this.updateSidepaneContent('clone');
    },
    expandSidepane() {
      this.isSidepaneExpanded = true;
    },
    collapseSidepane() {
      this.isSidepaneExpanded = false;
    },
    goToEdit() {
      if (this.selectedRecords.length === 1) {
        this.$router.push(
          `/${this.profile.space}/table/${this.tableId}/record/${this.selectedRecords[0]}`
        );
      } else if (this.selectedRecords.length > 1) {
        this.$router.push(
          `/${this.profile.space}/table/${this.tableId}/record/${this.selectedRecords}`
        );
      }
    },
    goToView() {
      this.$router.push(
        `/${this.profile.space}/table/${this.tableId}/record/${this.selectedRecords[0]}`
      );
    },
    toggleDenseView() {
      this.dense = !this.dense;
    },
    toggleMultiselect() {
      this.isSelectAll = false;
      if (this.multiselect) {
        if (this.selectedRecords.length > 1) {
          this.selectedRecords = [this.selectedRecords[this.selectedRecords.length - 1]];
        }
        this.multiselect = !this.multiselect;
      } else {
        this.multiselect = !this.multiselect;
      }
    },
    toggleWrap() {
      this.wrap = !this.wrap;
    },
    handleRecordUpdate(_updatedObject: any) {
      const index = this.selectedRecordsObject.findIndex(
        (item: any) => item.id === _updatedObject.id
      );
      this.selectedRecordsObject[index] = _updatedObject;
      this.updateSidepaneContent(this.sidepaneContent);
    },
    handleRecordToggled(record: any, add: boolean, originatedFromFormControl = false) {
      this.isSelectAll = false;
      if (add) {
        if (!originatedFromFormControl && this.selectedRecords.length <= 1) {
          this.selectedRecords = [record.id];
          this.selectedRecordsObject = [record];
        } else {
          this.selectedRecords = [...this.selectedRecords, record.id];
          this.selectedRecordsObject = [...this.selectedRecordsObject, record];
        }
      } else {
        this.selectedRecords = this.selectedRecords.filter((item: any) => item !== record.id);
        this.selectedRecordsObject = this.selectedRecordsObject.filter(
          (item: any) => item.id !== record.id
        );
      }
    },
    handleRecordSelected(record: any) {
      this.isSelectAll = false;
      if (this.selectedRecords.includes(record.id)) {
        this.selectedRecords = [];
        this.selectedRecordsObject = [];
      } else {
        this.selectedRecords = [record.id];
        this.selectedRecordsObject = [record];
      }
    },
    clearSelectedRecords() {
      this.selectedRecords = [];
      this.selectedRecordsObject = [];
      this.isSelectAll = false;
    },
    selectAllRecords(records: any[]) {
      this.isSelectAll = true;
      this.selectedRecords = records.map((item) => item.id);
      this.selectedRecordsObject = records;
    },
    deleteSelectedRecords() {
      this.remove({ tableId: this.table.id, idList: this.selectedRecords }).then((response) => {
        store.dispatch('deleteRecord', response.data.deleteSchemaTableData.idList);
        this.selectedRecords = [];
        this.selectedRecordsObject = [];
        this.isSelectAll = false;
      });
    },
    handleApplyFilter(filter: any) {
      this.filter = filter;
    },
    handleClearFilter() {
      this.filter = null;
    }
  },
  setup(props) {
    const route = useRoute();
    const isSidepaneExpanded = ref(false);
    const sidepaneContent = ref('');
    const sidepaneStyle = computed(() => {
      return `${isSidepaneExpanded.value ? '' : 'sidepane-collapsed'} sidepane-active--${
        sidepaneContent.value
      }`;
    });
    const dense = ref(false);
    const profile = computed(() => store.getters.getProfile);
    const table = computed(() => store.getters.getTableById(props.tableId));
    const { mutate: remove } = useMutation(deleteSchemaTableDataMutation);

    const datagridSpacingStyle = computed(() => {
      if (dense.value) {
        return spacingCompose({ marginVertical: 3, marginHorizontal: 1 });
      }
      return spacingCompose({ marginVertical: 6, marginHorizontal: 1 });
    });

    return {
      sidepaneContent,
      sidepaneStyle,
      isSidepaneExpanded,
      table,
      profile,
      dense,
      remove,
      datagridSpacingStyle
    };
  },
  watch: {
    selectedRecords(newVal, _) {
      // if (newVal.length > 0) {
      //   this.isSidePaneOpen = true;
      // } else {
      //   this.isSidePaneOpen = false;
      // }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list-table-data__container {
  overflow-x: hidden;
  display: grid;
  grid-template-columns: 1fr auto;
}
.list-table-data__container__main {
  overflow-x: auto;
}
.list-table-data__container__main__datagrid {
  // margin-top: 20px;
}

.list-table-data__container__side {
  width: 0px;
  transition: width 100ms ease-in-out;
  text-overflow: hidden;

  &.sidepane-active--create,
  &.sidepane-active--clone,
  &.sidepane-active--edit,
  &.sidepane-active--filter,
  &.sidepane-active--settings,
  &.sidepane-active--activity {
    width: 100vw;
    &.sidepane-collapsed {
      @media (min-width: 1000px) {
        width: 360px;
        border-left: 1px solid var(--global-border-color);
      }
    }
  }
}
</style>
