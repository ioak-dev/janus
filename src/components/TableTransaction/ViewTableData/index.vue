<template>
  <div class="view-table-data">
    <toolbar
      :tableId="$route.params.id"
      :record="schemaTableDataByIdQueryResult"
      :openEdit="openEdit"
      :closeEdit="closeEdit"
      :isEdit="isEdit"
    />
    <app-section subtle>
      <div slot>
        <action-bar
          :record="schemaTableDataByIdQueryResult"
          :isEdit="isEdit"
          :openEdit="openEdit"
          :closeEdit="closeEdit"
        /></div
    ></app-section>
    <app-section v-if="!loading">
      <div slot>
        <view-detail
          v-if="!isEdit"
          :columnHeaders="allSchemaTableColumnQueryResult"
          :rowData="schemaTableDataByIdQueryResult"
        />
        <edit-detail
          v-else
          :columnHeaders="allSchemaTableColumnQueryResult"
          :rowData="schemaTableDataByIdQueryResult"
          :closeEdit="closeEdit"
        />
      </div>
    </app-section>
    <app-section>
      <div slot>
        <div>Comments</div>
      </div>
    </app-section>
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
import { compose as sectionCompose } from '@oakui/core-stage/style-composer/OakSectionComposer';
import AppSection from '@/components/ui/AppSection.vue';
import Toolbar from './Toolbar.vue';
import ActionBar from './ActionBar.vue';
import ViewDetail from './ViewDetail.vue';
import EditDetail from './EditDetail.vue';

export default defineComponent({
  name: 'ViewTableData',
  computed: {
    ...mapGetters(['getProfile']),
    mainSectionStyle() {
      return sectionCompose({
        outlineColor: 'none',
        elevation: 1,
        fillColor: 'container',
        marginHorizontal: 0,
        marginVertical: 0,
        paddingHorizontal: 3,
        paddingVertical: 3
      });
    },
    mainSpacingStyle() {
      return spacingCompose({
        marginHorizontal: 4
      });
    }
  },
  data() {
    return {
      isEdit: false
    };
  },
  components: {
    Toolbar,
    ActionBar,
    ViewDetail,
    EditDetail,
    AppSection
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    openEdit() {
      this.isEdit = true;
    },
    closeEdit() {
      this.isEdit = false;
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
</style>
