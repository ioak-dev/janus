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

<script lang="ts">
import { allSchemaTableColumnQuery } from '@/graphql/allSchemaTableColumn.query';
import { updateSchemaTableColumnMutation } from '@/graphql/updateSchemaTableColumn.mutation';
import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import { defineComponent, ref, watch } from 'vue';
import { mapGetters } from 'vuex';
import { defaultClient } from '@/apollo';
import AppSection from '@/components/ui/AppSection.vue';
import FieldView from './FieldView.vue';
import ActionBar from './ActionBar.vue';

export default defineComponent({
  name: 'FieldListing',
  components: { FieldView, ActionBar, AppSection },
  computed: {
    ...mapGetters(['getProfile'])
  },
  props: {
    tableId: String
  },
  data() {
    return {
      originalState: [] as any,
      state: [] as any,
      editing: false
    };
  },
  mounted() {
    this.fetchColumns();
  },
  methods: {
    fetchColumns() {
      defaultClient
        .query({
          query: allSchemaTableColumnQuery,
          variables: { tableId: this.tableId }
        })
        .then((response) => {
          if (response) {
            this.originalState = [...response.data.allSchemaTableColumn];
            this.state = [...response.data.allSchemaTableColumn];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleChange(detail: any, index: number) {
      this.state[index] = { ...this.state[index], [detail.name]: detail.value };
      this.editing = true;
    },
    handleDelete(index: number) {
      this.state = this.state.filter((_: any, localIndex: number) => index !== localIndex);
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
      console.log(this.state);
      const payload: any = [];
      this.state.forEach((field: any) => {
        payload.push({
          id: field.id,
          name: field.name,
          datatype: field.datatype,
          tableId: field.tableId,
          indicator: field.indicator,
          meta: field.meta
        });
      });
      this.mutate({ payload });
      this.editing = false;
    }
  },
  setup(props) {
    const { mutate } = useMutation(updateSchemaTableColumnMutation, () => ({
      update: (cache, mutationResult) => {
        const data: any = cache.readQuery({
          query: allSchemaTableColumnQuery,
          variables: {
            tableId: props.tableId
          }
        });
        console.log(data, mutationResult);
        cache.writeQuery({
          query: allSchemaTableColumnQuery,
          variables: {
            tableId: props.tableId
          },
          data: {
            allSchemaTableColumn: [...mutationResult.data.updateSchemaTableColumn]
          }
        });
      }
    }));
    return {
      mutate
    };
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
