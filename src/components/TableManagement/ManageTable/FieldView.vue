<template>
  <div class="field-view">
    <oak-expanse
      elevation="1"
      :name="field.id"
      :groupName="field.tableId"
      @expanse-expanded="handleExpand"
      @expanse-collapsed="handleCollapse"
    >
      <div slot="header">
        <div class="field-view__header" :class="isExpanded ? 'expanded' : ''">
          <div>{{ field.name }}</div>
          <font-awesome-icon :icon="['fas', 'chevron-down']" />
        </div>
      </div>
      <div slot="main">
        <div class="field-view__main" :class="isExpanded ? 'expanded' : ''">
          <oak-form-actions-container>
            <oak-button
              theme="danger"
              variant="regular"
              @button-click="$emit('delete')"
              shape="sharp"
              size="xsmall"
              >Delete</oak-button
            >
          </oak-form-actions-container>

          <oak-input
            fill="global"
            name="name"
            label="Field name"
            :value="field.name"
            @input-input="handleChange"
            gutterBottom
          />
          <oak-select
            fill="global"
            name="datatype"
            label="Datatype"
            :value="field.datatype"
            :options="['text', 'number', 'list']"
            @select-input="handleChange"
            autocompleteVariant="none"
            gutterBottom
          />
          <oak-checkbox
            name="multiple"
            :value="field.multiple"
            @input-input="handleChange"
            gutterBottom
            >Can have multiple values?</oak-checkbox
          >
          <meta-indicator
            v-if="field.datatype === 'list'"
            :meta="field.meta"
            @meta-change="handleChange"
          />
          <meta-options
            v-if="field.datatype === 'list'"
            :meta="field.meta"
            @meta-change="handleChange"
          />
        </div>
      </div>
    </oak-expanse>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MetaIndicator from './MetaIndicator.vue';
import MetaOptions from './MetaOptions.vue';

export default defineComponent({
  name: 'FieldView',
  data() {
    return {
      isExpanded: false
    };
  },
  props: {
    field: Object
  },
  components: { MetaOptions, MetaIndicator },
  methods: {
    handleExpand() {
      this.isExpanded = true;
    },
    handleCollapse() {
      this.isExpanded = false;
    },
    handleChange(event: any) {
      this.$emit('change', {
        id: this.field?.id,
        name: event.detail.name,
        value: event.detail.value
      });
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.field-view {
}
.field-view__header {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  background-color: var(--color-container);
  &:hover {
    background-color: var(--color-surface);
  }
  &.expanded {
    background-color: var(--color-primary);
    color: var(--color-primary-i);
  }
}
.field-view__main {
  padding: 20px 20px;
  background-color: var(--color-container);
  &.expanded {
    background-color: var(--color-surface);
  }
}
</style>
