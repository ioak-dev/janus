<template>
  <div class="create-record">
    <action-bar-create @save="handleSubmit" @close="$emit('close')" />
    <app-section subtle>
      <div slot>
        <div class="create-record">
          <oak-form formGroupName="create-record-form" @form-submit="handleSubmit">
            <div class="create-record__form">
              <div
                class="create-record__form__element"
                v-for="column in columnHeaders"
                :key="column.id"
              >
                <!-- <div class="create-record__form__element__label">{{ column.name }}</div> -->
                <div class="create-record__form__element__value">
                  <datatype-edit
                    :value="state[column.id]"
                    :rowData="rowData"
                    :cellHeader="column"
                    @change="handleChange"
                    formGroupName="create-record-form"
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
import { allSchemaTableDataQuery } from '@/graphql/allSchemaTableData.query';
import { searchSchemaTableDataQuery } from '@/graphql/searchSchemaTableData.query';
import AppSection from '@/components/ui/AppSection.vue';
import DatatypeEdit from '@/components/DatatypeEdit/index.vue';
import ActionBarCreate from './ActionBarCreate.vue';

export default defineComponent({
  name: 'EditDetail',
  computed: {
    ...mapGetters(['getProfile'])
  },
  props: {
    tableId: String,
    closeEdit: Function,
    columnHeaders: Array,
    record: Object,
    filter: Object
  },
  data() {
    return {
      state: {},
      mutate: null as any
    };
  },
  components: { DatatypeEdit, AppSection, ActionBarCreate },
  mounted() {
    const { mutate } = useMutation(addSchemaTableDataMutation);
    this.mutate = mutate;
  },
  methods: {
    handleChange(event: any) {
      console.log(event);
      this.state = { ...this.state, [event.detail.name]: event.detail.value };
    },
    handleSubmit(event: any) {
      console.log('*******');
      this.mutate({
        payload: {
          tableId: this.tableId,
          row: this.state
        }
      }).then((response: any) => {
        store.dispatch('appendRecord', [response.data.addSchemaTableData]);
        if (this.closeEdit) {
          this.closeEdit();
        }
        this.state = {};
        this.$emit('saved');
      });
    }
  },
  watch: {
    record(newVal: any, oldVal: any) {
      if (newVal?.row) {
        this.state = { ...newVal.row };
      } else {
        this.state = {};
      }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.create-record {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.create-record__form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  column-gap: 20px;
}
.create-record__form__element {
  display: flex;
  flex-direction: column;
}
.create-record__form__element__label {
  font-weight: 600;
}
</style>
