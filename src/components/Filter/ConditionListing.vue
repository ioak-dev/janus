<template>
  <div class="condition">
    <div class="condition__header">
      <oak-typography variant="body2">Conditions</oak-typography>
      <oak-button
        theme="default"
        variant="appear"
        shape="sharp"
        size="xsmall"
        @button-click="handleAddCondition"
        ><font-awesome-icon :icon="['fas', 'plus']" />Add</oak-button
      >
    </div>
    <div v-for="(item, index) in conditions" :key="index" class="condition__item">
      <condition
        :condition="item"
        :columns="columns"
        :filters="filters"
        @change="handleConditionChange($event, index)"
        @delete="handleDeleteCondition(index)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { compose as sectionCompose } from '@oakui/core-stage/style-composer/OakSectionComposer';
import Condition from './Condition.vue';

export default defineComponent({
  name: 'ConditionListing',
  components: { Condition },
  props: {
    tableId: String,
    conditions: Array
  },
  setup(props) {
    const store = useStore();
    const columns = computed(() => store.getters.getColumnByTable(props.tableId));
    const filters = computed(() => store.getters.getFilterByTable(props.tableId));
    const state: any = ref({ name: '', search: { operator: 'and', condition: [] }, sort: null });
    const isExtendedFilter = ref(false);

    const conditionSectionStyle = computed(() =>
      sectionCompose({
        outlineColor: 'float',
        elevation: 0,
        fillColor: 'container',
        marginHorizontal: 0,
        marginVertical: 2,
        paddingHorizontal: 2,
        paddingVertical: 2
      })
    );

    return { columns, filters, state, isExtendedFilter, conditionSectionStyle };
  },
  methods: {
    handleChange(event: any) {
      // this.searchCriteria = event.detail.value;
    },
    handleExtendedFilterChange(event: any) {
      this.isExtendedFilter = event.detail.value;
    },
    handleAddCondition() {
      const _conditions = this.conditions ? [...this.conditions] : [];
      this.$emit('change', {
        detail: {
          value: [..._conditions, { extended: false, id: null, value: null }]
        }
      });
    },
    handleConditionChange(event: any, index: number) {
      const _conditions = this.conditions ? [...this.conditions] : [];
      _conditions[index] = event.detail.value;
      this.$emit('change', {
        detail: {
          value: [..._conditions]
        }
      });
    },
    handleDeleteCondition(index: any) {
      this.$emit('change', {
        detail: {
          value: this.conditions?.filter((item: any, localIndex: number) => index !== localIndex)
        }
      });
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.condition {
}
.condition__header {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
}
</style>
