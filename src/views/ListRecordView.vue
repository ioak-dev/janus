<template>
  <list-record />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListRecord from '@/components/ListRecord/index.vue';

export default defineComponent({
  name: 'ListRecordView',
  components: {
    ListRecord
  }
});
</script>
<style scoped lang="scss"></style>
