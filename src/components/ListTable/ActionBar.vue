<template>
  <teleport to="#toolbar-left">
    <div class="app-toolbar-action-container">
      <oak-click-area @click-area-click="$emit('create')">
        <div
          class="app-toolbar-action"
          :class="`${sidepaneContent === 'create' ? 'app-toolbar-action--active' : ''}`"
        >
          <font-awesome-icon :icon="['fas', 'plus']" />
          <div class="desktop-only">Create</div>
        </div>
      </oak-click-area>
      <oak-click-area v-if="selectedTables.length === 1" @click-area-click="$emit('clone')">
        <div
          class="app-toolbar-action"
          :class="`${sidepaneContent === 'clone' ? 'app-toolbar-action--active' : ''}`"
        >
          <font-awesome-icon :icon="['fas', 'clone']" />
          <div class="desktop-only">Clone</div>
        </div>
      </oak-click-area>
      <oak-click-area v-if="selectedTables.length === 1" @click-area-click="$emit('edit')">
        <div
          class="app-toolbar-action"
          :class="`${sidepaneContent === 'edit' ? 'app-toolbar-action--active' : ''}`"
        >
          <font-awesome-icon :icon="['fas', 'pencil-alt']" />
          <div class="desktop-only">Edit</div>
        </div>
      </oak-click-area>

      <oak-click-area v-if="selectedTables?.length > 0" @click-area-click="$emit('delete')">
        <div
          class="app-toolbar-action"
          :class="`${sidepaneContent === 'delete' ? 'app-toolbar-action--active' : ''}`"
        >
          <font-awesome-icon :icon="['fas', 'trash-alt']" />
          <div class="desktop-only">Delete</div>
        </div>
      </oak-click-area>
      <oak-click-area
        v-if="selectedTables?.length > 0"
        @click-area-click="$emit('clear-selection')"
      >
        <div class="app-toolbar-action">
          <font-awesome-icon :icon="['fas', 'times']" />
          <div class="desktop-only">Clear ({{ selectedTables?.length }})</div>
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
    selectedTables: Array,
    sidepaneContent: String
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
