<template>
  <app-section subtle>
    <div slot>
      <div class="app-action-bar">
        <oak-button theme="primary" variant="regular" @button-click="goToCreate" shape="sharp"
          ><font-awesome-icon :icon="['fas', 'plus']" />Create</oak-button
        >
      </div>
    </div>
  </app-section>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import AppSection from '@/components/ui/AppSection.vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ActionBar',
  props: {
    selectedRecords: Array
  },
  components: { AppSection },
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
