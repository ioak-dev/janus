<template>
  <div class="icon-swatch">
    <div v-if="label" class="icon-swatch__label">{{ label }}</div>
    <div class="icon-swatch__container">
      <oak-click-area @click-area-click="openDialog">
        <div class="icon-swatch__value">
          <font-awesome-icon :icon="value" v-if="showIcon" />
        </div>
      </oak-click-area>
    </div>
  </div>
  <oak-sheet :isOpen="isDialogOpen" @sheet-close="closeDialog">
    <div class="icon-swatch__sheet">
      <oak-input
        v-if="!showAll"
        name="searchText"
        :value="searchText"
        placeholder="Type a keyword to search"
        @input-input="handleSearchTextChange"
        gutterBottom
      />
      <oak-checkbox @input-change="toggleShowAll" :value="showAll">Show all (slow)</oak-checkbox>
      <swatch
        v-if="isDialogOpen"
        @change="handleChange"
        :value="value"
        :searchText="searchText"
        :showAll="showAll"
      />
    </div>
  </oak-sheet>
</template>
<script>
import { ref } from 'vue';
import Swatch from './Swatch.vue';
// import Fa from './Fa.json';

export default {
  name: 'IconSwatch',
  components: { Swatch },
  props: { label: String, name: String, value: Array },
  mounted() {
    // console.log('********Reading Fa.json');
    // console.log(Fa);
    // const faList = [];
    // Object.keys(Fa).forEach((item) => {
    //   Fa[item].styles.forEach((style) => {
    //     switch (style) {
    //       case 'brands':
    //         faList.push(['fab', item]);
    //         break;
    //       case 'solid':
    //         faList.push(['fas', item]);
    //         break;
    //       case 'regular':
    //         faList.push(['fa', item]);
    //         break;
    //       default:
    //         break;
    //     }
    //   });
    // });
    // console.log(faList);
  },
  setup() {
    const searchText = ref('');
    const isDialogOpen = ref(false);
    const showIcon = ref(true);
    const showAll = ref(false);

    return { isDialogOpen, searchText, showIcon, showAll };
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
    },
    handleSearchTextChange(event) {
      this.searchText = event.detail.value;
    },
    toggleShowAll(event) {
      this.showAll = event.detail.value;
    }
  },
  watch: {
    value() {
      this.showIcon = false;
      setTimeout(() => {
        this.showIcon = true;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.icon-swatch {
  margin-bottom: 10px;
}
.icon-swatch__sheet {
  width: 100%;
}
.icon-swatch__label {
  margin-bottom: 4px;
}
.icon-swatch__container {
  display: flex;
  justify-content: flex-start;
}
.icon-swatch__value {
  height: 30px;
  width: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
