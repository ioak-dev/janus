<template>
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
              :cellHeader="column"
              @change="handleChange"
              formGroupName="edit-table-detail-form"
            />
          </div>
        </div>
      </div>
      <oak-form-actions-container align="right">
        <oak-button
          theme="primary"
          variant="regular"
          size="xsmall"
          shape="sharp"
          type="click"
          @button-click="handleSubmit"
          formGroupName="edit-table-detail-form"
          >Save changes</oak-button
        >
        <oak-button
          theme="default"
          variant="regular"
          size="xsmall"
          shape="sharp"
          type="click"
          @button-click="closeEdit"
          formGroupName="edit-table-detail-form"
          >Cancel</oak-button
        >
      </oak-form-actions-container>
    </oak-form>
  </div>
</template>

<script lang="ts">
import { addSchemaTableDataMutation } from '@/graphql/addSchemaTableData.mutation';
import { useMutation } from '@vue/apollo-composable';
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import DatatypeEdit from '../../DatatypeEdit/index.vue';

export default defineComponent({
  name: 'EditDetail',
  computed: {
    ...mapGetters(['getProfile'])
  },
  props: {
    closeEdit: Function,
    columnHeaders: Array,
    rowData: Object
  },
  components: { DatatypeEdit },
  mounted() {
    this.refreshStateValue();
  },
  methods: {
    handleChange(event: any) {
      this.state = { ...this.state, [event.detail.name]: event.detail.value };
    },
    handleSubmit(event: any) {
      this.mutate({
        payload: {
          id: this.$route.params.rowId,
          tableId: this.$route.params.id,
          row: this.state
        }
      }).then((response) => {
        if (this.closeEdit) {
          this.closeEdit();
        }
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
