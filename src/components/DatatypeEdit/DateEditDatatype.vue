<template>
  <div class="date-edit-datatype">
    <oak-input
      type="date"
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
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'DateEditDatatype',
  props: {
    formGroupName: String,
    value: Object,
    cellHeader: Object
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.date-edit-datatype {
}
</style>
