<template>
  <div class="color-swatch">
    <div v-if="label" class="color-swatch__label">{{ label }}</div>
    <div class="color-swatch__container">
      <oak-click-area @click-area-click="openDialog">
        <div class="color-swatch__value" :class="`app-swatch-bg-${value}`" />
      </oak-click-area>
    </div>
  </div>
  <oak-sheet :isOpen="isDialogOpen" @sheet-close="closeDialog">
    <swatch @change="handleChange" :value="value" />
  </oak-sheet>
</template>
<script>
import { ref } from 'vue';
import Swatch from './Swatch.vue';

export default {
  name: 'ColorSwatch',
  components: { Swatch },
  props: { label: String, name: String, value: String },
  setup() {
    const isDialogOpen = ref(false);

    return { isDialogOpen };
  },
  methods: {
    openDialog() {
      this.isDialogOpen = true;
    },
    closeDialog() {
      this.isDialogOpen = false;
    },
    handleChange(value) {
      this.$emit('change', {
        detail: {
          name: this.name,
          value
        }
      });
      this.closeDialog();
    }
  }
};
</script>
<style lang="scss" scoped>
.color-swatch {
  margin-bottom: 10px;
}
.color-swatch__label {
  margin-bottom: 4px;
}
.color-swatch__container {
  display: flex;
  justify-content: flex-start;
}
.color-swatch__value {
  height: 26px;
  width: 40px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
