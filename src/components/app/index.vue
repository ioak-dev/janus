<template>
  <div class="app">
    <oak-form-actions-container align="left">
      <oak-button theme="primary" variant="regular" @button-click="goToCreate">Create</oak-button>
    </oak-form-actions-container>
    <oak-typography variant="h6">List of processes will be shown here</oak-typography>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  methods: {
    goToCreate(event: any) {
      console.log(event);
      this.$router.push('/app/create');
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app {
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
