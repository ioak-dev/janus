<template>
  <div v-if="cellHeader?.meta?.indicator && cellData">
    <list-view-datatype-badge
      v-if="cellHeader.meta.indicator === 'badge'"
      :cellData="cellData"
      :cellHeader="cellHeader"
    />
    <list-view-datatype-chip
      v-if="cellHeader.meta.indicator === 'chip'"
      :cellData="cellData"
      :cellHeader="cellHeader"
    />
    <list-view-datatype-chip-outline
      v-if="cellHeader.meta.indicator === 'chip-outline'"
      :cellData="cellData"
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
    cellData: Object,
    cellHeader: Object
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list-view-datatype {
}
</style>
