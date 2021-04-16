<template>
  <div class="manage-table">
    <sidepane-heading
      heading="Table settings"
      @close="$emit('close')"
      @expand="$emit('expand')"
      @collapse="$emit('collapse')"
      :isSidepaneExpanded="isSidepaneExpanded"
    />
    <div class="sidepane-main">
      <action-bar @save="save" @add="add" @reset="reset" :editing="editing" />
      <app-section subtle>
        <div slot>
          <div class="field-listing">
            <div v-for="(field, index) in state?.current" :key="field.id">
              <field-view
                :field="field"
                @change="handleChange($event, index)"
                @delete="handleDelete(index)"
              />
            </div>
          </div>
        </div>
      </app-section>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, ref } from 'vue';
import { mapGetters, useStore } from 'vuex';
import { updateSchemaTableColumnMutation } from '@/graphql/updateSchemaTableColumn.mutation';
import { useMutation } from '@vue/apollo-composable';
import { isEqual } from 'lodash';
import AppSection from '@/components/ui/AppSection.vue';
import { allSchemaTableColumnBySchemaIdQuery } from '@/graphql/allSchemaTableColumnBySchemaId.query';
import { columnDefinitionChangedSubject } from '@/events/ColumnDefinitionChangedEvent';
import SidepaneHeading from '@/components/ui/SidepaneHeading.vue';
import FieldView from './FieldView.vue';
import ActionBar from './ActionBar.vue';

export default defineComponent({
  name: 'ColumnSettings',
  components: { ActionBar, FieldView, AppSection, SidepaneHeading },
  props: { tableId: String, isSidepaneExpanded: Boolean },
  setup(props) {
    const store = useStore();
    const isEdit = ref(false);

    const columns = computed(() => store.getters.getColumnByTable(props.tableId));
    const allColumns = computed(() => store.getters.getColumn);
    const profile = computed(() => store.getters.getProfile);
    const state = reactive({ current: [...columns.value], original: [...columns.value] });
    const editing = computed(() => !isEqual(state.current, state.original));

    const { mutate } = useMutation(updateSchemaTableColumnMutation);
    // , () => ({
    //   update: (cache, mutationResult) => {
    //     const data = cache.readQuery({
    //       query: allSchemaTableColumnBySchemaIdQuery,
    //       variables: {
    //         schemaId: profile.value.schema
    //       }
    //     });
    //     cache.writeQuery({
    //       query: allSchemaTableColumnBySchemaIdQuery,
    //       variables: {
    //         schemaId: profile.value.schema
    //       },
    //       data: {
    //         allSchemaTableColumnBySchemaId: [
    //           ...data.allSchemaTableColumnBySchemaId.filter(
    //             (item) => item.tableId !== props.tableId
    //           ),
    //           ...mutationResult.data.updateSchemaTableColumn
    //         ]
    //       }
    //     });
    //   }
    // }));
    return { isEdit, columns, state, mutate, editing, profile, allColumns };
  },
  methods: {
    handleChange(detail, index) {
      this.state.current[index] = { ...this.state.current[index], [detail.name]: detail.value };
      this.editing = true;
    },
    handleDelete(index) {
      this.state.current = this.state.current.filter((_, localIndex) => index !== localIndex);
      this.editing = true;
    },
    add() {
      this.state.current.push({ tableId: this.tableId, meta: {} });
      this.editing = true;
    },
    reset() {
      this.state.current = [...this.state.original];
      this.editing = false;
    },
    save() {
      const payload = [];
      this.state.current.forEach((field) => {
        payload.push({
          id: field.id,
          name: field.name,
          datatype: field.datatype,
          tableId: field.tableId,
          indicator: field.indicator,
          meta: field.meta,
          options: field.options
        });
      });
      this.mutate({ payload }).then((response) => {
        columnDefinitionChangedSubject.next({
          tableId: this.tableId,
          columnList: response.data.updateSchemaTableColumn
        });
      });
      this.editing = false;
    }
  },
  watch: {
    columns(newVal, _) {
      this.state.original = [...newVal];
      this.state.current = [...newVal];
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.manage-table {
}
</style>
