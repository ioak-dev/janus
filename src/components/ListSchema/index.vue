<template>
  <teleport to="#toolbar-left">
    <div>
      <oak-click-area @click-area-click="goToCreate">
        <div class="app-toolbar-action app-toolbar-action--primary">
          <font-awesome-icon :icon="['fas', 'plus']" />Create
        </div>
      </oak-click-area>
    </div>
  </teleport>
  <div class="list-schema">
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
