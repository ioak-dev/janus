<template>
  <div class="swatch">
    <oak-click-area @click-area-click="$emit('change', icon)" v-for="icon in iconsList" :key="icon">
      <div class="swatch__item">
        <font-awesome-icon :icon="icon" />
      </div>
    </oak-click-area>
  </div>
</template>
<script>
import { computed, ref } from 'vue';
import { mapGetters, useStore } from 'vuex';

export default {
  name: 'Swatch',
  props: { searchText: String, showAll: Boolean },
  setup(props) {
    const store = useStore();
    const iconsList = computed(() => {
      if (props.showAll) {
        return store.getters.getIcon;
      }
      if (props.searchText?.length < 3) {
        return [];
      }
      return store.getters.getIcon.filter(
        (item) => item[1].replaceAll('-', ' ').indexOf(props.searchText.toLowerCase()) !== -1
      );
    });
    return { iconsList };
  }
};
</script>
<style lang="scss" scoped>
.swatch {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.swatch__item {
  padding: 10px;
  font-size: 20px;
  // width: 100%;
  // height: 30px;
  // border-radius: 4px;
  // display: flex;
  // justify-content: center;
  // align-items: center;
}
</style>
