<template>
  <oak-toolbar fillColor="container" borderVariant="both">
    <div slot="left">
      <oak-form-actions-container>
        <oak-link @link-click="goBack" block blockSize="xsmall" blockShape="sharp" color="default">
          <font-awesome-icon :icon="['fas', 'arrow-left']" />
        </oak-link>
        <div>JANU-21 ({{ record?.id }})</div>
      </oak-form-actions-container>
    </div>
    <div slot="right">right side</div>
  </oak-toolbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'Toolbar',
  props: {
    tableId: String,
    record: Object,
    openEdit: Function,
    closeEdit: Function,
    isEdit: Boolean
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
<style scoped lang="scss"></style>
