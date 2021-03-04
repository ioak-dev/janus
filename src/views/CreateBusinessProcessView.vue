<template>
  <div class="create-business-process-view">
    <CreateBusinessProcess />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CreateBusinessProcess from '@/components/business-process/CreateBusinessProcess.vue';

export default defineComponent({
  name: 'CreateBusinessProcessView',
  components: {
    CreateBusinessProcess
  }
});
</script>
