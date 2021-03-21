<template>
  <div v-if="cellHeader.datatype === 'text'" class="data-cell">
    <text-edit-datatype
      :value="value"
      :cellHeader="cellHeader"
      :formGroupName="formGroupName"
      @change="$emit('change', $event)"
    />
  </div>
  <div v-if="cellData?.row && cellHeader.datatype === 'number'" class="data-cell">
    {{ cellData.row[cellHeader.id] }}
  </div>
  <div v-if="cellHeader.datatype === 'list'" class="data-cell">
    <list-edit-datatype
      :value="value"
      :cellHeader="cellHeader"
      :formGroupName="formGroupName"
      @change="$emit('change', $event)"
    />
  </div>
  <div v-if="cellData?.row && cellHeader.datatype === 'relation'" class="data-cell">
    <relation-edit-datatype :cellData="cellData" :cellHeader="cellHeader" />
  </div>
  <div
    v-if="!['text', 'number', 'list', 'relation'].includes(cellHeader.datatype)"
    class="data-cell"
  >
    datatype ({{ cellHeader.datatype }}) not supported
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';
import ListEditDatatype from './ListEditDatatype.vue';
import RelationEditDatatype from './RelationEditDatatype.vue';
import TextEditDatatype from './TextEditDatatype.vue';

export default defineComponent({
  name: 'DatatypeEdit',
  components: { TextEditDatatype, RelationEditDatatype, ListEditDatatype },
  props: {
    formGroupName: String,
    value: Object,
    cellHeader: Object
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.datatype-edit {
}
</style>
