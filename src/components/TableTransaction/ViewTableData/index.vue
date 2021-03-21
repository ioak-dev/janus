<template>
  <div class="view-table-data">
    <oak-toolbar fillColor="container" borderVariant="both">
      <div slot="left">
        <oak-form-actions-container>
          <oak-button
            theme="default"
            variant="appear"
            shape="rectangle"
            size="xsmall"
            @button-click="goBack"
            >Back</oak-button
          >
          <oak-button
            theme="primary"
            variant="appear"
            shape="rectangle"
            size="xsmall"
            @button-click="goToEdit"
            >Edit</oak-button
          >
          <oak-button
            theme="danger"
            variant="appear"
            shape="rectangle"
            size="xsmall"
            @button-click="goToEdit"
            >Delete</oak-button
          >
        </oak-form-actions-container>
      </div>
      <div slot="right">right side</div>
    </oak-toolbar>
    <div class="view-table-data__container">
      <div :class="headerSpacingStyle">
        <div>
          <oak-typography variant="h5">JANU-21</oak-typography>
        </div>
      </div>
      <div v-if="!loading" class="view-table-data__container__main">
        <div
          class="view-table-data__container__main__item"
          v-for="(column, index) in allSchemaTableColumnQueryResult"
          :key="`${column.id}-${index}`"
        >
          <div class="view-table-data__container__main__item__label">{{ column.name }}</div>
          <div class="view-table-data__container__main__item__value">
            <datatype-view :cellData="schemaTableDataByIdQueryResult" :cellHeader="column" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { allSchemaTableColumnQuery } from '@/graphql/allSchemaTableColumn.query';
import { schemaTableDataByIdQuery } from '@/graphql/schemaTableDataById.query';
import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { mapGetters } from 'vuex';
import { compose as spacingCompose } from '@oakui/core-stage/style-composer/OakSpacingComposer';
import DatatypeView from '../../DatatypeView/index.vue';

export default defineComponent({
  name: 'ViewTableData',
  computed: {
    ...mapGetters(['getProfile']),

    headerSpacingStyle() {
      return spacingCompose({ marginVertical: 6, marginHorizontal: 1 });
    }
  },
  components: {
    DatatypeView
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    goToEdit(event: any) {
      this.$router.push(
        `/${this.getProfile.space}/table/${this.$route.params.id}/data/edit/${this.$route.params.rowId}`
      );
    }
  },
  setup() {
    const route = useRoute();
    const allSchemaTableColumnQueryOutput = useQuery(
      allSchemaTableColumnQuery,
      ref({
        tableId: route.params.id
      })
    );
    const allSchemaTableColumnQueryResult = useResult(allSchemaTableColumnQueryOutput.result);

    const schemaTableDataByIdQueryOutput = useQuery(
      schemaTableDataByIdQuery,
      ref({
        tableId: route.params.id,
        id: route.params.rowId
      })
    );
    const schemaTableDataByIdQueryResult = useResult(schemaTableDataByIdQueryOutput.result);

    return {
      allSchemaTableColumnQueryResult,
      schemaTableDataByIdQueryResult,
      schemaTableDataByIdQueryOutput,
      loading: allSchemaTableColumnQueryOutput.loading || schemaTableDataByIdQueryOutput.loading
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.view-table-data {
}
.view-table-data__container {
  margin: 20px;
}
.view-table-data__container__main {
  display: grid;
  // flex-direction: column;
  grid-template-columns: auto auto auto;
  justify-content: flex-start;
  // justify-items: flex-start;
  column-gap: 20px;
  row-gap: 20px;
  font-size: 14px;
}
.view-table-data__container__main__item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  // background-color: var(--color-container);
  padding: 10px;
  border-radius: 4px;
}
.view-table-data__container__main__item__label {
  font-weight: 600;
}
.view-table-data__container__main__item__value {
}
</style>
