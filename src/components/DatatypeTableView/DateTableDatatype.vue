<template>
  <div class="date-table-datatype" :class="wrap ? 'wrap-text' : ''">
    <date-view-datatype :rowData="rowData" :cellHeader="cellHeader" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';
import DateViewDatatype from '@/components/DatatypeView/DateViewDatatype.vue';

export default defineComponent({
  components: { DateViewDatatype },
  name: 'DateTableDatatype',
  props: {
    rowData: Object,
    cellHeader: Object,
    wrap: Boolean
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.date-table-datatype {
}
</style>
