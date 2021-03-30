<template>
  <div>
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
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { compose as dividerCompose } from '@oakui/core-stage/style-composer/OakDividerComposer';

export default defineComponent({
  name: 'TableListing',
  computed: {
    ...mapGetters(['getSchema', 'getTableBySchema', 'getProfile']),
    dividerStyle() {
      return dividerCompose({ color: 'global', colorMode: 'darker' });
    },
    tables() {
      return this.getTableBySchema(this.$route.params.schemaId);
    }
  },
  methods: {
    goToTable(tableId) {
      this.$router.push(
        `/${this.getProfile.space}/schema/${this.$route.params.schemaId}/table/${tableId}/manage`
      );
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
