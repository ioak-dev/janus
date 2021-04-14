<template>
  <div class="list-schema">
    <action-bar
      @create="openCreate"
      @clone="openClone"
      @edit="openEdit"
      @delete="handleDelete"
      @clear-selection="handleClear"
      :selectedSchemas="selectedSchemas"
      :sidepaneContent="sidepaneContent"
    />
    <div class="list-schema__container">
      <div class="list-schema__container__main">
        <schema-listing :selectedSchemas="selectedSchemas" @change-selection="handleSelect" />
      </div>
      <div class="list-schema__container__side" :class="sidepaneStyle">
        <create-schema
          v-if="['create', 'clone'].includes(sidepaneContent)"
          :schema="schemaToCloneOrEdit"
          :isSidepaneExpanded="isSidepaneExpanded"
          @saved="updateSidepaneContent(sidepaneContent)"
          @close="updateSidepaneContent(sidepaneContent)"
          @expand="expandSidepane"
          @collapse="collapseSidepane"
        />
        <create-schema
          v-if="sidepaneContent === 'edit'"
          edit
          :schema="schemaToCloneOrEdit"
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
import { deleteSchemaMutation } from '@/graphql/deleteSchema.mutation';
import ActionBar from './ActionBar.vue';
import SchemaListing from './SchemaListing.vue';
import CreateSchema from './CreateSchema.vue';

export default defineComponent({
  name: 'ListSchema',
  components: { ActionBar, SchemaListing, CreateSchema },
  methods: {
    updateSidepaneContent(contentType: string) {
      this.sidepaneContent = this.sidepaneContent === contentType ? '' : contentType;
    },
    openCreate() {
      this.schemaToCloneOrEdit = null;
      this.updateSidepaneContent('create');
    },
    openClone() {
      this.schemaToCloneOrEdit =
        this.selectedSchemasObject.length === 1 ? this.selectedSchemasObject[0] : null;
      this.updateSidepaneContent('clone');
    },
    openEdit() {
      this.schemaToCloneOrEdit =
        this.selectedSchemasObject.length === 1 ? this.selectedSchemasObject[0] : null;
      this.updateSidepaneContent('edit');
    },
    expandSidepane() {
      this.isSidepaneExpanded = true;
    },
    collapseSidepane() {
      this.isSidepaneExpanded = false;
    },
    goToSchema(schemaId: string) {
      this.$router.push(`/${this.profile.space}/schema/${schemaId}`);
    },
    handleSelect(event: any) {
      if (event.detail.value) {
        this.selectedSchemas.push(event.detail.name.id);
        this.selectedSchemasObject.push(event.detail.name);
      } else {
        this.selectedSchemasObject.splice(this.selectedSchemas.indexOf(event.detail.name.id), 1);
        this.selectedSchemas.splice(this.selectedSchemas.indexOf(event.detail.name.id), 1);
      }
    },
    handleClear() {
      this.selectedSchemas.splice(0, this.selectedSchemas.length);
      this.selectedSchemasObject.splice(0, this.selectedSchemasObject.length);
    },
    handleDelete() {
      this.deleteSchema({ idList: this.selectedSchemas }).then((response: any) => {
        store.dispatch('deleteSchema', response.data.deleteSchema.idList);
      });
    }
  },
  setup() {
    const selectedSchemas = reactive([] as string[]);
    const selectedSchemasObject = reactive([] as any[]);
    const isSidepaneExpanded = ref(false);
    const sidepaneContent = ref('');
    const sidepaneStyle = computed(() => {
      return `${isSidepaneExpanded.value ? '' : 'sidepane-collapsed'} sidepane-active--${
        sidepaneContent.value
      }`;
    });
    const storeVuex = useStore();
    const profile = computed(() => storeVuex.getters.getProfile);
    const schemaToCloneOrEdit = reactive(null as any);
    const { mutate } = useMutation(deleteSchemaMutation);

    return {
      isSidepaneExpanded,
      sidepaneContent,
      sidepaneStyle,
      profile,
      selectedSchemas,
      selectedSchemasObject,
      schemaToCloneOrEdit,
      deleteSchema: mutate
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list-schema__container {
  overflow-x: hidden;
  display: grid;
  grid-template-columns: 1fr auto;
}
.list-schema__container__main {
  height: calc(100vh - var(--oak-app-layout-topbar-height) - var(--oak-toolbar-min-height));
  overflow-x: auto;
}
.list-schema__container__side {
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
