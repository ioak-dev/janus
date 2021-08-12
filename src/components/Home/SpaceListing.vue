<template>
  <app-section subtle>
    <div class="space-listing">
      <div>
        <div v-for="space in spaces" :key="space.id">
          <oak-click-area @click-area-click="goToSpace(space.realm)">
            <div class="space-listing__item">
              <div class="space-listing__item__container">
                {{ space.name }}
              </div>
            </div></oak-click-area
          >
        </div>
      </div>
    </div>
  </app-section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { compose as dividerCompose } from '@oakui/core-stage/style-composer/OakDividerComposer';
import AppSection from '@/components/ui/AppSection.vue';

export default defineComponent({
  name: 'SpaceListing',
  components: { AppSection },
  methods: {
    goToSpace(id: string) {
      this.$router.push(`/${id}/schema`);
    }
  },
  setup() {
    const store = useStore();
    const profile = computed(() => store.getters.getProfile);
    const spaces = computed(() => store.getters.getSpace);

    const dividerStyle = computed(() => dividerCompose({ color: 'global', colorMode: 'darker' }));
    return { spaces, profile, dividerStyle };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.space-listing__item {
  display: flex;
}
.space-listing__item__container {
  padding: 10px 6px;
  width: 100%;
  background-color: var(--color-container);
  &:hover {
    background-color: var(--color-primary-semitransparent2);
    cursor: pointer;
  }
}
</style>
