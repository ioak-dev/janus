<template>
  <div class="nav-section">
    <div class="nav-section__title">
      <!-- <div class="nav-section__title__divider" /> -->
      <div>Help and Support</div>
    </div>
    <oak-nav-element level="1" @button-click="goToTable(item)">User guide</oak-nav-element>
    <oak-nav-element level="1" @button-click="goToTable(item)">Customer service</oak-nav-element>
    <oak-nav-element level="1" @button-click="goToTable(item)"
      >Terms and conditions</oak-nav-element
    >
    <oak-nav-element level="1" @button-click="goToTable(item)">Privacy policy</oak-nav-element>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'StaticNav',
  data() {
    return {
      isExpanded: false
    };
  },
  computed: {
    ...mapGetters(['getSchema'])
  },
  methods: {
    handlePanelExpandedEvent() {
      this.isExpanded = true;
    },
    handlePanelCollapsedEvent() {
      this.isExpanded = false;
    },
    goToSchema(schema) {
      console.log(schema);
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
