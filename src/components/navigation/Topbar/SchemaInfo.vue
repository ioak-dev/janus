<template>
  <div class="schema-info">{{ currentSchema?.name }}</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SchemaInfo',
  computed: {
    ...mapGetters(['getProfile', 'getSchema']),
    currentSchema() {
      return this.getSchema?.find((item) => item.id === this.getProfile?.schema);
    }
  },
  methods: {
    ...mapActions(['removeAuth']),
    logout() {
      this.removeAuth(this.$cookies);
    }
  }
};
</script>

<style lang="scss">
.schema-info {
}
</style>
