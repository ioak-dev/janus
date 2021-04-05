<template>
  <oak-select
    :name="cellHeader.id"
    :label="cellHeader.name"
    :value="value"
    :optionsAsKeyValue="userList"
    @select-input="$emit('change', $event)"
    :formGroupName="formGroupName"
    autocompleteVariant="autocomplete"
    multiple
    gutterBottom
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'UserEditDatatype',
  props: {
    value: Object,
    cellHeader: Object
  },
  setup() {
    const store = useStore();
    const users = computed(() => store.getters.getUser);
    const userList = computed(() =>
      store.getters.getUser.map((item: any) => ({
        id: item.id,
        value: `${item.firstName} ${item.lastName}`
      }))
    );

    return { users, userList };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list-edit-datatype-chip {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
}
.list-edit-datatype-chip__item {
  display: flex;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}
</style>
