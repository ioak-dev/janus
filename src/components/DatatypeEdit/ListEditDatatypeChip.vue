<template>
  <oak-select
    :name="cellHeader.id"
    :label="cellHeader.name"
    :value="value"
    :optionsAsKeyValue="
      cellHeader?.meta?.options?.map((item) => {
        return { id: item.id, value: item.value };
      })
    "
    @select-input="$emit('change', $event)"
    :formGroupName="formGroupName"
    autocompleteVariant="none"
    multiple
    gutterBottom
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

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
