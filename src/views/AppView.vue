<template>
  <div class="process-view">
    <App />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import App from '@/components/app/index.vue';

export default defineComponent({
  name: 'AppView',
  components: {
    App
  }
});
</script>
