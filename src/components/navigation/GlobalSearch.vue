<template>
  <div class="global-search">
    <oak-select
      size="xsmall"
      fill="container"
      placeholder="Quick Navigation"
      autocompleteVariant="autocomplete"
      :optionsAsKeyValue="globalList"
      @select-change="handleChange"
      value=""
    />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'GlobalSearch',
  setup() {
    const store = useStore();
    const profile = computed(() => store.getters.getProfile);
    const tableList = computed(() =>
      store.getters.getTable.map((item: any) => ({
        id: `${item.schemaId}:${item.id}`,
        value: `${item.name} (table)`
      }))
    );
    const schemaList = computed(() =>
      store.getters.getSchema.map((item: any) => ({
        id: `${item.id}`,
        value: `${item.name} (schema)`
      }))
    );
    const globalList = computed(() => [...schemaList?.value, ...tableList?.value]);
    return { profile, globalList };
  },
  methods: {
    handleChange(event: any) {
      const path = event.detail.value.split(':');
      if (path.length === 1) {
        this.$router.push({
          name: 'ListTableView',
          params: {
            space: this.profile?.space,
            schemaId: path[0]
          }
        });
      } else {
        this.$router.push({
          name: 'ListRecordView',
          params: {
            space: this.profile?.space,
            schemaId: path[0],
            tableId: path[1]
          }
        });
      }
    }
  }
});
</script>
<style lang="scss" scoped>
.theme {
  user-select: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0px 10px;
  .action-icon {
    cursor: pointer;
  }
}
</style>
