<template>
  <action-bar @save="save" @add="add" @reset="reset" :editing="editing" />
  <app-section subtle>
    <div slot>
      <div class="field-listing">
        <div v-for="(field, index) in state" :key="field.id">
          <field-view
            :field="field"
            @change="handleChange($event, index)"
            @delete="handleDelete(index)"
          />
        </div>
      </div>
    </div>
  </app-section>
</template>

<script>
import { updateSchemaTableColumnMutation } from '@/graphql/updateSchemaTableColumn.mutation';
import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import { defineComponent, ref, watch } from 'vue';
import { mapGetters } from 'vuex';
import AppSection from '@/components/ui/AppSection.vue';
import { allSchemaTableColumnBySchemaIdQuery } from '@/graphql/allSchemaTableColumnBySchemaId.query';
import { columnDefinitionChangedSubject } from '@/events/ColumnDefinitionChangedEvent';
import FieldView from './FieldView.vue';
import ActionBar from './ActionBar.vue';

export default defineComponent({
  name: 'FieldListing',
  components: { FieldView, ActionBar, AppSection },
  computed: {
    ...mapGetters(['getProfile', 'getColumnByTable']),
    columns() {
      return this.getColumnByTable(this.tableId);
    }
  },
  props: {
    tableId: String
  },
  data() {
    return {
      originalState: [],
      state: [],
      editing: false,
      mutate: null
    };
  },
  mounted() {
    if (this.columns) {
      this.originalState = [...this.columns];
      this.state = [...this.columns];
    }
    const { mutate } = useMutation(updateSchemaTableColumnMutation, () => ({
      update: (cache, mutationResult) => {
        const data = cache.readQuery({
          query: allSchemaTableColumnBySchemaIdQuery,
          variables: {
            schemaId: this.getProfile.schema
          }
        });
        console.log(data, mutationResult);
        cache.writeQuery({
          query: allSchemaTableColumnBySchemaIdQuery,
          variables: {
            schemaId: this.getProfile.schema
          },
          data: {
            allSchemaTableColumnBySchemaId: [
              data.allSchemaTableColumnBySchemaId.filter((item) => item.tableId !== this.tableId),
              ...mutationResult.data.updateSchemaTableColumn
            ]
          }
        });
      }
    }));
    this.mutate = mutate;
  },
  methods: {
    handleChange(detail, index) {
      this.state[index] = { ...this.state[index], [detail.name]: detail.value };
      this.editing = true;
    },
    handleDelete(index) {
      this.state = this.state.filter((_, localIndex) => index !== localIndex);
      this.editing = true;
    },
    add() {
      this.state = [...this.state, { tableId: this.tableId, meta: {} }];
      this.editing = true;
    },
    reset() {
      this.state = [...this.originalState];
      this.editing = false;
    },
    save() {
      const payload = [];
      this.state.forEach((field) => {
        payload.push({
          id: field.id,
          name: field.name,
          datatype: field.datatype,
          tableId: field.tableId,
          indicator: field.indicator,
          meta: field.meta
        });
      });
      this.mutate({ payload }).then((response) => {
        columnDefinitionChangedSubject.next({ tableId: this.tableId });
      });
      this.editing = false;
    }
  },
  watch: {
    columns(newVal, _) {
      this.originalState = [...newVal];
      this.state = [...newVal];
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.field-listing {
  display: grid;
  grid-auto-flow: row;
  row-gap: 10px;
  margin-bottom: 20px;
}
</style>
