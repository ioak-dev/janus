<template>
  <div class="list-table">
    <action-bar
      @create="openCreate('create')"
      @clone="updateSidepaneContent('clone')"
      @edit="updateSidepaneContent('edit')"
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
        <create-record
          v-if="['create', 'clone'].includes(sidepaneContent)"
          :schemaId="$route.params.schemaId"
          :table="tableToClone"
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
import { computed, defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { compose as dividerCompose } from '@oakui/core-stage/style-composer/OakDividerComposer';
import { useRoute } from 'vue-router';
import ActionBar from './ActionBar.vue';
import TableListing from './TableListing.vue';

export default defineComponent({
  name: 'ListTable',
  components: { ActionBar, TableListing },
  methods: {
    updateSidepaneContent(contentType: string) {
      this.sidepaneContent = this.sidepaneContent === contentType ? '' : contentType;
    },
    openCreate() {
      // this.recordToClone = null;
      this.updateSidepaneContent('create');
    },
    openClone() {
      // this.recordToClone =
      //   this.selectedRecordsObject.length === 1 ? this.selectedRecordsObject[0] : null;
      this.updateSidepaneContent('clone');
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
      console.log(event.detail);
      if (event.detail.value) {
        this.selectedTables.push(event.detail.name);
      } else {
        this.selectedTables.splice(this.selectedTables.indexOf(event.detail.name), 1);
      }
    },
    handleClear() {
      this.selectedTables.splice(0, this.selectedTables.length);
    }
  },
  setup() {
    const selectedTables = reactive([] as any);
    const isSidepaneExpanded = ref(false);
    const sidepaneContent = ref('');
    const sidepaneStyle = computed(() => {
      return `${isSidepaneExpanded.value ? '' : 'sidepane-collapsed'} sidepane-active--${
        sidepaneContent.value
      }`;
    });
    const store = useStore();
    const profile = computed(() => store.getters.getProfile);

    return { isSidepaneExpanded, sidepaneContent, sidepaneStyle, profile, selectedTables };
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
