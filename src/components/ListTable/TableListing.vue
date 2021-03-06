<template>
  <div class="table-listing">
    <div class="table-listing__search">
      <oak-input
        name="search"
        :value="searchText"
        @input-input="handleSearchChange"
        placeholder="Type to search"
        class="table-listing__search__input"
        color="container"
      />
    </div>
    <div class="table-listing__list">
      <div v-for="table in tables" :key="table.id" class="table-listing__list__item">
        <oak-click-area @click-area-click="goToTable(table)">
          <div class="table-listing__list__item__left">
            <div class="table-listing__list__item__left__heading">
              <font-awesome-icon :icon="['fas', 'table']" />
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
            @input-change="handleToggle($event, table)"
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
  props: { selectedTables: Array, schemaId: String },
  methods: {
    goToTable(table: any) {
      this.$router.push(`/${this.profile.space}/schema/${this.schemaRef}/table/${table.reference}`);
    },
    handleSearchChange(event: any) {
      this.searchText = event.detail.value;
    },
    handleToggle(event: any, _table: any) {
      this.$emit('change-selection', { detail: { name: _table, value: event.detail.value } });
    }
  },
  setup(props) {
    const searchText = ref('');
    const route = useRoute();
    const store = useStore();
    const tables = computed(() =>
      store.getters
        .getTableBySchema(props.schemaId)
        ?.filter(
          (item: any) =>
            item.name.toLowerCase().includes(searchText?.value?.toLowerCase()) ||
            item.description.toLowerCase().includes(searchText?.value?.toLowerCase())
        )
    );
    const profile = computed(() => store.getters.getProfile);
    const schemaRef = computed(() => store.getters.schemaIdToRef(props.schemaId));

    return { tables, profile, searchText, schemaRef };
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
  display: grid;
  grid-auto-flow: column;
  justify-content: flex-start;
  align-items: center;
  column-gap: 6px;
}
.table-listing__list__item__right {
  background-color: var(--color-container);
  display: flex;
  align-items: flex-start;
  padding: 10px 6px;
}
</style>
