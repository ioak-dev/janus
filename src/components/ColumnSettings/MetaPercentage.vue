<template>
  <div class="meta-percentage">
    <oak-select
      fill="global"
      name="indicator"
      label="Value display style"
      tooltip="How should the value shown?"
      :value="meta?.indicator"
      :options="['No graphic', 'Bar', 'Rounded bar', 'Ellipse']"
      @select-input="handleChange"
      autocompleteVariant="none"
      gutterBottom
    />
    <oak-select
      v-if="meta?.indicator !== 'No graphic'"
      fill="global"
      name="size"
      label="Indicator size"
      :value="meta?.size"
      :options="['Small', 'Medium', 'Large']"
      @select-input="handleChange"
      autocompleteVariant="none"
      gutterBottom
    />
    <div>
      <div class="meta-percentage__title">
        <div>Color grade</div>
      </div>
      <div class="meta-percentage__grade" v-if="meta">
        <div class="meta-percentage__grade__item" v-for="(item, index) in meta.grades" :key="index">
          <color-swatch
            label="Color"
            name="color"
            :value="item"
            @change="handleGradeChange($event, item, index)"
          />
          <oak-button
            theme="primary"
            variant="appear"
            @button-click="deleteGrade(index)"
            shape="sharp"
            size="xsmall"
            >Delete</oak-button
          >
        </div>
        <oak-form-actions-container align="left">
          <oak-button
            theme="primary"
            variant="appear"
            @button-click="newGrade"
            shape="sharp"
            size="xsmall"
            >Add</oak-button
          >
        </oak-form-actions-container>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import ColorSwatch from '@/components/ColorSwatch/index.vue';

export default defineComponent({
  name: 'MetaPercentage',
  components: { ColorSwatch },
  data() {
    return {
      isExpanded: false
    };
  },
  props: {
    meta: Object
  },
  methods: {
    handleChange(event: any) {
      this.emitChangeEvent({ [event.detail.name]: event.detail.value });
    },
    handleGradeChange(event: any, grade: any, index: number) {
      const grades = this.meta?.grades ? [...(this.meta?.grades || [])] : [];
      grades[index] = event.detail.value;
      this.emitChangeEvent({ grades });
    },
    deleteGrade(index: number) {
      this.emitChangeEvent({
        grades: this.meta?.grades?.filter((_: any, indexLocal: number) => index !== indexLocal)
      });
    },
    newGrade() {
      if (this.meta?.grades) {
        this.emitChangeEvent({ grades: [...(this.meta?.grades || []), 1] });
      } else {
        this.emitChangeEvent({ grades: [1] });
      }
    },
    emitChangeEvent(changes: any) {
      return this.$emit('meta-change', {
        detail: {
          name: 'meta',
          value: {
            ...this.meta,
            ...changes
          }
        }
      });
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.meta-percentage__title {
  margin-bottom: 10px;
  // font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.meta-percentage__grade {
  // margin-left: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  row-gap: 10px;
  column-gap: 10px;
}
.meta-percentage__grade__item {
  border: 1px solid var(--global-border-color);
  padding: 10px 10px;
  background-color: var(--color-float);
}
</style>
