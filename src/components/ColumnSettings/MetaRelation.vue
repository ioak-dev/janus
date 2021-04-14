<template>
  <oak-select
    fill="global"
    name="tableId"
    label="Table"
    :value="meta.tableId"
    :optionsAsKeyValue="tableList"
    @select-input="handleChange"
    autocompleteVariant="none"
    gutterBottom
  />
  <oak-select
    fill="global"
    name="columnId"
    label="Column"
    :value="meta.columnId"
    :optionsAsKeyValue="columnList"
    @select-input="handleChange"
    autocompleteVariant="none"
    gutterBottom
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'MetaRelation',
  props: {
    meta: Object
  },
  methods: {
    handleChange(event: any) {
      return this.$emit('meta-change', {
        detail: {
          name: 'meta',
          value: {
            ...this.meta,
            [event.detail.name]: event.detail.value
          }
        }
      });
    }
  },
  setup(props) {
    const store = useStore();
    const tables = computed(() => store.getters.getTableInCurrentSchema);
    const tableList = computed(() =>
      tables.value?.map((item: any) => ({ id: item.id, value: item.name }))
    );
    const columns = computed(() => store.getters.getColumnByTable(props.meta?.tableId));
    const columnList = computed(() =>
      columns.value?.map((item: any) => ({ id: item.id, value: item.name }))
    );
    return { columns, columnList, tables, tableList };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.meta-options__title {
  margin-bottom: 10px;
  // font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.meta-options__choices {
  // margin-left: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  row-gap: 10px;
  column-gap: 10px;
}
.meta-options__choices__item {
  border: 1px solid var(--global-border-color);
  padding: 10px 10px;
  background-color: var(--color-float);
}
</style>
