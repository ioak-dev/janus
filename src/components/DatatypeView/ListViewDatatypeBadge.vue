<template>
  <div v-if="options" class="list-view-datatype-badge">
    <div v-for="option in options" :key="option.id" class="list-view-datatype-badge__item">
      <div class="list-view-datatype-badge__item__indicator">
        <font-awesome-icon :class="`app-swatch-bg-i-${option.color}`" :icon="option.badge" />
      </div>
      <div class="list-view-datatype-badge__item__value">{{ option.value }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'ListViewDatatypeBadge',
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
          this.rowData?.row[this.cellHeader?.id].includes(item.id)
        );
      }
      return this.cellHeader.meta.options.filter((item: any) =>
        this.rowData?.row[this.cellHeader?.id]?.includes(item.id)
      );
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list-view-datatype-badge {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
}
.list-view-datatype-badge__item {
  display: flex;
  gap: 4px;
  align-items: center;
}
</style>
