<template>
  <div v-if="cellHeader.datatype === 'text'" class="data-cell">
    <text-edit-datatype
      :value="value"
      :cellHeader="cellHeader"
      :formGroupName="formGroupName"
      @change="$emit('change', $event)"
    />
  </div>
  <!-- <div v-if="cellHeader.datatype === 'number'" class="data-cell">
    {{ value }}
  </div> -->
  <div v-if="cellHeader.datatype === 'list'" class="data-cell">
    <list-edit-datatype
      :value="value"
      :cellHeader="cellHeader"
      :formGroupName="formGroupName"
      @change="$emit('change', $event)"
    />
  </div>
  <div v-if="cellHeader.datatype === 'relation'" class="data-cell">
    <relation-edit-datatype
      :value="value"
      :cellHeader="cellHeader"
      :rowData="rowData"
      @change="$emit('change', $event)"
    />
  </div>
  <div v-if="cellHeader.datatype === 'user'" class="data-cell">
    <user-edit-datatype
      :value="value"
      :cellHeader="cellHeader"
      :rowData="rowData"
      @change="$emit('change', $event)"
    />
  </div>
  <div v-if="!['text', 'list', 'relation', 'user'].includes(cellHeader.datatype)" class="data-cell">
    datatype ({{ cellHeader.datatype }}) not supported
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';
import ListEditDatatype from './ListEditDatatype.vue';
import RelationEditDatatype from './RelationEditDatatype.vue';
import TextEditDatatype from './TextEditDatatype.vue';
import UserEditDatatype from './UserEditDatatype.vue';

export default defineComponent({
  name: 'DatatypeEdit',
  components: { TextEditDatatype, RelationEditDatatype, ListEditDatatype, UserEditDatatype },
  props: {
    formGroupName: String,
    value: Object,
    cellHeader: Object,
    rowData: Object
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.datatype-edit {
}
</style>
