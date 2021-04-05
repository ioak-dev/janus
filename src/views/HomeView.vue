<template>
  <home />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Home from '@/components/Home/index.vue';

export default defineComponent({
  name: 'HomeView',
  components: { Home }
});
</script>
