<template>
  <oak-sheet
    fillColor="global"
    position="right"
    sizeVertical="two-third"
    sizeHorizontal="half"
    :isOpen="isOpen"
    @sheet-close="$emit('close')"
  >
    <create-record
      :tableId="tableId"
      :columnHeaders="columns"
      :record="record"
      :filter="filter"
      @saved="$emit('close')"
      @close="$emit('close')"
    />
  </oak-sheet>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';
import CreateRecord from './CreateRecord.vue';

export default defineComponent({
  components: { CreateRecord },
  name: 'CreateRecordPrompt',
  props: { isOpen: Boolean, tableId: String, record: Object, filter: Object },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['getColumnByTable']),
    columns() {
      return this.getColumnByTable(this.tableId);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
