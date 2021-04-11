<template>
  <div class="edit-detail">
    <app-section>
      <div slot>
        <div class="edit-detail">
          <oak-form :formGroupName="formGroupName" @form-submit="handleSubmit">
            <div class="edit-detail__form">
              <div class="edit-detail__form__element" v-for="column in columns" :key="column.id">
                <!-- <div class="edit-detail__form__element__label">{{ column.name }}</div> -->
                <div class="edit-detail__form__element__value">
                  <datatype-edit
                    :value="state[column.id]"
                    :rowData="rowData"
                    :cellHeader="column"
                    @change="handleChange"
                    :formGroupName="formGroupName"
                  />
                </div>
              </div>
            </div>
          </oak-form>
        </div>
      </div>
    </app-section>
  </div>
</template>

<script lang="ts">
import { addSchemaTableDataMutation } from '@/graphql/addSchemaTableData.mutation';
import { useMutation } from '@vue/apollo-composable';
import { computed, defineComponent } from 'vue';
import { mapGetters, useStore } from 'vuex';
import store from '@/store';
import AppSection from '@/components/ui/AppSection.vue';
import DatatypeEdit from '../DatatypeEdit/index.vue';

export default defineComponent({
  name: 'EditDetail',
  computed: {
    ...mapGetters(['getProfile'])
  },
  props: {
    tableId: String,
    rowData: Object,
    formGroupName: String
  },
  components: { DatatypeEdit, AppSection },
  mounted() {
    this.refreshStateValue();
  },
  methods: {
    handleChange(event: any) {
      this.state = { ...this.state, [event.detail.name]: event.detail.value };
    },
    handleSubmit(event: any) {
      if (event.detail.isValid) {
        this.mutate({
          payload: {
            id: this.rowData?.id,
            tableId: this.tableId,
            row: this.state
          }
        }).then((response) => {
          store.dispatch('editRecord', response.data.addSchemaTableData);
          this.$emit('saved', response.data.addSchemaTableData);
        });
      }
    },
    refreshStateValue() {
      if (this.columns && this.rowData) {
        const localState: any = {};
        this.columns.forEach((column: any) => {
          localState[column.id] = this.rowData?.row[column.id];
        });
        this.state = { ...localState };
      }
    }
  },
  data() {
    return {
      state: {},
      mutate: useMutation(addSchemaTableDataMutation, () => ({
        variables: {}
      })).mutate
    };
  },
  setup(props) {
    const storeVuex = useStore();
    const columns = computed(() => storeVuex.getters.getColumnByTable(props.tableId));
    return { columns };
  },
  watch: {
    columns() {
      this.refreshStateValue();
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.edit-detail {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.edit-detail {
}
.edit-detail__form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  column-gap: 20px;
}
.edit-detail__form__element {
  display: flex;
  flex-direction: column;
}
.edit-detail__form__element__label {
  font-weight: 600;
}
.edit-detail__form__element__value {
}
</style>
