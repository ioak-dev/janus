<template>
  <teleport to="#toolbar-left">
    <div class="app-toolbar-action-container">
      <oak-click-area @click-area-click="generateSwatch">
        <div class="app-toolbar-action app-toolbar-action--primary">
          <font-awesome-icon :icon="['fas', 'check']" />Generate
        </div>
      </oak-click-area>
    </div>
  </teleport>
  <div class="swatch-generator">
    <app-section subtle>
      <swatch value="1" />
      <div class="swatch-generator__form">
        <oak-input
          type="number"
          name="s1"
          :value="s1"
          @input-input="handleChange"
          label="Saturation 1"
        />
        <oak-input
          type="number"
          name="s2"
          :value="s2"
          @input-input="handleChange"
          label="Saturation 2"
        />
        <oak-input
          type="number"
          name="s3"
          :value="s3"
          @input-input="handleChange"
          label="Saturation 3"
        />
        <oak-input
          type="number"
          name="s4"
          :value="s4"
          @input-input="handleChange"
          label="Saturation 4"
        />
        <oak-input
          type="number"
          name="s5"
          :value="s5"
          @input-input="handleChange"
          label="Saturation 5"
        />
        <oak-input
          type="number"
          name="s6"
          :value="s6"
          @input-input="handleChange"
          label="Saturation 6"
        />
        <oak-input
          type="number"
          name="s7"
          :value="s7"
          @input-input="handleChange"
          label="Saturation 7"
        />
        <oak-input
          type="number"
          name="l1"
          :value="l1"
          @input-input="handleChange"
          label="Luminance 1"
        />
        <oak-input
          type="number"
          name="l2"
          :value="l2"
          @input-input="handleChange"
          label="Luminance 2"
        />
        <oak-input
          type="number"
          name="l3"
          :value="l3"
          @input-input="handleChange"
          label="Luminance 3"
        />
        <oak-input
          type="number"
          name="l4"
          :value="l4"
          @input-input="handleChange"
          label="Luminance 4"
        />
        <oak-input
          type="number"
          name="l5"
          :value="l5"
          @input-input="handleChange"
          label="Luminance 5"
        />
        <oak-input
          type="number"
          name="l6"
          :value="l6"
          @input-input="handleChange"
          label="Luminance 6"
        />
        <oak-input
          type="number"
          name="l7"
          :value="l7"
          @input-input="handleChange"
          label="Luminance 7"
        />
      </div>
      {{ generatedCss }}
    </app-section>
  </div>
</template>
<script>
import tinycolor from 'tinycolor2';
import AppSection from '@/components/ui/AppSection.vue';
import Swatch from './Swatch.vue';

