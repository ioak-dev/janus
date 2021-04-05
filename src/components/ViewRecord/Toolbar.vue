<template>
  <oak-toolbar fillColor="container" borderVariant="both">
    <div slot="left">
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
        <div>JANU-21 ({{ record?.id }})</div>
      </div>
    </div>
    <div slot="right">right side</div>
  </oak-toolbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'Toolbar',
  props: {
    record: Object
  },
  computed: {
    ...mapGetters(['getProfile'])
  },
  methods: {
    goBack() {
      this.$router.back();
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
