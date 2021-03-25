<template>
  <div v-if="options" class="list-view-datatype-chip-outline">
    <div
      v-for="option in options"
      :key="option.value"
      :class="`list-view-datatype-chip-outline__item indicator-chip-outline-color-${option.color}`"
    >
      <div class="list-view-datatype-chip-outline__item__value">{{ option.value }}</div>
    </div>
    <div
      v-for="option in options"
      :key="option.value"
      :class="`list-view-datatype-chip-outline__item indicator-chip-outline-color-${option.color}`"
    >
      <div class="list-view-datatype-chip-outline__item__value">{{ option.value }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'ListViewDatatypeChipOutline',
  props: {
    rowData: Object,
    cellHeader: Object
  },
  computed: {
    options(): any {
      if (!this.cellHeader?.meta?.options) {
        return null;
      }
      if (this.cellHeader.meta.multiple) {
        return this.cellHeader.meta.options.filter((item: any) =>
          this.rowData?.row[this.cellHeader?.id].includes(item.value)
        );
      }
      return this.cellHeader.meta.options.filter(
        (item: any) => item.value === this.rowData?.row[this.cellHeader?.id]
      );
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list-view-datatype-chip-outline {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
}
.list-view-datatype-chip-outline__item {
  display: flex;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}
</style>
