<template>
  <div class="meta-options">
    <div class="meta-options__title">
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
    <div class="meta-options__choices" v-if="meta">
      <div class="meta-options__choices__item" v-for="(option, index) in meta.options" :key="index">
        <oak-input
          fill="global"
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
          label="Badge"
          name="badge"
          :value="option.badge"
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
import ColorSwatch from '@/components/ColorSwatch/index.vue';
import IconSwatch from '@/components/IconSwatch/index.vue';

export default defineComponent({
  name: 'MetaOptions',
  components: { ColorSwatch, IconSwatch },
  data() {
    return {
      isExpanded: false
    };
  },
  props: {
    meta: Object
  },
  methods: {
    handleChange(event: any, option: any, index: number) {
      const options = this.meta?.options ? [...this.meta?.options] : [];
      options[index] = { ...option, [event.detail.name]: event.detail.value };
      this.emitChangeEvent(options);
    },
    deleteOption(index: number) {
      this.emitChangeEvent(
        this.meta?.options?.filter((_: any, indexLocal: number) => index !== indexLocal)
      );
    },
    newOption() {
      if (this.meta?.options) {
        this.emitChangeEvent([...this.meta?.options, { id: uuid() }]);
      } else {
        this.emitChangeEvent([{}]);
      }
    },
    emitChangeEvent(options: any) {
      return this.$emit('meta-change', {
        detail: {
          name: 'meta',
          value: {
            ...this.meta,
            options
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
