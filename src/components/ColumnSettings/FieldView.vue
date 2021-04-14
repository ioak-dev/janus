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
            :options="[
              'text',
              'number',
              'date',
              'list',
              'relation',
              'user',
              'percentage',
              'computed'
            ]"
            @select-input="handleChange"
            autocompleteVariant="none"
            gutterBottom
          />
          <meta-user-impersonate
            v-if="field.datatype === 'user'"
            :meta="field.meta"
            @meta-change="handleChange"
          />
          <meta-relation
            v-if="field.datatype === 'relation'"
            :meta="field.meta"
            @meta-change="handleChange"
          />
          <meta-computed
            v-if="field.datatype === 'computed'"
            :meta="field.meta"
            @meta-change="handleChange"
          />
          <meta-percentage
            v-if="field.datatype === 'percentage'"
            :meta="field.meta"
            @meta-change="handleChange"
          />
          <meta-multiple
            v-if="['list', 'relation', 'user'].includes(field.datatype)"
            :meta="field.meta"
            @meta-change="handleChange"
          />
          <meta-indicator
            v-if="field.datatype === 'list'"
            :meta="field.meta"
            @meta-change="handleChange"
          />
          <options
            v-if="field.datatype === 'list'"
            :options="field.options"
            :meta="field.meta"
            @options-change="handleChange"
          />
        </div>
      </div>
    </oak-expanse>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import MetaIndicator from './MetaIndicator.vue';
import Options from './Options.vue';
import MetaRelation from './MetaRelation.vue';
import MetaMultiple from './MetaMultiple.vue';
import MetaUserImpersonate from './MetaUserImpersonate.vue';
import MetaPercentage from './MetaPercentage.vue';
import MetaComputed from './MetaComputed.vue';

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
  components: {
    Options,
    MetaIndicator,
    MetaRelation,
    MetaUserImpersonate,
    MetaMultiple,
    MetaPercentage,
    MetaComputed
  },
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
