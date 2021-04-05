<template>
  <teleport to="#topbar-right">
    <div class="app-toolbar-action-container">
      <oak-button
        theme="info"
        :variant="multiselect ? 'regular' : 'block'"
        size="xsmall"
        shape="sharp"
        @button-click="$emit('toggle-multiselect')"
      >
        <font-awesome-icon :icon="['fas', 'tasks']" />
      </oak-button>
      <oak-button
        theme="info"
        :variant="dense ? 'regular' : 'block'"
        size="xsmall"
        shape="sharp"
        @button-click="$emit('toggle-dense-view')"
      >
        <font-awesome-icon :icon="['fas', 'compress-alt']" />
      </oak-button>
      <oak-button
        theme="info"
        :variant="wrap ? 'block' : 'regular'"
        size="xsmall"
        shape="sharp"
        @button-click="$emit('toggle-wrap')"
      >
        <font-awesome-icon :icon="['fas', 'text-height']" />
      </oak-button>
      <oak-button
        class="hide-preview-on-smallscreen"
        theme="info"
        :variant="preview ? 'regular' : 'block'"
        size="xsmall"
        shape="sharp"
        @button-click="$emit('toggle-preview')"
      >
        <font-awesome-icon :icon="['fas', 'binoculars']" />
      </oak-button>
    </div>
  </teleport>
  <teleport to="#topbar-left">
    <div class="app-toolbar-action-container">
      <oak-button theme="info" variant="block" size="xsmall" shape="sharp" @button-click="goBack">
        <font-awesome-icon :icon="['fas', 'arrow-left']"
      /></oak-button>
      <div>{{ table?.name }}</div>
      <oak-button
        theme="info"
        variant="block"
        size="xsmall"
        shape="sharp"
        @button-click="goToManageTable"
      >
        <font-awesome-icon :icon="['fas', 'cog']"
      /></oak-button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'Toolbar',
  props: {
    table: Object,
    dense: Boolean,
    multiselect: Boolean,
    preview: Boolean,
    wrap: Boolean
  },
  computed: {
    ...mapGetters(['getProfile'])
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    goToManageTable() {
      this.$router.push(
        `/${this.getProfile.space}/schema/${this.$route.params.schemaId}/table/${this.$route.params.tableId}/manage`
      );
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hide-preview-on-smallscreen {
  @media (max-width: 999px) {
    display: none;
  }
}
</style>
