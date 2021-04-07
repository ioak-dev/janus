<template>
  <div class="percentage-view-datatype">
    <div class="percentage-view-datatype__outer" :class="indicatorStyle">
      <div
        class="percentage-view-datatype__inner"
        :class="`app-swatch-bg-${colorGrade} ${indicatorStyle}`"
        :style="`width:${rowData?.row[cellHeader?.id] || 0}%`"
      />
    </div>
    <div class="percentage-view-datatype__percent">{{ rowData?.row[cellHeader?.id] || 0 }}%</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'TextViewDatatype',
  props: {
    rowData: Object,
    cellHeader: Object
  },
  setup(props) {
    const indicatorStyle = computed(() => {
      let style = '';
      switch (props.cellHeader?.meta?.indicator) {
        case 'No graphic':
          style = 'percentage-indicator-style--no-graphic';
          break;

        case 'Bar':
          style = 'percentage-indicator-style--bar';
          break;

        case 'Rounded bar':
          style = 'percentage-indicator-style--rounded-bar';
          break;

        case 'Ellipse':
          style = 'percentage-indicator-style--ellipse';
          break;

        default:
          style = '';
      }

      switch (props.cellHeader?.meta?.size) {
        case 'Small':
          style += ' percentage-indicator-size--small';
          break;

        case 'Medium':
          style += ' percentage-indicator-size--medium';
          break;

        case 'Large':
          style += ' percentage-indicator-size--large';
          break;

        default:
          style = '';
      }

      return style;
    });
    const colorGrade = computed(() => {
      const numberOfGrades = props.cellHeader?.meta?.grades?.length;
      let i = 1;
      let match = 1;
      while (i <= numberOfGrades) {
        if (props.rowData?.row[props.cellHeader?.id] <= i * (100 / numberOfGrades)) {
          match = i - 1;
          break;
        }
        i += 1;
      }
      return props.cellHeader?.meta?.grades[match];
    });

    return { colorGrade, indicatorStyle };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.percentage-view-datatype {
  display: grid;
  grid-auto-flow: column;
  column-gap: 5px;
  justify-content: flex-start;
  align-items: center;
}
.percentage-view-datatype__outer {
  height: 20px;
  width: 160px;
  background-color: var(--color-surface-darker);
  overflow: hidden;
  &.percentage-indicator-size--small {
    width: 120px;
  }
  &.percentage-indicator-size--medium {
    width: 150px;
  }
  &.percentage-indicator-size--large {
    width: 180px;
  }
}
.percentage-view-datatype__inner {
  height: 20px;
  // border-radius: 20px;
}

.percentage-view-datatype__outer,
.percentage-view-datatype__inner {
  &.percentage-indicator-style--no-graphic {
    display: none;
  }
  &.percentage-indicator-style--rounded-bar {
    border-radius: 4px;
  }
  &.percentage-indicator-style--ellipse {
    border-radius: 20px;
  }
}

.percentage-view-datatype__outer,
.percentage-view-datatype__inner {
  &.percentage-indicator-size--small {
    height: 10px;
  }
  &.percentage-indicator-size--medium {
    height: 14px;
  }
  &.percentage-indicator-size--large {
    height: 18px;
  }
}

.percentage-view-datatype__percent {
  font-size: 12px;
}
</style>
