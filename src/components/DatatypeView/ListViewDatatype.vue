<template>
  <div v-if="cellHeader?.meta?.indicator && rowData">
    <list-view-datatype-badge
      v-if="cellHeader.meta.indicator === 'badge'"
      :rowData="rowData"
      :cellHeader="cellHeader"
    />
    <list-view-datatype-chip
      v-if="cellHeader.meta.indicator === 'chip'"
      :rowData="rowData"
      :cellHeader="cellHeader"
    />
    <list-view-datatype-chip-outline
      v-if="cellHeader.meta.indicator === 'chip-outline'"
      :rowData="rowData"
      :cellHeader="cellHeader"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';
import ListViewDatatypeChip from './ListViewDatatypeChip.vue';
import ListViewDatatypeBadge from './ListViewDatatypeBadge.vue';
import ListViewDatatypeChipOutline from './ListViewDatatypeChipOutline.vue';

export default defineComponent({
  components: { ListViewDatatypeChip, ListViewDatatypeBadge, ListViewDatatypeChipOutline },
  name: 'ListViewDatatype',
  props: {
    rowData: Object,
    cellHeader: Object
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list-view-datatype {
}
</style>
