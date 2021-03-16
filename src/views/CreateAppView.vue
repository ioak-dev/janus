<template>
  <div class="create-app-view">
    <CreateApp />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CreateApp from '@/components/app/CreateApp.vue';

export default defineComponent({
  name: 'CreateAppView',
  components: {
    CreateApp
  }
});
</script>
