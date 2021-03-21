<template>
  <div class="list-table-datatype">
    <list-view-datatype :cellData="cellData" :cellHeader="cellHeader" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';
import ListViewDatatype from '@/components/DatatypeView/ListViewDatatype.vue';

export default defineComponent({
  components: { ListViewDatatype },
  name: 'ListTableDatatype',
  props: {
    cellData: Object,
    cellHeader: Object
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list-table-datatype {
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
