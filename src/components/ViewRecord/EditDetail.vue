<template>
  <div class="edit-detail">
    <action-bar-edit :closeEdit="closeEdit" @save="handleSubmit" />
    <app-section>
      <div slot>
        <div class="edit-table-detail">
          <oak-form formGroupName="edit-table-detail-form" @form-submit="handleSubmit">
            <div class="edit-table-detail__form">
              <div
                class="edit-table-detail__form__element"
                v-for="column in columnHeaders"
                :key="column.id"
              >
                <!-- <div class="edit-table-detail__form__element__label">{{ column.name }}</div> -->
                <div class="edit-table-detail__form__element__value">
                  <datatype-edit
                    :value="state[column.id]"
                    :rowData="rowData"
                    :cellHeader="column"
                    @change="handleChange"
                    formGroupName="edit-table-detail-form"
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
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import store from '@/store';
import AppSection from '@/components/ui/AppSection.vue';
import ActionBarEdit from './ActionBarEdit.vue';
import DatatypeEdit from '../DatatypeEdit/index.vue';

export default defineComponent({
  name: 'EditDetail',
  computed: {
    ...mapGetters(['getProfile'])
  },
  props: {
    tableId: String,
    closeEdit: Function,
    columnHeaders: Array,
    rowData: Object
  },
  components: { DatatypeEdit, AppSection, ActionBarEdit },
  mounted() {
    this.refreshStateValue();
  },
  methods: {
    handleChange(event: any) {
      console.log(event);
      this.state = { ...this.state, [event.detail.name]: event.detail.value };
    },
    handleSubmit(event: any) {
      this.mutate({
        payload: {
          id: this.rowData?.id,
          tableId: this.tableId,
          row: this.state
        }
      }).then((response) => {
        if (this.closeEdit) {
          this.closeEdit();
        }
        store.dispatch('editRecord', response.data.addSchemaTableData);
        this.$emit('saved');
      });
    },
    refreshStateValue() {
      if (this.columnHeaders && this.rowData) {
        const localState: any = {};
        this.columnHeaders.forEach((column: any) => {
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
  watch: {
    columnHeaders() {
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
.edit-table-detail {
}
.edit-table-detail__form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  column-gap: 20px;
}
.edit-table-detail__form__element {
  display: flex;
  flex-direction: column;
}
.edit-table-detail__form__element__label {
  font-weight: 600;
}
.edit-table-detail__form__element__value {
}
</style>
