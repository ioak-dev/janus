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
      <oak-click-area v-if="selectedRecords.length === 1" @click-area-click="$emit('clone')">
        <div
          class="app-toolbar-action"
          :class="`${sidepaneContent === 'clone' ? 'app-toolbar-action--active' : ''}`"
        >
          <font-awesome-icon :icon="['fas', 'clone']" />
          <div class="desktop-only">Clone</div>
        </div>
      </oak-click-area>
      <oak-click-area v-if="selectedRecords.length === 1" @click-area-click="$emit('edit')">
        <div
          class="app-toolbar-action"
          :class="`${sidepaneContent === 'edit' ? 'app-toolbar-action--active' : ''}`"
        >
          <font-awesome-icon :icon="['fas', 'pencil-alt']" />
          <div class="desktop-only">Edit</div>
        </div>
      </oak-click-area>
      <oak-click-area v-if="selectedRecords.length > 1" @click-area-click="$emit('bulkedit')">
        <div
          class="app-toolbar-action"
          :class="`${sidepaneContent === 'bulkedit' ? 'app-toolbar-action--active' : ''}`"
        >
          <font-awesome-icon :icon="['fas', 'pencil-alt']" />
          <div class="desktop-only">Bulk edit</div>
        </div>
      </oak-click-area>
      <oak-click-area v-if="selectedRecords.length > 0" @click-area-click="$emit('delete')">
        <div class="app-toolbar-action">
          <font-awesome-icon :icon="['fas', 'trash-alt']" />
          <div class="desktop-only">Delete</div>
        </div>
      </oak-click-area>
      <oak-click-area
        v-if="selectedRecords.length > 0 && multiselect"
        @click-area-click="$emit('clear-selection')"
      >
        <div class="app-toolbar-action">
          <font-awesome-icon :icon="['fas', 'times']" />
          <div class="desktop-only">Clear ({{ selectedRecords.length }})</div>
        </div>
      </oak-click-area>
    </div>
  </teleport>
  <teleport to="#toolbar-right">
    <div class="app-toolbar-action-container">
      <oak-click-area @click-area-click="$emit('settings')">
        <div
          class="app-toolbar-action"
          :class="`${sidepaneContent === 'settings' ? 'app-toolbar-action--active' : ''}`"
        >
          <font-awesome-icon :icon="['fas', 'cogs']" />
        </div>
      </oak-click-area>
      <oak-click-area @click-area-click="$emit('activity')">
        <div
          class="app-toolbar-action"
          :class="`${sidepaneContent === 'activity' ? 'app-toolbar-action--active' : ''}`"
        >
          <font-awesome-icon :icon="['fas', 'rss']" />
        </div>
      </oak-click-area>
      <oak-click-area @click-area-click="$emit('filter')">
        <div
          class="app-toolbar-action"
          :class="`${sidepaneContent === 'filter' ? 'app-toolbar-action--active' : ''}`"
        >
          <font-awesome-icon :icon="['fas', 'filter']" />
        </div>
      </oak-click-area>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ActionBar',
  props: {
    selectedRecords: Array,
    multiselect: Boolean,
    sidepaneContent: String
  },
  methods: {
    goBack() {
      this.$router.back();
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.record-cound {
  font-size: 12px;
}
</style>
