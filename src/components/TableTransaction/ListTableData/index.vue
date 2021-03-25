<template>
  <div class="list-table-data">
    <oak-toolbar fillColor="container" borderVariant="both">
      <div slot="left">
        <oak-form-actions-container>
          <oak-button
            theme="primary"
            variant="appear"
            shape="rectangle"
            size="xsmall"
            @button-click="goToCreate"
            >Add data</oak-button
          >
          <oak-button
            v-if="chosenRecords.length > 1"
            theme="primary"
            variant="appear"
            shape="rectangle"
            size="xsmall"
            @button-click="goToCreate"
            >Bulk edit</oak-button
          >
          <oak-button
            v-if="chosenRecords.length === 1"
            theme="primary"
            variant="appear"
            shape="rectangle"
            size="xsmall"
            @button-click="goToEdit"
            >Edit</oak-button
          >
          <oak-button
            v-if="chosenRecords.length > 0"
            theme="danger"
            variant="appear"
            shape="rectangle"
            size="xsmall"
            @button-click="goToCreate"
            >Delete</oak-button
          >
          <oak-button
            v-if="chosenRecords.length > 0"
            theme="default"
            variant="block"
            shape="rectangle"
            size="xsmall"
            @button-click="clearChosenRecords"
            >Clear selection ({{ chosenRecords.length }})</oak-button
          >
        </oak-form-actions-container>
      </div>
      <div slot="right">
        <oak-form-actions-container>
          <oak-button
            theme="default"
            variant="appear"
            shape="rectangle"
            size="xsmall"
            @button-click="goToCreate"
            >Apply filter</oak-button
          ></oak-form-actions-container
        >
      </div>
    </oak-toolbar>
    <div :class="headerSpacingStyle">
      <div class="list-table-data__header">
        <oak-typography v-if="!loading" :variant="dense ? 'h5' : 'h4'">{{
          table.name
        }}</oak-typography>
        <oak-checkbox :value="dense" name="dense" @input-change="toggleDenseView"
          >Compact view</oak-checkbox
        >
      </div>
    </div>
    <data-grid
      :id="$route.params.id"
      :chosenRecords="chosenRecords"
      :dense="dense"
      @record-toggled="handleRecordToggled"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';
import { schemaTableByIdQuery } from '@/graphql/schemaTableById.query';
import { useRoute } from 'vue-router';
import { useQuery, useResult } from '@vue/apollo-composable';
import { compose as spacingCompose } from '@oakui/core-stage/style-composer/OakSpacingComposer';
import DataGrid from './Datagrid.vue';

export default defineComponent({
  name: 'ListTableData',
  components: { DataGrid },
  computed: {
    ...mapGetters(['getProfile']),
    headerSpacingStyle() {
      if (this.dense) {
        return spacingCompose({ marginVertical: 3, marginHorizontal: 1 });
      }
      return spacingCompose({ marginVertical: 6, marginHorizontal: 1 });
    }
  },
  data() {
    return {
      chosenRecords: [] as string[],
      dense: false
    };
  },
  methods: {
    goToCreate(event: any) {
      this.$router.push(`/${this.getProfile.space}/table/${this.$route.params.id}/data/create`);
    },
    goToEdit(record: any) {
      this.$router.push(
        `/${this.getProfile.space}/table/${this.$route.params.id}/data/view/${this.chosenRecords[0]}`
      );
    },
    goToView(record: any) {
      this.$router.push(
        `/${this.getProfile.space}/table/${this.$route.params.id}/data/view/${this.chosenRecords[0]}`
      );
    },
    toggleDenseView() {
      this.dense = !this.dense;
    },
    handleRecordToggled(recordId: string, add: boolean) {
      if (add) {
        this.chosenRecords.push(recordId);
      } else {
        this.chosenRecords = this.chosenRecords.filter((item) => item !== recordId);
      }
    },
    clearChosenRecords() {
      this.chosenRecords = [];
    }
  },
  setup(props) {
    const route = useRoute();
    const schemaTableByIdQueryOutput = useQuery(
      schemaTableByIdQuery,
      ref({
        id: route.params.id
      })
    );
    return {
      table: useResult(schemaTableByIdQueryOutput.result),
      loading: schemaTableByIdQueryOutput.loading
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list-table-data {
  .list-table-data__header {
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
  }
}
</style>
