<template>
  <div class="user-table-datatype">
    <user-view-datatype :rowData="rowData" :cellHeader="cellHeader" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';
import UserViewDatatype from '@/components/DatatypeView/UserViewDatatype.vue';

export default defineComponent({
  components: { UserViewDatatype },
  name: 'UserTableDatatype',
  props: {
    rowData: Object,
    cellHeader: Object
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.user-table-datatype {
  white-space: normal;
  min-width: 100px;
  max-width: 200px;
  // text-overflow: ellipsis;
  // overflow: hidden;
  // min-width: 100px;
  // max-width: 200px;
  // white-space: normal;
}
</style>
