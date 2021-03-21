<template>
  <div class="relation-table-datatype">
    <relation-view-datatype :cellData="cellData" :cellHeader="cellHeader" />
  </div>
</template>

<script lang="ts">
import RelationViewDatatype from '@/components/DatatypeView/RelationViewDatatype.vue';
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  components: { RelationViewDatatype },
  name: 'RelationTableDatatype',
  props: {
    cellData: Object,
    cellHeader: Object
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.relation-table-datatype {
  white-space: normal;
  min-width: 100px;
  max-width: 200px;
  // text-overflow: ellipsis;
  // overflow: hidden;
  // min-width: 100px;
  // max-width: 200px;
  // white-space: normal;
}
</style>
