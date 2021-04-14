<template>
  <div class="number-table-datatype" :class="wrap ? 'wrap-text' : ''">
    <number-view-datatype :rowData="rowData" :cellHeader="cellHeader" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';
import NumberViewDatatype from '@/components/DatatypeView/NumberViewDatatype.vue';

export default defineComponent({
  components: { NumberViewDatatype },
  name: 'NumberTableDatatype',
  props: {
    rowData: Object,
    cellHeader: Object,
    wrap: Boolean
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.number-table-datatype {
}
</style>