export default {
  name: 'SwatchGenerator',
  props: { value: String },
  components: { Swatch, AppSection },
  data() {
    return {
      generatedCss: '',
      track: [],
      s1: 20,
      l1: 30,
      s2: 30,
      l2: 40,
      s3: 40,
      l3: 50,
      s4: 50,
      l4: 60,
      s5: 60,
      l5: 70,
      s6: 70,
      l6: 80,
      s7: 80,
      l7: 90
    };
  },
  methods: {
    handleChange(event) {
      this[event.detail.name] = event.detail.value;
    },
    generateSwatch() {
      const _swatchList = [];
      let i = 0;
      while (i < 14) {
        const newColor = this.getNewColorUsingGoldenAngle(i + 1, `${this.s1}%`, `${this.l1}%`);
        _swatchList.push(newColor);
        console.log(i);
        i += 1;
      }
      while (i < 28) {
        const newColor = this.getNewColorUsingGoldenAngle(i + 1, `${this.s2}%`, `${this.l2}%`);
        _swatchList.push(newColor);
        console.log(i);
        i += 1;
      }
      while (i < 42) {
        const newColor = this.getNewColorUsingGoldenAngle(i + 1, `${this.s3}%`, `${this.l3}%`);
        _swatchList.push(newColor);
        console.log(i);
        i += 1;
      }
      while (i < 56) {
        const newColor = this.getNewColorUsingGoldenAngle(i + 1, `${this.s4}%`, `${this.l4}%`);
        _swatchList.push(newColor);
        console.log(i);
        i += 1;
      }
      while (i < 70) {
        const newColor = this.getNewColorUsingGoldenAngle(i + 1, `${this.s5}%`, `${this.l5}%`);
        _swatchList.push(newColor);
        console.log(i);
        i += 1;
      }
      while (i < 84) {
        const newColor = this.getNewColorUsingGoldenAngle(i + 1, `${this.s6}%`, `${this.l6}%`);
        _swatchList.push(newColor);
        console.log(i);
        i += 1;
      }
      while (i < 98) {
        const newColor = this.getNewColorUsingGoldenAngle(i + 1, `${this.s7}%`, `${this.l7}%`);
        _swatchList.push(newColor);
        console.log(i);
        i += 1;
      }
      let darkCss = '';
      let lightCss = '';
      _swatchList.forEach((item, index) => {
        darkCss += `.app-swatch-bg-${index + 1} {`;
        darkCss += `background-color: ${item.bgDark};}`;
        darkCss += `.app-swatch-bg-i-${index + 1} {`;
        darkCss += `color: ${item.bgDark};}`;
        darkCss += `.app-swatch-fg-${index + 1} {`;
        darkCss += `color: ${item.fgDark};}`;
        darkCss += `.app-swatch-outline-${index + 1} {`;
        darkCss += `border: 1px solid ${item.bgDark};}`;

        lightCss += `.app-swatch-bg-${index + 1} {`;
        lightCss += `background-color: ${item.bgLight};}`;
        lightCss += `.app-swatch-bg-i-${index + 1} {`;
        lightCss += `color: ${item.bgLight};}`;
        lightCss += `.app-swatch-fg-${index + 1} {`;
        lightCss += `color: ${item.fgLight};}`;
        lightCss += `.app-swatch-outline-${index + 1} {`;
        lightCss += `border: 1px solid ${item.bgLight};}`;
      });

      this.generatedCss = `.theme_dark {${darkCss}} .theme_light {${lightCss}} `;
      navigator.clipboard.writeText(this.generatedCss).then(() => console.log('copied'));
    },
    getNewColor() {
      let bgDark = '';
      let bgLight = '';
      let fgDark = '';
      let fgLight = '';
      const bg = tinycolor.random();
      if (bg.getLuminance > 0.8) {
        return this.getNewColor();
      }
      if (bg.isDark()) {
        bgLight = bg.clone().lighten(10).desaturate(10);
        bgDark = bg;
      } else {
        bgLight = bg.desaturate(10);
        bgDark = bg.clone().darken(10);
      }

      fgDark = '#000';
      fgLight = '#000';
      if (bgDark.isDark()) {
        fgDark = '#fff';
      }
      if (bgLight.isDark()) {
        fgLight = '#fff';
      }
      return { bgDark: bgDark.toHexString(), fgDark, bgLight: bgLight.toHexString(), fgLight };
    },
    getNewColorUsingGoldenAngle(n, s, l) {
      let bgDark = '';
      let bgLight = '';
      let fgDark = '';
      let fgLight = '';
      let angle = n * 137;
      if (angle > 360) {
        angle %= 360;
      }
      let angleFactor = n;
      if (angleFactor > 14) {
        angleFactor %= 14;
      }
      // const bg = tinycolor(`hsl(${angle}, ${s}, ${l})`);
      const bg = tinycolor(`hsl(${angleFactor * (360 / 14)}, ${s}, ${l})`);
      if (bg.isDark()) {
        bgLight = bg;
        bgDark = bg.clone().lighten(10);
      } else {
        bgLight = bg.clone().darken(10);
        bgDark = bg;
      }

      fgDark = '#000';
      fgLight = '#000';
      if (bgDark.isDark()) {
        fgDark = '#fff';
      }
      if (bgLight.isDark()) {
        fgLight = '#fff';
      }
      return { bgDark: bgDark.toHexString(), fgDark, bgLight: bgLight.toHexString(), fgLight };
    }
  }
};
</script>
<style lang="scss" scoped>
.swatch-generator {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  column-gap: 10px;
  row-gap: 10px;
  width: 100%;
}
.swatch-generator__form {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 10px;
  column-gap: 10px;
}
</style>
