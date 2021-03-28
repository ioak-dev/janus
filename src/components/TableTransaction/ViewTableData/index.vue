<template>
  <toolbar :tableId="tableId" :record="schemaTableDataByIdQueryResult" />
  <view-table-data-main :tableId="tableId" :recordId="recordId" />
</template>

<script lang="ts">
import { schemaTableDataByIdQuery } from '@/graphql/schemaTableDataById.query';
import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';
import { compose as spacingCompose } from '@oakui/core-stage/style-composer/OakSpacingComposer';
import { compose as sectionCompose } from '@oakui/core-stage/style-composer/OakSectionComposer';
import Toolbar from './Toolbar.vue';
import ViewTableDataMain from './ViewTableDataMain.vue';

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
    ViewTableDataMain,
    Toolbar
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
    const schemaTableDataByIdQueryOutput = useQuery(
      schemaTableDataByIdQuery,
      ref({
        tableId: props.tableId,
        id: props.recordId
      })
    );
    const schemaTableDataByIdQueryResult = useResult(schemaTableDataByIdQueryOutput.result);

    return {
      schemaTableDataByIdQueryResult,
      loading: schemaTableDataByIdQueryOutput.loading
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.view-table-data {
}
</style>
