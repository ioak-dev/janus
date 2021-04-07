<template>
  <div class="nav-section">
    <div class="nav-section__title">
      <div>Manage Applications</div>
    </div>
    <oak-nav-element @button-click="goToSchema()">Schema</oak-nav-element>
    <oak-nav-element @button-click="goToTable()">Table</oak-nav-element>
    <oak-nav-element @button-click="goToSwatch()">Swatch</oak-nav-element>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PrimaryNav',
  data() {
    return {
      isExpanded: false
    };
  },
  computed: {
    ...mapGetters(['getProfile', 'getSchema'])
  },
  methods: {
    handlePanelExpandedEvent() {
      this.isExpanded = true;
    },
    handlePanelCollapsedEvent() {
      this.isExpanded = false;
    },
    goToSchema() {
      this.$router.push(`/${this.getProfile.space}/schema`);
    },
    goToSwatch() {
      this.$router.push(`/${this.getProfile.space}/swatch`);
    }
  }
};
</script>

<style lang="scss">
.nav-section__title {
  font-size: 9px;
  font-weight: 600;
  padding: 10px 10px;
  padding-top: 24px;
  text-transform: uppercase;
  text-align: right;
  color: var(--color-4);
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
}
.nav-section__title__divider {
  height: 1px;
  width: 100%;
  background-color: var(--color-info);
}
</style>
