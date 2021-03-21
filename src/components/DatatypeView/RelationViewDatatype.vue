<template>
  <div v-if="cellData?.relation" class="relation-view-datatype">
    <oak-link @link-click="goToRecord">
      <oak-typography variant="body2" underline="hover" color="primary">
        {{ cellData?.relation[cellHeader?.id][0]?.row[cellHeader?.meta?.columnId] }}
      </oak-typography>
    </oak-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'RelationViewDatatype',
  computed: {
    ...mapGetters(['getProfile'])
  },
  props: {
    cellData: Object,
    cellHeader: Object
  },
  methods: {
    goToRecord() {
      console.log({
        space: this.getProfile.space,
        id: this.cellHeader?.meta?.tableId,
        rowId: this.cellData?.relation[this.cellHeader?.id][0]._id.toString() || ''
      });
      this.$router.push({
        name: 'ViewTableDataView',
        params: {
          space: this.getProfile.space,
          id: this.cellHeader?.meta?.tableId,
          rowId: this.cellData?.relation[this.cellHeader?.id][0]._id.toString() || ''
        }
      });
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.relation-view-datatype {
}
</style>
