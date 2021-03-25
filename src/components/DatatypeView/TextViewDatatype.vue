<template>
  <div class="text-view-datatype">{{ rowData?.row[cellHeader?.id] }}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'TextViewDatatype',
  props: {
    rowData: Object,
    cellHeader: Object
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.text-view-datatype {
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
