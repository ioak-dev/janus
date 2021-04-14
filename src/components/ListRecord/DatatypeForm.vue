<template>
  <div v-if="cellHeader.datatype === 'text'" class="data-cell">
    <text-form-datatype
      :hideLabel="hideLabel"
      :value="value"
      :cellHeader="cellHeader"
      :formGroupName="formGroupName"
      @change="$emit('change', $event)"
    />
  </div>
  <div v-if="cellHeader.datatype === 'number'" class="data-cell">
    <number-form-datatype
      :hideLabel="hideLabel"
      :value="value"
      :cellHeader="cellHeader"
      :formGroupName="formGroupName"
      @change="$emit('change', $event)"
    />
  </div>
  <div v-if="cellHeader.datatype === 'date'" class="data-cell">
    <date-form-datatype
      :hideLabel="hideLabel"
      :value="value"
      :cellHeader="cellHeader"
      :formGroupName="formGroupName"
      @change="$emit('change', $event)"
    />
  </div>
  <div v-if="cellHeader.datatype === 'list'" class="data-cell">
    <list-form-datatype
      :hideLabel="hideLabel"
      :value="value"
      :cellHeader="cellHeader"
      :formGroupName="formGroupName"
      @change="$emit('change', $event)"
    />
  </div>
  <div v-if="cellHeader.datatype === 'relation'" class="data-cell">
    <relation-form-datatype
      :hideLabel="hideLabel"
      :value="value"
      :cellHeader="cellHeader"
      :rowData="rowData"
      @change="$emit('change', $event)"
    />
  </div>
  <div v-if="cellHeader.datatype === 'computed'" class="data-cell">
    <computed-form-datatype
      :hideLabel="hideLabel"
      :value="value"
      :cellHeader="cellHeader"
      :rowData="rowData"
      :formGroupName="formGroupName"
      @change="$emit('change', $event)"
    />
  </div>
  <div
    v-if="!['text', 'number', 'list', 'relation', 'computed'].includes(cellHeader.datatype)"
    class="data-cell"
  >
    datatype ({{ cellHeader.datatype }}) not supported
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ListFormDatatype from '@/components/DatatypeForm/ListFormDatatype.vue';
import RelationFormDatatype from '@/components/DatatypeForm/RelationFormDatatype.vue';
import TextFormDatatype from '@/components/DatatypeForm/TextFormDatatype.vue';
import NumberFormDatatype from '@/components/DatatypeForm/NumberFormDatatype.vue';
import ComputedFormDatatype from '@/components/DatatypeForm/ComputedFormDatatype.vue';
import DateFormDatatype from '../DatatypeForm/DateFormDatatype.vue';

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
    hideLabel: Boolean,
    value: Object,
    cellHeader: Object,
    formGroupName: String
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.data-cell {
  width: 100%;
}
</style>
