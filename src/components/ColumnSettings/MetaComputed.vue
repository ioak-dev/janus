<template>
  <div class="meta-computed-variables">
    <div class="meta-computed__title">
      <div>Variables</div>
      <oak-button
        theme="primary"
        variant="regular"
        @button-click="newVariable"
        shape="sharp"
        size="xsmall"
        >New variable</oak-button
      >
    </div>
    <div class="meta-computed__choices" v-if="meta">
      <div
        class="meta-computed__choices__item"
        v-for="(variable, index) in meta.variables"
        :key="index"
      >
        <oak-input
          color="global"
          name="name"
          label="Variable name"
          :value="variable.name"
          @input-input="handleChange($event, variable, index)"
          autocompleteVariant="none"
          gutterBottom
        />
        <oak-select
          color="global"
          name="tableId"
          label="Table"
          :value="variable.tableId"
          :optionsAsKeyValue="tableList"
          @select-input="handleChange($event, variable, index)"
          autocompleteVariant="none"
          gutterBottom
        />
        <oak-select
          color="global"
          name="columnId"
          label="Column"
          :value="variable.columnId"
          :optionsAsKeyValue="columnMap[variable.tableId]"
          @select-input="handleChange($event, variable, index)"
          autocompleteVariant="none"
          gutterBottom
        />
      </div>
    </div>
  </div>
  <div class="meta-computed-template">
    <oak-input
      color="global"
      @input-input="handleTemplateChange"
      label="Template"
      name="template"
      :value="meta.template"
    />
  </div>
</template>

<script lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'MetaComputed',
  props: {
    meta: Object
  },
  methods: {
    handleChange(event: any, variable: any, index: number) {
      const variables = this.meta?.variables ? [...(this.meta?.variables || [])] : [];
      variables[index] = { ...variable, [event.detail.name]: event.detail.value };
      this.emitChangeEvent('variables', variables);
    },
    deleteOption(index: number) {
      this.emitChangeEvent(
        'variables',
        this.meta?.options?.filter((_: any, indexLocal: number) => index !== indexLocal)
      );
    },
    newVariable() {
      if (this.meta?.variables) {
        this.emitChangeEvent('variables', [...this.meta.variables, {}]);
      } else {
        this.emitChangeEvent('variables', [{}]);
      }
    },
    handleTemplateChange(event: any) {
      this.emitChangeEvent(event.detail.name, event.detail.value);
    },
    emitChangeEvent(name: string, value: any) {
      return this.$emit('meta-change', {
        detail: {
          name: 'meta',
          value: {
            ...this.meta,
            [name]: value
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
    const columns = computed(() => store.getters.getColumn);
    const columnMap = computed(() => {
      const _columnMap: any = {};
      if (!columns.value) {
        return _columnMap;
      }
      columns.value.forEach((item: any) => {
        if (!_columnMap[item.tableId]) {
          _columnMap[item.tableId] = [];
        }
        _columnMap[item.tableId].push({ id: item.id, value: item.name });
      });
      return _columnMap;
    });
    return { columns, columnMap, tables, tableList };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.meta-computed-variables {
  margin-bottom: 10px;
}
.meta-computed__title {
  margin-bottom: 10px;
  // font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.meta-computed__choices {
  // margin-left: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  row-gap: 10px;
  column-gap: 10px;
}
.meta-computed__choices__item {
  border: 1px solid var(--global-border-color);
  padding: 10px 10px;
  background-color: var(--color-float);
}
</style>
