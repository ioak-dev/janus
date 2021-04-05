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
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ActionBar',
  props: {
    selectedRecords: Array
  },
  methods: {
    goToCreate(event: any) {
      this.$router.push(`/${this.profile.space}/schema/${this.$route.params.schemaId}/createtable`);
    }
  },
  setup() {
    const store = useStore();
    const profile = computed(() => store.getters.getProfile);

    return { profile };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
