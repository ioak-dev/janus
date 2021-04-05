<template>
  <toolbar />
  <div class="home">
    <space-listing />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { compose as dividerCompose } from '@oakui/core-stage/style-composer/OakDividerComposer';
import { useRoute } from 'vue-router';
import Toolbar from './Toolbar.vue';
import SpaceListing from './SpaceListing.vue';

export default defineComponent({
  name: 'Home',
  components: { Toolbar, SpaceListing },
  setup() {
    const route = useRoute();
    const store = useStore();
    const tables = computed(() => store.getters.getTableBySchema(route.params.schemaId));
    const profile = computed(() => store.getters.getProfile);

    const dividerStyle = computed(() => dividerCompose({ color: 'global', colorMode: 'darker' }));
    return { tables, profile, dividerStyle };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
