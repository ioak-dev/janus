<template>
  <div v-if="cellHeader?.meta?.indicator">
    <!-- <list-edit-datatype-badge
      v-if="cellHeader.meta.indicator === 'badge'"
      :value="value"
      :cellHeader="cellHeader"
      @change="$emit('change', $event)"
    /> -->
    <list-form-datatype-chip
      :value="value"
      :cellHeader="cellHeader"
      @change="$emit('change', $event)"
    />
    <!-- <list-edit-datatype-chip-outline
      v-if="cellHeader.meta.indicator === 'chip-outline'"
      :value="value"
      :cellHeader="cellHeader"
      @change="$emit('change', $event)"
    /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ListFormDatatypeChip from './ListFormDatatypeChip.vue';

export default defineComponent({
  components: { ListFormDatatypeChip },
  name: 'ListFormDatatype',
  props: {
    value: Object,
    cellHeader: Object
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
