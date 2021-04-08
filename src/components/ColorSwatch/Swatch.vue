<template>
  <div class="swatch">
    <oak-click-area @click-area-click="$emit('change', index)" v-for="index in 98" :key="index">
      <div class="swatch__item" :class="`app-swatch-bg-${index}`">
        <font-awesome-icon v-if="value === index" :icon="['fas', 'check']" />
      </div>
    </oak-click-area>
  </div>
</template>
<script>
import { ref } from 'vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Swatch',
  props: { value: Number }
};
</script>
<style lang="scss" scoped>
.swatch {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  grid-template-columns: repeat(14, 1fr);
  column-gap: 10px;
  row-gap: 10px;
  width: 100%;
}
.swatch__item {
  width: 100%;
  height: 30px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
