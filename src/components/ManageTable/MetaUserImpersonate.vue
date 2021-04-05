<template>
  <oak-checkbox
    name="impersonate"
    :value="meta.impersonate"
    @input-change="handleChange"
    gutterBottom
    >Include in My view?</oak-checkbox
  >
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MetaUserImpersonate',
  props: {
    meta: Object
  },
  methods: {
    handleChange(event: any) {
      console.log(event);
      return this.$emit('meta-change', {
        detail: {
          name: 'meta',
          value: {
            ...this.meta,
            [event.detail.name]: event.detail.value
          }
        }
      });
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.meta-options__title {
  margin-bottom: 10px;
  // font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.meta-options__choices {
  // margin-left: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  row-gap: 10px;
  column-gap: 10px;
}
.meta-options__choices__item {
  border: 1px solid var(--global-border-color);
  padding: 10px 10px;
  background-color: var(--color-float);
}
</style>
