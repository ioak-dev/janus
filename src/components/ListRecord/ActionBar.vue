<template>
  <teleport to="#toolbar-left">
    <div class="app-toolbar-action-container">
      <oak-click-area @click-area-click="$emit('create')">
        <div class="app-toolbar-action app-toolbar-action--primary">
          <font-awesome-icon :icon="['fas', 'plus']" />Create
        </div>
      </oak-click-area>
      <oak-click-area v-if="selectedRecords.length === 1" @click-area-click="$emit('clone')">
        <div class="app-toolbar-action app-toolbar-action--primary">
          <font-awesome-icon :icon="['fas', 'clone']" />Clone
        </div>
      </oak-click-area>
      <oak-click-area v-if="selectedRecords.length > 1" @click-area-click="$emit('edit')">
        <div class="app-toolbar-action app-toolbar-action--primary">
          <font-awesome-icon :icon="['fas', 'pencil-alt']" />Bulk edit
        </div>
      </oak-click-area>
      <oak-click-area v-if="selectedRecords.length > 0" @click-area-click="$emit('delete')">
        <div class="app-toolbar-action app-toolbar-action--danger">
          <font-awesome-icon :icon="['fas', 'trash-alt']" />Delete
        </div>
      </oak-click-area>
      <oak-click-area
        v-if="selectedRecords.length > 0 && multiselect"
        @click-area-click="$emit('clear-selection')"
      >
        <div class="app-toolbar-action">
          <font-awesome-icon :icon="['fas', 'times']" />Clear ({{ selectedRecords.length }})
        </div>
      </oak-click-area>
    </div>
  </teleport>
  <teleport to="#toolbar-right">
    <div class="app-toolbar-action-container">
      <div class="record-cound">24 records</div>
      <oak-click-area @click-area-click="$emit('filter')">
        <div class="app-toolbar-action"><font-awesome-icon :icon="['fas', 'filter']" />Filter</div>
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
    multiselect: Boolean
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
