<template>
  <div v-if="cellHeader.datatype === 'text'" class="data-cell">
    <text-edit-datatype
      :value="value"
      :cellHeader="cellHeader"
      :formGroupName="formGroupName"
      @change="$emit('change', $event)"
    />
  </div>
  <div v-if="cellHeader.datatype === 'number'" class="data-cell">
    <number-edit-datatype
      :value="value"
      :cellHeader="cellHeader"
      :formGroupName="formGroupName"
      @change="$emit('change', $event)"
    />
  </div>
  <div v-if="cellHeader.datatype === 'date'" class="data-cell">
    <date-edit-datatype
      :value="value"
      :cellHeader="cellHeader"
      :formGroupName="formGroupName"
      @change="$emit('change', $event)"
    />
  </div>
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
      :formGroupName="formGroupName"
      @change="$emit('change', $event)"
    />
  </div>
  <div v-if="cellHeader.datatype === 'user'" class="data-cell">
    <user-edit-datatype
      :value="value"
      :cellHeader="cellHeader"
      :rowData="rowData"
      :formGroupName="formGroupName"
      @change="$emit('change', $event)"
    />
  </div>
  <div v-if="cellHeader.datatype === 'percentage'" class="data-cell">
    <percentage-edit-datatype
      :value="value"
      :cellHeader="cellHeader"
      :rowData="rowData"
      :formGroupName="formGroupName"
      @change="$emit('change', $event)"
    />
  </div>
  <div
    v-if="
      !['text', 'number', 'date', 'list', 'relation', 'user', 'percentage', 'computed'].includes(
        cellHeader.datatype
      )
    "
    class="data-cell"
  >
    datatype ({{ cellHeader.datatype }}) not supported
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ListEditDatatype from './ListEditDatatype.vue';
import RelationEditDatatype from './RelationEditDatatype.vue';
import TextEditDatatype from './TextEditDatatype.vue';
import NumberEditDatatype from './NumberEditDatatype.vue';
import DateEditDatatype from './DateEditDatatype.vue';
import UserEditDatatype from './UserEditDatatype.vue';
import PercentageEditDatatype from './PercentageEditDatatype.vue';

export default defineComponent({
  name: 'DatatypeEdit',
  components: {
    TextEditDatatype,
    NumberEditDatatype,
    DateEditDatatype,
    RelationEditDatatype,
    ListEditDatatype,
    UserEditDatatype,
    PercentageEditDatatype
  },
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
