<template>
  <div class="bookmark">
    <div class="bookmark__link">
      <oak-click-area @click-area-click="goToHome">
        <div class="bookmark__link__name" :class="currentSchema ? '' : 'leaf-node'">
          <font-awesome-icon :icon="['fas', 'home']" />
          <div class="bookmark__link__name__text">Home</div>
        </div>
      </oak-click-area>
    </div>
    <div v-if="currentSchema" class="bookmark__arrow">
      <font-awesome-icon :icon="['fas', 'chevron-right']" />
    </div>
    <div class="bookmark__link" v-if="currentSchema">
      <oak-click-area @click-area-click="goToSchema">
        <div class="bookmark__link__name" :class="currentTable ? '' : 'leaf-node'">
          <font-awesome-icon :icon="['fas', 'server']" />
          <div class="bookmark__link__name__text">{{ currentSchema?.name }}</div>
        </div>
      </oak-click-area>
    </div>
    <div v-if="currentTable" class="bookmark__arrow">
      <font-awesome-icon :icon="['fas', 'chevron-right']" />
    </div>
    <div class="bookmark__link" v-if="currentTable">
      <oak-click-area @click-area-click="goToTable">
        <div class="bookmark__link__name" :class="currentRecord ? '' : 'leaf-node'">
          <font-awesome-icon :icon="['fas', 'table']" />
          <div class="bookmark__link__name__text">{{ currentTable?.name }}</div>
        </div>
      </oak-click-area>
    </div>
    <div v-if="currentRecord" class="bookmark__arrow">
      <font-awesome-icon :icon="['fas', 'chevron-right']" />
    </div>
    <div class="bookmark__link" v-if="currentRecord">
      <oak-click-area @click-area-click="goToRecord">
        <div class="bookmark__link__name leaf-node">
          <font-awesome-icon :icon="['fas', 'file-alt']" />
          <div class="bookmark__link__name__text">{{ currentRecord }}</div>
        </div>
      </oak-click-area>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Bookmark',
  computed: {
    ...mapGetters(['getProfile', 'getSchema', 'getTable']),
    currentSchema() {
      return this.getSchema?.find((item) => item.id === this.$route.params.schemaId);
    },
    currentTable() {
      return this.getTable?.find((item) => item.id === this.$route.params.tableId);
    },
    currentRecord() {
      // return this.getTable?.find((item) => item.id === this.$route.params.recordRef);
      return this.$route.params.recordRef;
    }
  },
  methods: {
    goToHome() {
      this.$router.push(`/${this.getProfile.space}/schema`);
    },
    goToSchema() {
      this.$router.push(`/${this.getProfile.space}/schema/${this.getProfile.schema}`);
    },
    goToTable() {
      this.$router.push(
        `/${this.getProfile.space}/schema/${this.getProfile.schema}/table/${this.$route.params.tableId}`
      );
    },
    goToRecord() {
      this.$router.push(
        `/${this.getProfile.space}/schema/${this.getProfile.schema}/table/${this.$route.params.tableId}/record/${this.$route.params.recordRef}`
      );
    }
  }
};
</script>

<style lang="scss">
.bookmark {
  display: grid;
  grid-auto-flow: column;
  column-gap: 6px;
  align-items: center;
  align-content: center;
}
.bookmark__arrow {
  font-size: 10px;
  display: flex;
  align-content: center;
  align-items: center;
}
.bookmark__link {
  font-size: 14px;
  display: flex;
  align-items: center;
}
.bookmark__link__name {
  font-size: 14px;
  height: 30px;
  padding: 0 6px;
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  column-gap: 4px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  &.leaf-node {
    color: #ffffff53;
    cursor: auto;
    &:hover {
      text-decoration: none;
    }
  }
}
.bookmark__link__name__text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
