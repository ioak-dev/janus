<template>
  <div class="user-view-datatype">
    <div v-for="user in users" :key="user.id" class="`user-view-datatype__item">
      <div class="user-view-datatype__item__value">{{ `${user.firstName} ${user.lastName}` }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { mapGetters, useStore } from 'vuex';

export default defineComponent({
  name: 'UserViewDatatype',
  props: {
    rowData: Object,
    cellHeader: Object
  },
  setup(props) {
    const store = useStore();
    const users = computed(() =>
      store.getters.getUser.filter((item: any) =>
        props.rowData?.row[props.cellHeader?.id]?.includes(item.id)
      )
    );

    return { users };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.user-view-datatype {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
}
.user-view-datatype__item {
  display: flex;
  gap: 4px;
  padding: 6px 8px;
  border-radius: 4px;
  font-size: 12px;
}
</style>
