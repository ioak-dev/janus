<template>
  <oak-sheet
    fillColor="global"
    position="right"
    sizeVertical="two-third"
    sizeHorizontal="half"
    :isOpen="isOpen"
    @sheet-close="$emit('close')"
  >
    <div class="filter-prompt">
      <action-bar @save="handleSubmit" @close="$emit('close')" />
      <filter-listing :tableId="tableId" @close="$emit('close')" />
    </div>
  </oak-sheet>
</template>

<script>
import { computed, defineComponent, inject, ref } from 'vue';
import { mapGetters, useStore } from 'vuex';
import FilterListing from './FilterListing.vue';
import ActionBar from './ActionBar.vue';

export default defineComponent({
  components: { FilterListing, ActionBar },
  name: 'FilterPrompt',
  props: { isOpen: Boolean, tableId: String },
  setup(props) {
    const store = useStore();
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.filter-prompt {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
