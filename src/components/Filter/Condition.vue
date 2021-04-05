<template>
  <div class="condition__item" :class="conditionSectionStyle">
    <div class="condition__item__header">
      <oak-checkbox
        name="extended"
        :value="condition.extended"
        size="small"
        @input-change="handleExtendedFilterChange"
        >Extends another filter
      </oak-checkbox>
      <oak-click-area @click-area-click="$emit('delete')">
        <div class="condition__item__header__delete">
          <font-awesome-icon :icon="['fas', 'times']" />
        </div>
      </oak-click-area>
    </div>
    <oak-select
      v-if="condition.extended"
      name="id"
      fill="container"
      label="Filter name"
      :value="condition.id"
      :optionsAsKeyValue="filterList"
      size="small"
      @select-change="handleChange"
      gutterBottom="true"
    />
    <oak-select
      v-else
      name="id"
      fill="container"
      label="Column name"
      :value="condition.id"
      :optionsAsKeyValue="columnList"
      size="small"
      @select-change="handleChange"
      gutterBottom="true"
    />
    <datatype-form
      v-if="chosenColumn"
      :value="condition.value"
      :cellHeader="chosenColumn"
      @change="handleValueChange"
      formGroupName="filter-form"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { compose as sectionCompose } from '@oakui/core-stage/style-composer/OakSectionComposer';
import DatatypeForm from '@/components/DatatypeForm/index.vue';

export default defineComponent({
  name: 'Condition',
  components: { DatatypeForm },
  props: {
    tableId: String,
    condition: Object,
    columns: Array,
    filters: Array
  },
  setup(props) {
    const store = useStore();
    const state: any = ref({ name: '', search: { operator: 'and', condition: [] }, sort: null });
    const isExtendedFilter = ref(false);

    const columnList = computed(() =>
      props.columns?.map((item: any) => {
        return { id: item.id, value: item.name };
      })
    );
    const filterList = computed(() =>
      props.filters?.map((item: any) => {
        return { id: item.id, value: item.name };
      })
    );

    const chosenColumn = computed(() =>
      props.columns?.find((item: any) => item.id === props.condition?.id)
    );

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

    return { columnList, filterList, chosenColumn, state, isExtendedFilter, conditionSectionStyle };
  },
  methods: {
    handleChange(event: any) {
      this.emitChange({ [event.detail.name]: event.detail.value });
    },
    handleValueChange(event: any) {
      this.emitChange({ value: event.detail.value });
    },
    emitChange(changes: any) {
      this.$emit('change', {
        detail: {
          value: {
            ...this.condition,
            ...changes
          }
        }
      });
    },
    handleExtendedFilterChange(event: any) {
      this.emitChange({ id: null, value: null, [event.detail.name]: event.detail.value });
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
.condition__item__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.condition__item__header__delete {
  cursor: pointer;
  // color: var(--color-danger);
  transition: color 250ms ease-in-out;
  &:hover {
    color: var(--color-danger-darker);
  }
}
</style>
