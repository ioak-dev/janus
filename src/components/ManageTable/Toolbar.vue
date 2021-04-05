<template>
  <teleport to="#topbar-left">
    <div class="app-toolbar-action-container">
      <oak-button
        theme="info"
        :variant="dense ? 'regular' : 'block'"
        size="xsmall"
        shape="sharp"
        @button-click="goBack"
      >
        <font-awesome-icon :icon="['fas', 'arrow-left']"
      /></oak-button>
      <div>{{ table?.name }}</div>
      <oak-button
        theme="info"
        :variant="dense ? 'regular' : 'block'"
        size="xsmall"
        shape="sharp"
        @button-click="goToDatagrid"
      >
        <font-awesome-icon :icon="['fas', 'table']"
      /></oak-button>
    </div>
  </teleport>
  <teleport to="#topbar-right">
    <div>right side</div>
  </teleport>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'Toolbar',
  props: {
    table: Object
  },
  computed: {
    ...mapGetters(['getProfile'])
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    goToDatagrid() {
      this.$router.push(
        `/${this.getProfile.space}/schema/${this.$route.params.schemaId}/table/${this.$route.params.tableId}`
      );
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
