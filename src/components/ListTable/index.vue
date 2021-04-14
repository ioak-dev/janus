<template>
  <div class="list-table">
    <action-bar
      @create="openCreate"
      @clone="openClone"
      @edit="openEdit"
      @delete="handleDelete"
      @clear-selection="handleClear"
      :selectedTables="selectedTables"
      :sidepaneContent="sidepaneContent"
    />
    <div class="list-table__container">
      <div class="list-table__container__main">
        <table-listing :selectedTables="selectedTables" @change-selection="handleSelect" />
      </div>
      <div class="list-table__container__side" :class="sidepaneStyle">
        <create-table
          v-if="['create', 'clone'].includes(sidepaneContent)"
          :schemaId="$route.params.schemaId"
          :table="tableToCloneOrEdit"
          :isSidepaneExpanded="isSidepaneExpanded"
          @saved="updateSidepaneContent(sidepaneContent)"
          @close="updateSidepaneContent(sidepaneContent)"
          @expand="expandSidepane"
          @collapse="collapseSidepane"
        />
        <create-table
          v-if="sidepaneContent === 'edit'"
          edit
          :schemaId="$route.params.schemaId"
          :table="tableToCloneOrEdit"
          :isSidepaneExpanded="isSidepaneExpanded"
          @saved="updateSidepaneContent(sidepaneContent)"
          @close="updateSidepaneContent(sidepaneContent)"
          @expand="expandSidepane"
          @collapse="collapseSidepane"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from 'vue';
import { useStore } from 'vuex';
import { compose as dividerCompose } from '@oakui/core-stage/style-composer/OakDividerComposer';
import { useMutation } from '@vue/apollo-composable';
import store from '@/store';
import { deleteSchemaTableMutation } from '@/graphql/deleteSchemaTable.mutation';
import ActionBar from './ActionBar.vue';
import TableListing from './TableListing.vue';
import CreateTable from './CreateTable.vue';

export default defineComponent({
  name: 'ListTable',
  components: { ActionBar, TableListing, CreateTable },
  methods: {
    updateSidepaneContent(contentType: string) {
      this.sidepaneContent = this.sidepaneContent === contentType ? '' : contentType;
    },
    openCreate() {
      this.tableToCloneOrEdit = null;
      this.updateSidepaneContent('create');
    },
    openClone() {
      this.tableToCloneOrEdit =
        this.selectedTablesObject.length === 1 ? this.selectedTablesObject[0] : null;
      this.updateSidepaneContent('clone');
    },
    openEdit() {
      this.tableToCloneOrEdit =
        this.selectedTablesObject.length === 1 ? this.selectedTablesObject[0] : null;
      this.updateSidepaneContent('edit');
    },
    expandSidepane() {
      this.isSidepaneExpanded = true;
    },
    collapseSidepane() {
      this.isSidepaneExpanded = false;
    },
    goToTable(tableId: string) {
      this.$router.push(
        `/${this.profile.space}/schema/${this.$route.params.schemaId}/table/${tableId}`
      );
    },
    handleSelect(event: any) {
      if (event.detail.value) {
        this.selectedTables.push(event.detail.name.id);
        this.selectedTablesObject.push(event.detail.name);
      } else {
        this.selectedTablesObject.splice(this.selectedTables.indexOf(event.detail.name.id), 1);
        this.selectedTables.splice(this.selectedTables.indexOf(event.detail.name.id), 1);
      }
    },
    handleClear() {
      this.selectedTables.splice(0, this.selectedTables.length);
      this.selectedTablesObject.splice(0, this.selectedTablesObject.length);
    },
    handleDelete() {
      this.deleteTable({ idList: this.selectedTables }).then((response) => {
        store.dispatch('deleteTable', response.data.deleteSchemaTable.idList);
      });
    }
  },
  setup() {
    const selectedTables = reactive([] as string[]);
    const selectedTablesObject = reactive([] as any[]);
    const isSidepaneExpanded = ref(false);
    const sidepaneContent = ref('');
    const sidepaneStyle = computed(() => {
      return `${isSidepaneExpanded.value ? '' : 'sidepane-collapsed'} sidepane-active--${
        sidepaneContent.value
      }`;
    });
    const storeVuex = useStore();
    const profile = computed(() => storeVuex.getters.getProfile);
    const tableToCloneOrEdit = reactive(null as any);
    const { mutate } = useMutation(deleteSchemaTableMutation);

    return {
      isSidepaneExpanded,
      sidepaneContent,
      sidepaneStyle,
      profile,
      selectedTables,
      selectedTablesObject,
      tableToCloneOrEdit,
      deleteTable: mutate
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list-table__container {
  overflow-x: hidden;
  display: grid;
  grid-template-columns: 1fr auto;
}
.list-table__container__main {
  height: calc(100vh - var(--oak-app-layout-topbar-height) - var(--oak-toolbar-min-height));
  overflow-x: auto;
}
.list-table__container__side {
  width: 0px;
  transition: width 100ms ease-in-out;
  text-overflow: hidden;

  &.sidepane-active--create,
  &.sidepane-active--clone,
  &.sidepane-active--edit {
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
