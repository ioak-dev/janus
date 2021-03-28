<template>
  <div>
    <div class="table-listing">
      <div>
        <div v-for="table in getTable" :key="table.id">
          <oak-click-area @click-area-click="goToTable(table.id)">
            <div class="table-listing__table-item">
              {{ table.name }}
            </div></oak-click-area
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { compose as dividerCompose } from '@oakui/core-stage/style-composer/OakDividerComposer';

export default defineComponent({
  name: 'TableListing',
  computed: {
    ...mapGetters(['getProfile', 'getTable']),
    dividerStyle() {
      return dividerCompose({ color: 'global', colorMode: 'darker' });
    }
  },
  methods: {
    goToCreate(event: any) {
      this.$router.push(`/${this.getProfile.space}/table-management/create`);
    },
    goToTable(tableId: string) {
      this.$router.push(`/${this.getProfile.space}/table/${tableId}`);
    }
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
