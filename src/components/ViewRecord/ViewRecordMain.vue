<template>
  <div class="view-record-main">
    <div v-if="!loading">
      <view-detail
        v-if="!isEdit"
        :openEdit="openEdit"
        :closeEdit="closeEdit"
        :columnHeaders="columns"
        :rowData="schemaTableDataByIdQueryResult"
      />
      <div v-else>
        <action-bar-edit @save="handleSubmit" :formGroupName="formId" />
        <edit-detail
          @saved="closeEdit"
          :rowData="schemaTableDataByIdQueryResult"
          :tableId="tableId"
          :formGroupName="formId"
        />
      </div>
    </div>
    <app-section>
      <div slot>
        <div>Comments</div>
      </div>
    </app-section>
  </div>
</template>

<script>
import { schemaTableDataByIdQuery } from '@/graphql/schemaTableDataById.query';
import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import { defineComponent, ref, toRefs } from 'vue';
import { mapGetters } from 'vuex';
import { uuid } from 'uuidv4';
import { compose as spacingCompose } from '@oakui/core-stage/style-composer/OakSpacingComposer';
import { compose as sectionCompose } from '@oakui/core-stage/style-composer/OakSectionComposer';
import AppSection from '@/components/ui/AppSection.vue';
import ViewDetail from './ViewDetail.vue';
import EditDetail from './EditDetail.vue';
import ActionBarEdit from './ActionBarEdit.vue';

export default defineComponent({
  name: 'ViewRecordMain',
  computed: {
    ...mapGetters(['getProfile', 'getColumnByTable']),
    columns() {
      return this.getColumnByTable(this.tableId);
    },
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
      isEdit: false,
      formId: uuid()
    };
  },
  components: {
    ViewDetail,
    EditDetail,
    AppSection,
    ActionBarEdit
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

    const schemaTableDataByIdQueryOutput = useQuery(schemaTableDataByIdQuery, {
      tableId: propsRef.tableId,
      id: propsRef.recordId || ''
    });
    const schemaTableDataByIdQueryResult = useResult(schemaTableDataByIdQueryOutput.result);

    return {
      schemaTableDataByIdQueryResult,
      schemaTableDataByIdQueryOutput,
      loading: schemaTableDataByIdQueryOutput.loading
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.view-record-main {
}
</style>
