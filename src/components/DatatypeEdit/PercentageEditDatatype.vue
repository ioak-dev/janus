<template>
  <div class="text-edit-datatype">
    <oak-input
      type="number"
      :name="cellHeader.id"
      :label="cellHeader.name"
      :value="value"
      @input-input="$emit('change', $event)"
      :formGroupName="formGroupName"
      gutterBottom
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PercentageEditDatatype',
  props: {
    formGroupName: String,
    value: Object,
    cellHeader: Object
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.text-edit-datatype {
}
</style>
