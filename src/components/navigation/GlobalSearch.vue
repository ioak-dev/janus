<template>
  <div class="global-search desktop-only">
    <oak-select
      size="xsmall"
      fill="container"
      placeholder="Quick Navigation"
      autocompleteVariant="autocomplete"
      :optionsAsKeyValue="globalList"
      @select-change="handleChange"
      :value="currentLink"
    />
  </div>
  <div class="global-jump mobile-only">
    <oak-menu buttonSize="xsmall" buttonTheme="info">
      <div slot="menu-label">
        <font-awesome-icon :icon="['fas', 'search']" />
      </div>
      <div slot="menu-popup">
        <oak-menu-item
          v-for="item in globalList"
          :key="item.id"
          @menu-click="handleChange({ detail: { value: item.id } })"
          >{{ item.value }}</oak-menu-item
        >
      </div>
    </oak-menu>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'GlobalSearch',
  setup() {
    const store = useStore();
    const route = useRoute();
    const profile = computed(() => store.getters.getProfile);
    const tableList = computed(() =>
      store.getters.getTable.map((item: any) => ({
        id: `${store.getters.schemaIdToRef(item.schemaId)}:${item.reference}`,
        value: `${item.name} (table)`
      }))
    );
    const schemaList = computed(() =>
      store.getters.getSchema.map((item: any) => ({
        id: `${item.reference}`,
        value: `${item.name} (schema)`
      }))
    );
    const currentLink = computed(() => {
      let link = '';
      if (route.params.schemaRef) {
        link += route.params.schemaRef;
      }
      if (route.params.tableRef) {
        link += `:${route.params.tableRef}`;
      }
      return link;
    });
    const globalList = computed(() => [...schemaList?.value, ...tableList?.value]);
    return { profile, globalList, currentLink };
  },
  methods: {
    handleChange(event: any) {
      const path = event.detail.value.split(':');
      if (path.length === 1) {
        this.$router.push({
          name: 'ListTableView',
          params: {
            space: this.profile?.space,
            schemaRef: path[0]
          }
        });
      } else {
        this.$router.push({
          name: 'ListRecordView',
          params: {
            space: this.profile?.space,
            schemaRef: path[0],
            tableRef: path[1]
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
