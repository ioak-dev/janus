<template>
  <oak-toolbar fillColor="container" borderVariant="both">
    <div slot="left">
      <div class="app-toolbar-action">
        <oak-button theme="info" variant="block" size="xsmall" shape="sharp" @button-click="goBack">
          <font-awesome-icon :icon="['fas', 'arrow-left']"
        /></oak-button>
        <div>{{ table?.name }}</div>
      </div>
    </div>
    <div slot="right">
      <div class="app-toolbar-action">
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
    </div>
  </oak-toolbar>
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
