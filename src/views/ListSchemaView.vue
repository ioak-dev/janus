<template>
  <ListSchema />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListSchema from '@/components/ListSchema/index.vue';

export default defineComponent({
  name: 'ListSchemaView',
  components: {
    ListSchema
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
