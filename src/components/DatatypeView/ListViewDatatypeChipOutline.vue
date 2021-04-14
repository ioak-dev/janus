<template>
  <div v-if="options" class="list-view-datatype-chip">
    <div
      v-for="option in options"
      :key="option.id"
      :class="`list-view-datatype-chip-outline__item  app-swatch-outline-${option.color} ${indicatorStyle}`"
    >
      <div class="list-view-datatype-chip-outline__item__value">{{ option.value }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'ListViewDatatypeChip',
  props: {
    rowData: Object,
    cellHeader: Object
  },
  computed: {},
  setup(props) {
    const options = computed(() => {
      if (!props.cellHeader?.options) {
        return null;
      }
      if (props.cellHeader.meta.multiple) {
        return props.cellHeader.options.filter((item: any) =>
          props.rowData?.row[props.cellHeader?.id].includes(item.id)
        );
      }
      return props.cellHeader.options.filter((item: any) =>
        props.rowData?.row[props.cellHeader?.id]?.includes(item.id)
      );
    });
    const indicatorStyle = computed(() => {
      let style = 'list-view-datatype-chip__item';
      const shapeStyle = ` chip-indicator-shape--${props.cellHeader?.meta?.shape}`;
      const sizeStyle = ` chip-indicator-size--${props.cellHeader?.meta?.size}`;
      style += shapeStyle;
      style += sizeStyle;

      return style;
    });

    return { options, indicatorStyle };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list-view-datatype-chip {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
}
.list-view-datatype-chip__item {
  display: flex;
  gap: 4px;
  padding: 6px 8px;
  font-size: 12px;
}
.chip-indicator-shape--Rounded {
  border-radius: 4px;
}
.chip-indicator-shape--Ellipse {
  border-radius: 20px;
}
.chip-indicator-size--Small {
  padding: 2px 4px;
}
.chip-indicator-size--Large {
  padding: 10px 12px;
}
</style>
