<template>
  <div class="manage-table">
    manage table
    <field-listing :tableId="$route.params.tableId" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import FieldListing from './FieldListing.vue';

export default defineComponent({
  name: 'ManageTable',
  components: { FieldListing },
  computed: {
    ...mapGetters(['getProfile'])
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.manage-table {
}
</style>
