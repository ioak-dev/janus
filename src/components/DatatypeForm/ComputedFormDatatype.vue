<template>
  <div class="computed-form-datatype">
    <oak-input
      type="text"
      color="container"
      :name="cellHeader.id"
      :label="hideLabel ? null : cellHeader.name"
      :value="value"
      @input-input="$emit('change', $event)"
      :formGroupName="formGroupName"
      :gutterBottom="!hideLabel"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'ComputedFormDatatype',
  props: {
    formGroupName: String,
    value: Object,
    cellHeader: Object,
    hideLabel: Boolean
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.computed-form-datatype {
}
</style>
