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
          @clear-selection="clearSelectedRecords"
          @view="goToView"
          @create="openCreateDialog"
          @clone="openCloneDialog"
          @delete="deleteSelectedRecords"
          @filter="openFilterDialog"
        />
        <div class="list-table-data__container__main__datagrid">
          <data-grid
            :id="$route.params.tableId"
            :selectedRecords="selectedRecords"
            :dense="dense"
            :multiselect="multiselect"
            :wrap="wrap"
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
  />
  <filter-prompt
    v-if="table"
    :isOpen="isFilterDialogOpen"
    @close="closeFilterDialog"
    :tableId="table.id"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';
import { schemaTableByIdQuery } from '@/graphql/schemaTableById.query';
import { deleteSchemaTableDataMutation } from '@/graphql/deleteSchemaTableData.mutation';
import { allSchemaTableDataQuery } from '@/graphql/allSchemaTableData.query';
import { useRoute } from 'vue-router';
import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import { compose as spacingCompose } from '@oakui/core-stage/style-composer/OakSpacingComposer';
import FilterPrompt from '@/components/Filter/FilterPrompt.vue';
import Toolbar from './Toolbar.vue';
import DataGrid from './Datagrid.vue';
import ActionBar from './ActionBar.vue';
import Sidepane from './Sidepane.vue';
import CreateRecordPrompt from './CreateRecordPrompt.vue';

export default defineComponent({
  name: 'ListRecord',
  components: { DataGrid, Toolbar, ActionBar, Sidepane, CreateRecordPrompt, FilterPrompt },
  computed: {
    ...mapGetters(['getProfile']),
    datagridSpacingStyle() {
      if (this.dense) {
        return spacingCompose({ marginVertical: 3, marginHorizontal: 1 });
      }
      return spacingCompose({ marginVertical: 6, marginHorizontal: 1 });
    }
  },
  data() {
    return {
      selectedRecords: [] as string[],
      selectedRecordsObject: [] as any[],
      dense: false,
      multiselect: false,
      preview: true,
      wrap: true,
      isSidePaneOpen: false,
      isCreatePaneOpen: false,
      isFilterDialogOpen: false,
      recordToClone: null
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
          `/${this.getProfile.space}/table/${this.$route.params.tableId}/record/${this.selectedRecords[0]}`
        );
      } else if (this.selectedRecords.length > 1) {
        this.$router.push(
          `/${this.getProfile.space}/table/${this.$route.params.tableId}/record/${this.selectedRecords}`
        );
      }
    },
    goToView() {
      this.$router.push(
        `/${this.getProfile.space}/table/${this.$route.params.tableId}/record/${this.selectedRecords[0]}`
      );
    },
    toggleDenseView() {
      this.dense = !this.dense;
    },
    toggleMultiselect() {
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
      this.selectedRecords = [record.id];
      this.selectedRecordsObject = [record];
    },
    clearSelectedRecords() {
      this.selectedRecords = [];
      this.selectedRecordsObject = [];
    },
    deleteSelectedRecords() {
      this.deleteRecords({ idList: this.selectedRecords }).then((response) => {
        this.selectedRecords = [];
        this.selectedRecordsObject = [];
      });
    }
  },
  setup(props) {
    const route = useRoute();
    const schemaTableByIdQueryOutput = useQuery(
      schemaTableByIdQuery,
      ref({
        id: route.params.tableId
      })
    );

    const { mutate: deleteRecords } = useMutation(deleteSchemaTableDataMutation, () => ({
      update: (cache, mutationResult) => {
        const data: any = cache.readQuery({
          query: allSchemaTableDataQuery,
          variables: {
            tableId: route.params.tableId
          }
        });
        cache.writeQuery({
          query: allSchemaTableDataQuery,
          variables: {
            tableId: route.params.tableId
          },
          data: {
            allSchemaTableData: data.allSchemaTableData.filter(
              (item: any) => !mutationResult.data.deleteSchemaTableData.idList.includes(item.id)
            )
          }
        });
      }
    }));

    return {
      table: useResult(schemaTableByIdQueryOutput.result),
      deleteRecords,
      loading: schemaTableByIdQueryOutput.loading
    };
  },
  watch: {
    selectedRecords(newVal, oldVal) {
      console.log(oldVal, newVal);
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
  margin-top: 20px;
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
