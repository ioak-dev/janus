<template>
  <div>
    <div class="schema-listing">
      <div>
        <div v-for="schema in getSchema" :key="schema.id" class="schema-listing__schema-item">
          <oak-click-area @click-area-click="goToSchema(schema.id)">
            <div class="schema-listing__schema-item__left">
              {{ schema.name }}
            </div></oak-click-area
          >
          <oak-click-area @click-area-click="goToSchemaSettings(schema.id)">
            <div class="schema-listing__schema-item__right">
              <font-awesome-icon :icon="['fas', 'cog']" />
            </div>
          </oak-click-area>
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
import { schemaChangedSubject } from '@/events/SchemaChangedEvent';

export default defineComponent({
  name: 'SchemaListing',
  computed: {
    ...mapGetters(['getSchema', 'getProfile']),
    dividerStyle() {
      return dividerCompose({ color: 'global', colorMode: 'darker' });
    }
  },
  methods: {
    goToSchema(schemaId: string) {
      schemaChangedSubject.next({ id: schemaId });
      this.$router.push(`/${this.getProfile.space}/schema/${schemaId}/table`);
    },
    goToSchemaSettings(schemaId: string) {
      this.$router.push(`/${this.getProfile.space}/schema/${schemaId}`);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.schema-listing {
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
}

.schema_listing__item {
  padding: 10px 6px;
  display: flex;
  &:hover {
    background-color: var(--color-container);
    cursor: pointer;
  }
}

.schema-listing__schema-item {
  display: grid;
  grid-template-columns: 1fr auto;
}

.schema-listing__schema-item__left,
.schema-listing__schema-item__right {
  padding: 10px 6px;
  width: 100%;
  background-color: var(--color-container);
  &:hover {
    background-color: var(--color-primary-semitransparent2);
    cursor: pointer;
  }
}
</style>
