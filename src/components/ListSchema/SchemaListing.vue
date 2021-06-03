<template>
  <div class="schema-listing">
    <div class="schema-listing__search">
      <oak-input
        name="search"
        :value="searchText"
        @input-input="handleSearchChange"
        placeholder="Type to search"
        class="schema-listing__search__input"
        color="container"
      />
    </div>
    <div class="schema-listing__list">
      <div v-for="schema in schemas" :key="schema.id" class="schema-listing__list__item">
        <oak-click-area @click-area-click="goToSchema(schema)">
          <div class="schema-listing__list__item__left">
            <div class="schema-listing__list__item__left__heading">
              <font-awesome-icon :icon="['fas', 'server']" />
              <div>{{ schema.name }}</div>
            </div>
            <div class="schema-listing__list__item__left__description">
              {{ schema.description }}
            </div>
          </div></oak-click-area
        >
        <div class="schema-listing__list__item__right">
          <oak-checkbox
            :value="selectedSchemas.includes(schema.id)"
            :name="schema.id"
            @input-change="handleToggle($event, schema)"
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
import { schemaChangedSubject } from '@/events/SchemaChangedEvent';

export default defineComponent({
  name: 'SchemaListing',
  props: { selectedSchemas: Array },
  methods: {
    goToSchema(schema: any) {
      schemaChangedSubject.next({ reference: schema.reference });
      this.$router.push(`/${this.profile.space}/schema/${schema.reference}`);
    },
    handleSearchChange(event: any) {
      this.searchText = event.detail.value;
    },
    handleToggle(event: any, _schema: any) {
      this.$emit('change-selection', { detail: { name: _schema, value: event.detail.value } });
    }
  },
  setup() {
    const searchText = ref('');
    const route = useRoute();
    const store = useStore();
    const schemas = computed(() => store.getters.getSchema);
    const profile = computed(() => store.getters.getProfile);

    return { schemas, profile, searchText };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.schema-listing {
  display: grid;
  grid-auto-flow: row;
  margin: 10px;
}

.schema-listing__list {
  display: grid;
  grid-auto-flow: row;
  row-gap: 10px;
}

.schema-listing__list__item__left {
  background-color: var(--color-container);
  padding: 10px 10px;
}

.schema-listing__search {
  width: 400px;
  max-width: calc(100vw - 20px);
  margin-bottom: 20px;
}
.schema-listing__list__item {
  display: grid;
  grid-template-columns: 1fr auto;
}
.schema-listing__list__item__left {
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
    .schema-listing__list__item__left__heading {
      color: var(--color-primary);
    }
  }
}
.schema-listing__list__item__left__heading {
  transition: color 200ms ease-in-out;
  font-size: 20px;
  display: grid;
  grid-auto-flow: column;
  justify-content: flex-start;
  align-items: center;
  column-gap: 6px;
}
.schema-listing__list__item__right {
  background-color: var(--color-container);
  display: flex;
  align-items: flex-start;
  padding: 10px 6px;
}
</style>
