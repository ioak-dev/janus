<template>
  <div class="create-table">
    <oak-typography :variant="state.name">{{ state.name }}</oak-typography>
    <oak-form formGroupName="hello-form" @form-submit="handleSubmit">
      <oak-input
        type="text"
        label="Process name"
        name="name"
        placeholder="Name of the business process"
        :value="state.name"
        @input-input="handleChange"
        formGroupName="hello-form"
        minLength="5"
        gutterBottom
      />
      <oak-input
        type="text"
        name="description"
        placeholder="Brief description about the business process"
        label="Process description"
        :value="state.description"
        @input-input="handleChange"
        formGroupName="hello-form"
        minLength="10"
        gutterBottom
      />
      <oak-form-actions-container align="right">
        <oak-button theme="primary" variant="regular" type="submit" formGroupName="hello-form"
          >Create</oak-button
        >
        <oak-button theme="info" variant="appear" @button-click="goBack">Cancel</oak-button>
      </oak-form-actions-container>
    </oak-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CreateTable',
  props: {
    msg: String
  },
  data() {
    return {
      state: { name: '', description: '' }
    };
  },
  methods: {
    handleChange(event: any) {
      this.state = { ...this.state, [event.detail.name]: event.detail.value };
    },
    goBack(event: any) {
      this.$router.go(-1);
    },
    handleSubmit(event: any) {
      console.log(event);
      console.log(this.state.name);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
