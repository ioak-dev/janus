<template>
  <div class="table-listing">
    <div class="table-listing__search">
      <oak-input
        name="search"
        :value="searchText"
        @input-input="handleSearchChange"
        placeholder="Type to search"
        class="table-listing__search__input"
        fill="container"
      />
    </div>
    <div class="table-listing__list">
      <div v-for="table in tables" :key="table.id" class="table-listing__list__item">
        <oak-click-area @click-area-click="goToTable(table.id)">
          <div class="table-listing__list__item__left">
            <div class="table-listing__list__item__left__heading">
              <div>{{ table.name }}</div>
            </div>
            <div class="table-listing__list__item__left__description">
              {{ table.description }}
            </div>
          </div></oak-click-area
        >
        <div class="table-listing__list__item__right">
          <oak-checkbox
            :value="selectedTables.includes(table.id)"
            :name="table.id"
            @input-change="$emit('change-selection', $event)"
            color="primary"
          ></oak-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'ListTable',
  props: { selectedTables: Array },
  methods: {
    goToTable(tableId: string) {
      this.$router.push(
        `/${this.profile.space}/schema/${this.$route.params.schemaId}/table/${tableId}`
      );
    },
    handleSearchChange(event: any) {
      this.searchText = event.detail.value;
    }
  },
  setup() {
    const searchText = ref('');
    const route = useRoute();
    const store = useStore();
    const tables = computed(() =>
      store.getters
        .getTableBySchema(route.params.schemaId)
        ?.filter(
          (item: any) =>
            item.name.toLowerCase().includes(searchText?.value?.toLowerCase()) ||
            item.description.toLowerCase().includes(searchText?.value?.toLowerCase())
        )
    );
    const profile = computed(() => store.getters.getProfile);

    return { tables, profile, searchText };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.table-listing {
  display: grid;
  grid-auto-flow: row;
  margin: 10px;
}

.table-listing__list {
  display: grid;
  grid-auto-flow: row;
  row-gap: 10px;
}

.table-listing__list__item__left {
  background-color: var(--color-container);
  padding: 10px 10px;
}

.table-listing__search {
  width: 400px;
  max-width: calc(100vw - 20px);
  margin-bottom: 20px;
}
.table-listing__list__item {
  display: grid;
  grid-template-columns: 1fr auto;
}
.table-listing__list__item__left {
  display: grid;
  grid-auto-flow: row;
  row-gap: 10px;
  padding: 10px 6px;
  border-left: 6px solid transparent;
  background-color: var(--color-container);
  transition: border-color 200ms ease-in-out;
  &:hover {
    // background-color: var(--color-primary-semitransparent2);
    border-color: var(--color-primary);
    cursor: pointer;
    .table-listing__list__item__left__heading {
      color: var(--color-primary);
    }
  }
}
.table-listing__list__item__left__heading {
  transition: color 200ms ease-in-out;
  font-size: 20px;
}
.table-listing__list__item__right {
  background-color: var(--color-container);
  display: flex;
  align-items: flex-start;
  padding: 10px 6px;
}
</style>
