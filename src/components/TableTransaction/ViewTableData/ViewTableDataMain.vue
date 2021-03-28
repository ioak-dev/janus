<template>
  <div class="view-table-data-main">
    <div v-if="!loading">
      <view-detail
        v-if="!isEdit"
        :openEdit="openEdit"
        :closeEdit="closeEdit"
        :columnHeaders="allSchemaTableColumnQueryResult"
        :rowData="schemaTableDataByIdQueryResult"
      />
      <edit-detail
        v-else
        :openEdit="openEdit"
        :closeEdit="closeEdit"
        :columnHeaders="allSchemaTableColumnQueryResult"
        :rowData="schemaTableDataByIdQueryResult"
        :tableId="tableId"
      />
    </div>
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
import { defineComponent, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { mapGetters } from 'vuex';
import { compose as spacingCompose } from '@oakui/core-stage/style-composer/OakSpacingComposer';
import { compose as sectionCompose } from '@oakui/core-stage/style-composer/OakSectionComposer';
import AppSection from '@/components/ui/AppSection.vue';
import Toolbar from './Toolbar.vue';
import ViewDetail from './ViewDetail.vue';
import EditDetail from './EditDetail.vue';

export default defineComponent({
  name: 'ViewTableDataMain',
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
    ViewDetail,
    EditDetail,
    AppSection
  },
  props: { tableId: String, recordId: String },
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
  setup(props) {
    const propsRef = toRefs(props);
    const allSchemaTableColumnQueryOutput = useQuery(
      allSchemaTableColumnQuery,
      ref({
        tableId: propsRef.tableId
      })
    );
    const allSchemaTableColumnQueryResult = useResult(allSchemaTableColumnQueryOutput.result);

    const schemaTableDataByIdQueryOutput = useQuery(schemaTableDataByIdQuery, {
      tableId: propsRef.tableId,
      id: propsRef.recordId
    });
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
.view-table-data-main {
}
</style>
