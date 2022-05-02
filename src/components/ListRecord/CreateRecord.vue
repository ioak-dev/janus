<template>
  <div class="create-record">
    <sidepane-heading
      :heading="record ? `Clone based on #${record.reference}` : 'Create new record'"
      @close="$emit('close')"
      @expand="$emit('expand')"
      @collapse="$emit('collapse')"
      :isSidepaneExpanded="isSidepaneExpanded"
    />
    <div class="sidepane-main">
      <action-bar-create @close="$emit('close')" :formGroupName="formId" />
      <app-section>
        <div slot>
          <div class="edit-detail">
            <oak-form :formGroupName="formId" @form-submit="handleSubmit">
              <div class="create-record__form">
                <div
                  class="create-record__form__element"
                  v-for="column in columns"
                  :key="column.id"
                >
                  <!-- <div class="create-record__form__element__label">{{ column.name }}</div> -->
                  <div class="create-record__form__element__value">
                    <datatype-edit
                      :value="state[column.id]"
                      :rowData="rowData"
                      :cellHeader="column"
                      @change="handleChange"
                      :formGroupName="formId"
                    />
                  </div>
                </div>
              </div>
            </oak-form>
          </div>
        </div>
      </app-section>
    </div>
  </div>
</template>

<script lang="ts">
import { addSchemaTableDataMutation } from '@/graphql/addSchemaTableData.mutation';
import { useMutation } from '@vue/apollo-composable';
import { computed, defineComponent } from 'vue';
import { mapGetters, useStore } from 'vuex';
import store from '@/store';
import { v4 as uuidv4 } from 'uuid';
import DatatypeEdit from '@/components/DatatypeEdit/index.vue';
import AppSection from '@/components/ui/AppSection.vue';
import SidepaneHeading from '@/components/ui/SidepaneHeading.vue';
import ActionBarCreate from './ActionBarCreate.vue';

export default defineComponent({
  name: 'EditDetail',
  props: {
    tableId: String,
    record: Object,
    filter: Object,
    isSidepaneExpanded: Boolean
  },
  data() {
    return {
      state: {},
      formId: uuidv4()
    };
  },
  components: { DatatypeEdit, ActionBarCreate, SidepaneHeading, AppSection },
  setup(props) {
    const storeVuex = useStore();
    const columns = computed(() => storeVuex.getters.getColumnByTable(props.tableId));

    const { mutate } = useMutation(addSchemaTableDataMutation);

    return { mutate, columns };
  },
  methods: {
    handleChange(event: any) {
      this.state = { ...this.state, [event.detail.name]: event.detail.value };
    },
    handleSubmit(event: any) {
      this.mutate({
        payload: {
          tableId: this.tableId,
          row: this.state
        }
      }).then((response: any) => {
        store.dispatch('appendRecord', {
          secondary: false,
          payload: [response.data.addSchemaTableData]
        });
        this.state = {};
        this.$emit('saved');
      });
    }
  },
  mounted() {
    if (this.record?.row) {
      this.state = { ...this.record.row };
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
.create-record__form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  column-gap: 20px;
}
</style>
