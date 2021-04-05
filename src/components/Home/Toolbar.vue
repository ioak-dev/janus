<template>
  <teleport to="#topbar-left">Janus</teleport>
  <teleport to="#toolbar-left">Choose space realm</teleport>
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
