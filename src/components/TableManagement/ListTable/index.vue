<template>
  <div class="list-table">
    <oak-form-actions-container align="left">
      <oak-button theme="primary" variant="regular" @button-click="goToCreate">Create</oak-button>
    </oak-form-actions-container>
    <oak-typography variant="h5">Apps list</oak-typography>
    <table-listing />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import TableListing from './TableListing.vue';

export default defineComponent({
  name: 'ListTable',
  components: {
    TableListing
  },
  computed: {
    ...mapGetters(['getProfile'])
  },
  methods: {
    goToCreate(event: any) {
      this.$router.push(`/${this.getProfile.space}/table-management/create`);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list-table {
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  text-align: left;
  gap: 20px;
}
</style>
