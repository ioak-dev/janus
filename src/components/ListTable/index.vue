<template>
  <div class="list-table">
    <Toolbar :schemaId="$route.params.schemaId" />
    <action-bar />
    <app-section subtle>
      <div class="table-listing">
        <div>
          <div v-for="table in tables" :key="table.id">
            <oak-click-area @click-area-click="goToTable(table.id)">
              <div class="table-listing__table-item">
                {{ table.name }}
              </div></oak-click-area
            >
          </div>
        </div>
      </div>
    </app-section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { compose as dividerCompose } from '@oakui/core-stage/style-composer/OakDividerComposer';
import { useRoute } from 'vue-router';
import AppSection from '@/components/ui/AppSection.vue';
import Toolbar from './Toolbar.vue';
import ActionBar from './ActionBar.vue';

export default defineComponent({
  name: 'ListTable',
  components: { Toolbar, ActionBar, AppSection },
  methods: {
    goToTable(tableId: string) {
      this.$router.push(
        `/${this.profile.space}/schema/${this.$route.params.schemaId}/table/${tableId}/manage`
      );
    }
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const tables = computed(() => store.getters.getTableBySchema(route.params.schemaId));
    const profile = computed(() => store.getters.getProfile);

    const dividerStyle = computed(() => dividerCompose({ color: 'global', colorMode: 'darker' }));
    return { tables, profile, dividerStyle };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.table-listing {
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
}

.table_listing__item {
  padding: 10px 6px;
  display: flex;
  &:hover {
    background-color: var(--color-container);
    cursor: pointer;
  }
}

.table-listing__table-item {
  padding: 10px 6px;
  width: 100%;
  background-color: var(--color-container);
  &:hover {
    background-color: var(--color-primary-semitransparent2);
    cursor: pointer;
  }
}
</style>
