<template>
  <app-section subtle>
    <div slot>
      <div class="app-action-bar">
        <div>
          <oak-button
            theme="primary"
            :variant="selectedRecords.length > 0 ? 'appear' : 'appear'"
            shape="sharp"
            @button-click="goToCreate"
            ><font-awesome-icon :icon="['fas', 'plus']" />Create</oak-button
          >
          <oak-button
            v-if="selectedRecords.length === 1"
            theme="primary"
            variant="outline"
            shape="sharp"
            @button-click="$emit('edit')"
            ><font-awesome-icon :icon="['fas', 'clone']" />Clone</oak-button
          >
          <oak-button
            v-if="selectedRecords.length === 1"
            theme="primary"
            variant="outline"
            shape="sharp"
            @button-click="$emit('view')"
            ><font-awesome-icon :icon="['fas', 'external-link-alt']" />Open</oak-button
          >
          <oak-button
            v-if="selectedRecords.length > 1"
            theme="primary"
            variant="outline"
            shape="sharp"
            @button-click="$emit('edit')"
            ><font-awesome-icon :icon="['fas', 'pencil-alt']" />Bulk edit</oak-button
          >
          <oak-button
            v-if="selectedRecords.length > 0"
            theme="danger"
            variant="outline"
            shape="sharp"
            @button-click="goToCreate"
            ><font-awesome-icon :icon="['fas', 'trash-alt']" />Delete</oak-button
          >
          <oak-button
            v-if="selectedRecords.length > 0"
            theme="default"
            variant="outline"
            shape="sharp"
            @button-click="$emit('clear-selection')"
            ><font-awesome-icon :icon="['fas', 'times']" />Clear ({{
              selectedRecords.length
            }})</oak-button
          >
        </div>
        <div>
          <oak-button theme="default" variant="outline" shape="sharp" @button-click="goBack">
            <font-awesome-icon :icon="['fas', 'filter']" />
            Filter</oak-button
          >
        </div>
      </div>
    </div>
  </app-section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AppSection from '@/components/ui/AppSection.vue';

export default defineComponent({
  name: 'ActionBar',
  props: {
    selectedRecords: Array
  },
  components: { AppSection },
  methods: {
    goBack() {
      this.$router.back();
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
