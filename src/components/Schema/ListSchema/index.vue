<template>
  <div class="list-schema">
    <oak-form-actions-container align="left">
      <oak-button theme="primary" variant="regular" shape="sharp" @button-click="goToCreate"
        >Create</oak-button
      >
    </oak-form-actions-container>
    <oak-typography variant="h5">List of Schemas</oak-typography>
    <schema-listing />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import SchemaListing from './SchemaListing.vue';

export default defineComponent({
  name: 'ListSchema',
  components: {
    SchemaListing
  },
  computed: {
    ...mapGetters(['getProfile'])
  },
  methods: {
    goToCreate(event: any) {
      this.$router.push(`/${this.getProfile.space}/schema/create`);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list-schema {
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  text-align: left;
  gap: 20px;
}
</style>
