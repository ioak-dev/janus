<template>
  <oak-toolbar fillColor="container" borderVariant="both">
    <div slot="left">
      <div class="app-toolbar-action">
        <oak-button theme="info" variant="block" size="xsmall" shape="sharp" @button-click="goBack">
          <font-awesome-icon :icon="['fas', 'arrow-left']"
        /></oak-button>
        <div>{{ schema?.name }}</div>
      </div>
    </div>
  </oak-toolbar>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Toolbar',
  methods: {
    goBack() {
      this.$router.back();
    }
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const profile = computed(() => store.getters.getProfile);
    const schema = computed(() => store.getters.getSchemaById(route.params.schemaId));
    return { schema, profile };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hide-preview-on-smallscreen {
  @media (max-width: 999px) {
    display: none;
  }
}
</style>
