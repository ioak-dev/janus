<template>
  <oak-nav-group name="administration" groupName="sidebar-nav"
    ><div slot="header">
      <div>{{ currentSchema?.name }}</div>
    </div>
    <div slot="main">
      <oak-nav-element
        level="2"
        v-for="item in tablesInCurrentSchema"
        :active="item.reference === currentTable ? true : false"
        @button-click="goToTable(item)"
        :key="item.id"
      >
        {{ item.name }}
      </oak-nav-element>
    </div>
  </oak-nav-group>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TableNav',
  data() {
    return {
      isExpanded: false
    };
  },
  props: {
    schemaRef: String
  },
  computed: {
    ...mapGetters(['getSchemaByReference', 'getTable', 'getProfile', 'schemaRefToId']),
    currentSchema() {
      return this.getSchemaByReference(this.schemaRef);
    },
    tablesInCurrentSchema() {
      return this.getTable?.filter((item) => item.schemaId === this.schemaRefToId(this.schemaRef));
    },
    currentTable() {
      return this.$route.params.tableRef;
    }
  },
  methods: {
    handlePanelExpandedEvent() {
      this.isExpanded = true;
    },
    handlePanelCollapsedEvent() {
      this.isExpanded = false;
    },
    goToTable(table) {
      this.$router.push(
        `/${this.getProfile.space}/schema/${this.schemaRef}/table/${table.reference}`
      );
    }
  }
};
</script>

<style lang="scss">
.group__header {
  width: 100%;
}
.group__main__element {
  padding: 8px 0 8px 30px;
}
.group__main__element__container {
  width: 100%;
  font-size: 14px;
  // background-color: var(--color-container-darker);
  color: var(--color-3);
  cursor: pointer;
  &:hover {
    color: var(--color-4);
  }
}
</style>
