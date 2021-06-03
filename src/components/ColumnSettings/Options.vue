<template>
  <div class="options">
    <div class="options__title">
      <div>Choices</div>
      <oak-button
        theme="primary"
        variant="regular"
        @button-click="newOption"
        shape="sharp"
        size="xsmall"
        >New choice</oak-button
      >
    </div>
    <div class="options__choices" v-if="options">
      <div class="options__choices__item" v-for="(option, index) in options" :key="index">
        <div class="window-close-action">
          <oak-click-area @click-area-click="deleteOption(index)">
            <div class="window-close-action--icon">
              <font-awesome-icon :icon="['fas', 'times']" />
            </div>
          </oak-click-area>
        </div>
        <oak-input
          color="global"
          size="xsmall"
          name="value"
          label="Value"
          :value="option.value"
          @input-input="handleChange($event, option, index)"
          gutterBottom
        />
        <color-swatch
          label="Color"
          name="color"
          :value="option.color"
          @change="handleChange($event, option, index)"
        />
        <icon-swatch
          v-if="meta.indicator === 'icon'"
          label="Icon"
          name="icon"
          :value="option.icon"
          @change="handleChange($event, option, index)"
        />
        <oak-form-actions-container align="left">
          <oak-button
            theme="primary"
            variant="appear"
            @button-click="deleteOption(index)"
            shape="sharp"
            size="xsmall"
            >Delete</oak-button
          >
        </oak-form-actions-container>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { uuid } from 'uuidv4';
import { cloneDeep } from 'lodash';
import ColorSwatch from '@/components/ColorSwatch/index.vue';
import IconSwatch from '@/components/IconSwatch/index.vue';

export default defineComponent({
  name: 'Options',
  components: { ColorSwatch, IconSwatch },
  data() {
    return {
      isExpanded: false
    };
  },
  props: {
    meta: Object,
    options: Array
  },
  methods: {
    handleChange(event: any, option: any, index: number) {
      const _options = this.options ? [...this.options] : [];
      _options[index] = { ...option, [event.detail.name]: event.detail.value };
      this.emitChangeEvent(_options);
    },
    deleteOption(index: number) {
      this.emitChangeEvent(
        this.options?.filter((_: any, indexLocal: number) => index !== indexLocal)
      );
    },
    newOption() {
      if (this.options) {
        this.emitChangeEvent([...this.options, {}]);
      } else {
        this.emitChangeEvent([{}]);
      }
    },
    emitChangeEvent(options: any) {
      return this.$emit('options-change', {
        detail: {
          name: 'options',
          value: options
        }
      });
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.options__title {
  margin-bottom: 10px;
  // font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.options__choices {
  // margin-left: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  row-gap: 10px;
  column-gap: 10px;
}
.options__choices__item {
  border: 1px solid var(--global-border-color);
  padding: 10px 10px;
  background-color: var(--color-float);
}
</style>
