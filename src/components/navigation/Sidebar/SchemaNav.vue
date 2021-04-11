<template>
  <div class="nav-section">
    <div class="nav-section__title">
      <!-- <div class="nav-section__title__divider" /> -->
      <div>Schema explorer</div>
    </div>
    <table-nav v-for="item in getSchema" :key="item.id" :schemaId="item.id"></table-nav>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import TableNav from './TableNav.vue';

export default {
  components: { TableNav },
  name: 'SchemaNav',
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
