<template>
  <div class="filter-listing">
    <app-section subtle>
      <div slot>
        <div>
          <div v-for="filter in filters" :key="filter.id">
            <oak-click-area @click-area-click="goToFilter(filter.id)">
              <div class="filter-listing__filter-item">
                {{ filter.name }}
              </div></oak-click-area
            >
          </div>
        </div>
      </div>
    </app-section>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import AppSection from '@/components/ui/AppSection.vue';
import { useAddSchemaTableDataMutation } from './FilterService';

export default defineComponent({
  name: 'FilterListing',
  props: {
    tableId: String,
    closeEdit: Function
  },
  components: { AppSection },
  setup(props) {
    const store = useStore();
    const columns = computed(() => store.getters.getColumnByTable(props.tableId));
    const filters = computed(() => store.getters.getFilterByTable(props.tableId));
    const tableMutate = useAddSchemaTableDataMutation(props.tableId);

    return { columns, filters, tableMutate };
  },
  methods: {
    handleChange(event) {
      console.log(event);
      this.state = { ...this.state, [event.detail.name]: event.detail.value };
    },
    handleSubmit(event) {
      this.mutate({
        payload: {
          tableId: this.tableId,
          row: this.state
        }
      }).then(() => {
        if (this.closeEdit) {
          this.closeEdit();
        }
        this.state = {};
        this.$emit('saved');
      });
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.filter-listing {
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  width: 100%;
}

.filter-listing__filter-item {
  padding: 10px 6px;
  width: 100%;
  // background-color: var(--color-container);
  &:hover {
    background-color: var(--color-primary-semitransparent2);
    cursor: pointer;
  }
}
</style>
