<template>
  <div v-if="cellHeader.datatype === 'text'" class="data-cell">
    <text-form-datatype
      :value="value"
      :cellHeader="cellHeader"
      :formGroupName="formGroupName"
      @change="$emit('change', $event)"
    />
  </div>
  <div v-if="cellHeader.datatype === 'number'" class="data-cell">
    <number-form-datatype
      :value="value"
      :cellHeader="cellHeader"
      :formGroupName="formGroupName"
      @change="$emit('change', $event)"
    />
  </div>
  <div v-if="cellHeader.datatype === 'date'" class="data-cell">
    <date-form-datatype
      :value="value"
      :cellHeader="cellHeader"
      :formGroupName="formGroupName"
      @change="$emit('change', $event)"
    />
  </div>
  <div v-if="cellHeader.datatype === 'list'" class="data-cell">
    <list-form-datatype
      :value="value"
      :cellHeader="cellHeader"
      :formGroupName="formGroupName"
      @change="$emit('change', $event)"
    />
  </div>
  <div v-if="cellHeader.datatype === 'relation'" class="data-cell">
    <relation-form-datatype
      :value="value"
      :cellHeader="cellHeader"
      :rowData="rowData"
      @change="$emit('change', $event)"
    />
  </div>
  <div v-if="cellHeader.datatype === 'computed'" class="data-cell">
    <computed-form-datatype
      :value="value"
      :cellHeader="cellHeader"
      :rowData="rowData"
      :formGroupName="formGroupName"
      @change="$emit('change', $event)"
    />
  </div>
  <div
    v-if="!['text', 'number', 'date', 'list', 'relation', 'computed'].includes(cellHeader.datatype)"
    class="data-cell"
  >
    datatype ({{ cellHeader.datatype }}) not supported
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ListFormDatatype from './ListFormDatatype.vue';
import RelationFormDatatype from './RelationFormDatatype.vue';
import TextFormDatatype from './TextFormDatatype.vue';
import NumberFormDatatype from './NumberFormDatatype.vue';
import DateFormDatatype from './DateFormDatatype.vue';
import ComputedFormDatatype from './ComputedFormDatatype.vue';

export default defineComponent({
  name: 'DatatypeForm',
  components: {
    TextFormDatatype,
    NumberFormDatatype,
    DateFormDatatype,
    RelationFormDatatype,
    ListFormDatatype,
    ComputedFormDatatype
  },
  props: {
    value: Object,
    cellHeader: Object
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
