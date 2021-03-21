<template>
  <oak-select
    :name="cellHeader.id"
    :value="value"
    :options="cellHeader?.meta?.options?.map((item) => item.value)"
    @input-input="$emit('change', $event)"
    :formGroupName="formGroupName"
    gutterBottom
  />
  <div v-if="options" class="list-edit-datatype-chip">
    <div
      v-for="option in options"
      :key="option.value"
      :class="`list-edit-datatype-chip__item indicator-chip-fill-color-${option.color}`"
    >
      <div class="list-edit-datatype-chip__item__value">{{ option.value }}</div>
    </div>
    <div
      v-for="option in options"
      :key="option.value"
      :class="`list-edit-datatype-chip__item indicator-chip-fill-color-${option.color}`"
    >
      <div class="list-edit-datatype-chip__item__value">{{ option.value }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'ListEditDatatypeChip',
  props: {
    value: Object,
    cellHeader: Object
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list-edit-datatype-chip {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
}
.list-edit-datatype-chip__item {
  display: flex;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}
</style>
