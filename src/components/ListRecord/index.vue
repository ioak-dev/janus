<template>
  <div class="list-table-data">
    <toolbar
      :table="table"
      @toggle-dense-view="toggleDenseView"
      :dense="dense"
      :multiselect="multiselect"
      @toggle-multiselect="toggleMultiselect"
      :preview="preview"
      @toggle-preview="togglePreview"
      :wrap="wrap"
      @toggle-wrap="toggleWrap"
    />
    <div class="list-table-data__container">
      <div class="list-table-data__container__main">
        <action-bar
          :selectedRecords="selectedRecords"
          :multiselect="multiselect"
          @clear-selection="clearSelectedRecords"
          @view="goToView"
          @create="openCreateDialog"
          @clone="openCloneDialog"
          @delete="deleteSelectedRecords"
          @filter="openFilterDialog"
        />
        <div class="list-table-data__container__main__datagrid">
          <datagrid
            :tableId="$route.params.tableId"
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
      <div :class="`list-table-data__container__side ${preview ? 'active' : ''}`">
        <sidepane :table="table" :selectedRecords="selectedRecords" />
      </div>
    </div>
  </div>
  <create-record-prompt
    v-if="table"
    :isOpen="isCreatePaneOpen"
    @close="closeCreateDialog"
    :tableId="table.id"
    :record="recordToClone"
    :filter="filter"
  />
  <filter-prompt
    v-if="table"
    :isOpen="isFilterDialogOpen"
    :filter="filter"
    @close="closeFilterDialog"
    @apply="handleApplyFilter"
    @clear="handleClearFilter"
    :tableId="table.id"
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { mapGetters, useStore } from 'vuex';
import { schemaTableByIdQuery } from '@/graphql/schemaTableById.query';
import { useRoute } from 'vue-router';
import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import store from '@/store';
import { compose as spacingCompose } from '@oakui/core-stage/style-composer/OakSpacingComposer';
import FilterPrompt from '@/components/Filter/FilterPrompt.vue';
import { deleteSchemaTableDataMutation } from '@/graphql/deleteSchemaTableData.mutation';
import Toolbar from './Toolbar.vue';
import Datagrid from './Datagrid.vue';
import ActionBar from './ActionBar.vue';
import Sidepane from './Sidepane.vue';
import CreateRecordPrompt from './CreateRecordPrompt.vue';

export default defineComponent({
  name: 'ListRecord',
  components: { Datagrid, Toolbar, ActionBar, Sidepane, CreateRecordPrompt, FilterPrompt },
  data() {
    return {
      selectedRecords: [] as string[],
      selectedRecordsObject: [] as any[],
      multiselect: true,
      preview: true,
      wrap: true,
      isSidePaneOpen: false,
      isCreatePaneOpen: false,
      isFilterDialogOpen: false,
      recordToClone: null,
      filter: undefined as any,
      isSelectAll: false
    };
  },
  methods: {
    openCreateDialog() {
      this.recordToClone = null;
      this.isCreatePaneOpen = true;
    },
    openCloneDialog() {
      this.recordToClone =
        this.selectedRecordsObject.length === 1 ? this.selectedRecordsObject[0] : null;
      this.isCreatePaneOpen = true;
    },
    closeCreateDialog() {
      this.isCreatePaneOpen = false;
    },
    openFilterDialog() {
      this.isFilterDialogOpen = true;
    },
    closeFilterDialog() {
      this.isFilterDialogOpen = false;
    },
    goToEdit() {
      if (this.selectedRecords.length === 1) {
        this.$router.push(
          `/${this.profile.space}/table/${this.$route.params.tableId}/record/${this.selectedRecords[0]}`
        );
      } else if (this.selectedRecords.length > 1) {
        this.$router.push(
          `/${this.profile.space}/table/${this.$route.params.tableId}/record/${this.selectedRecords}`
        );
      }
    },
    goToView() {
      this.$router.push(
        `/${this.profile.space}/table/${this.$route.params.tableId}/record/${this.selectedRecords[0]}`
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
    togglePreview() {
      this.preview = !this.preview;
    },
    toggleWrap() {
      this.wrap = !this.wrap;
    },
    handleRecordToggled(record: any, add: boolean) {
      this.isSelectAll = false;
      if (add) {
        this.selectedRecords = [...this.selectedRecords, record.id];
        this.selectedRecordsObject = [...this.selectedRecordsObject, record];
      } else {
        this.selectedRecords = this.selectedRecords.filter((item) => item !== record.id);
        this.selectedRecordsObject = this.selectedRecordsObject.filter(
          (item: any) => item !== record.id
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
      this.remove({ idList: this.selectedRecords }).then((response) => {
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
  setup() {
    const dense = ref(false);
    const route = useRoute();
    const profile = computed(() => store.getters.getProfile);
    const { mutate: remove } = useMutation(deleteSchemaTableDataMutation);
    const schemaTableByIdQueryOutput = useQuery(
      schemaTableByIdQuery,
      ref({
        id: route.params.tableId
      })
    );

    const datagridSpacingStyle = computed(() => {
      if (dense.value) {
        return spacingCompose({ marginVertical: 3, marginHorizontal: 1 });
      }
      return spacingCompose({ marginVertical: 6, marginHorizontal: 1 });
    });

    return {
      table: useResult(schemaTableByIdQueryOutput.result),
      profile,
      dense,
      remove,
      datagridSpacingStyle,
      loading: schemaTableByIdQueryOutput.loading
    };
  },
  watch: {
    selectedRecords(newVal, _) {
      if (newVal.length > 0) {
        this.isSidePaneOpen = true;
      } else {
        this.isSidePaneOpen = false;
      }
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
  transition: width 250ms ease-in-out;
  text-overflow: hidden;

  &.active {
    @media (min-width: 1000px) {
      border-left: 1px solid var(--global-border-color);
      width: 360px;
    }
  }
}
</style>
