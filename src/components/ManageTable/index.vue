<template>
  <div class="manage-table">
    <toolbar :table="table" />
    <field-listing v-if="!isEdit" :tableId="$route.params.tableId" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import FieldListing from './FieldListing.vue';
import Toolbar from './Toolbar.vue';

export default defineComponent({
  name: 'ManageTable',
  components: { FieldListing, Toolbar },
  computed: {
    ...mapGetters(['getProfile', 'getTable']),
    table() {
      return this.getTable?.find((item) => item.id === this.$route.params.tableId);
    }
  },
  data() {
    return { isEdit: false };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.manage-table {
}
</style>
