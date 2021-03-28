<template>
  <oak-nav-group name="administration" groupName="sidebar-nav"
    ><div slot="header">
      <div>{{ currentSchema?.name }}</div>
    </div>
    <div slot="main">
      <oak-nav-element
        v-for="item in tablesInCurrentSchema"
        @button-click="goToTable(item)"
        :key="item.id"
      >
        {{ item.name }}
      </oak-nav-element>
    </div>
  </oak-nav-group>
  <oak-nav-group name="administration-dup" groupName="sidebar-nav"
    ><div slot="header">
      <div>{{ currentSchema?.name }}</div>
    </div>
    <div slot="main">
      <oak-nav-group
        name="administration-sub"
        groupName="sidebar-nav-sub"
        parentName="administration-dup"
        parentGroupName="sidebar-nav"
        level="2"
        ><div slot="header">
          <div>{{ currentSchema?.name }}</div>
        </div>
        <div slot="main">
          <oak-nav-element
            v-for="item in tablesInCurrentSchema"
            @button-click="goToTable(item)"
            :key="item.id"
          >
            {{ item.name }}
          </oak-nav-element>
        </div>
      </oak-nav-group>
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
    schemaId: String
  },
  computed: {
    ...mapGetters(['getSchema', 'getTable', 'getProfile']),
    currentSchema() {
      return this.getSchema?.find((item) => item.id === this.schemaId);
    },
    tablesInCurrentSchema() {
      return this.getTable?.filter((item) => item.schemaId === this.schemaId);
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
      console.log(table);
      this.$router.push(`/${this.getProfile.space}/schema/${this.schemaId}/table/${table.id}`);
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
