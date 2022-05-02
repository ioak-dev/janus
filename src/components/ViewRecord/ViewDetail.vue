<template>
  <action-bar-view :openEdit="openEdit" />
  <app-section>
    <div>
      <div class="view-record-detail">
        <div
          class="view-record-detail__item"
          v-for="(column, index) in columnHeaders"
          :key="`${column.id}-${index}`"
        >
          <div class="view-record-detail__item__label">{{ column.name }}</div>
          <div class="view-record-detail__item__value">
            <datatype-view :rowData="rowData" :cellHeader="column" />
          </div>
        </div>
      </div>
    </div>
  </app-section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AppSection from '@/components/ui/AppSection.vue';
import DatatypeView from '../DatatypeView/index.vue';
import ActionBarView from './ActionBarView.vue';

export default defineComponent({
  name: 'ViewDetail',
  components: {
    DatatypeView,
    AppSection,
    ActionBarView
  },
  props: {
    columnHeaders: Array,
    rowData: Object,
    openEdit: Function
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.view-record-detail {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-content: flex-start;
  column-gap: 20px;
  row-gap: 20px;
  font-size: 14px;
}
.view-record-detail__item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  // background-color: var(--color-container);
  // padding: 10px 0;
  border-radius: 4px;
}
.view-record-detail__item__label {
  font-weight: 600;
}
.view-record-detail__item__value {
}
</style>
