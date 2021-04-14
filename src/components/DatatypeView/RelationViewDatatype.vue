<template>
  <div
    v-if="rowData?.relation && rowData?.relation[cellHeader?.id]?.length > 0"
    class="relation-view-datatype"
  >
    <oak-link @link-click="goToRecord">
      <oak-typography variant="body2" underline="hover" color="primary">
        {{ rowData?.relation[cellHeader?.id][0]?.row[cellHeader?.meta?.columnId] }}
      </oak-typography>
    </oak-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'RelationViewDatatype',
  computed: {
    ...mapGetters(['getProfile'])
  },
  props: {
    rowData: Object,
    cellHeader: Object
  },
  methods: {
    goToRecord() {
      this.$router.push({
        name: 'ViewRecordView',
        params: {
          space: this.getProfile.space,
          tableId: this.cellHeader?.meta?.tableId,
          recordRef: this.rowData?.relation[this.cellHeader?.id][0].reference || ''
        }
      });
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.relation-view-datatype {
}
</style>
