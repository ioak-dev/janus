<template>
  <div class="process-view">
    <BusinessProcess />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BusinessProcess from '@/components/business-process/index.vue';

export default defineComponent({
  name: 'ProcessView',
  components: {
    BusinessProcess
  }
});
</script>
