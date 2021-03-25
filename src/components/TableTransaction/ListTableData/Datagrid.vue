<template>
  <div class="datagrid" v-if="!loading">
    <oak-table navPlacement="none" fill="global" elevation="0" :dense="dense">
      <div :class="tableStyle">
        <table>
          <thead>
            <tr>
              <th className="checkbox"></th>
              <th />
              <th v-for="item in columns" :key="item.id">
                {{ item.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in data"
              :key="item.id"
              :class="chosenRecords.includes(item.id) ? 'active' : ''"
            >
              <td className="checkbox">
                <oak-checkbox
                  :value="chosenRecords.includes(item.id)"
                  :name="item.id"
                  @input-change="toggleRecordSelectionEvent"
                  color="secondary"
                ></oak-checkbox>
              </td>
              <td><oak-link @link-click="goToView(item)" color="primary">Link-125</oak-link></td>
              <!-- <td @click="goToEdit(item)" v-for="column in columns" :key="column.id"> -->
              <td
                @click="
                  $emit('record-toggled', item.id, !chosenRecords.includes(item.id) ? 'active' : '')
                "
                v-for="column in columns"
                :key="column.id"
              >
                <datatype-table-view :rowData="item" :cellHeader="column" />
              </td>
            </tr>
            <tr v-if="data?.length === 0">
              No data present
            </tr>
          </tbody>
        </table>
      </div>
    </oak-table>
  </div>
</template>

<script lang="ts">
import { allSchemaTableColumnQuery } from '@/graphql/allSchemaTableColumn.query';
import { allSchemaTableDataQuery } from '@/graphql/allSchemaTableData.query';
import { compose } from '@oakui/core-stage/style-composer/OakTableComposer';
import { useQuery, useResult } from '@vue/apollo-composable';
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';
import DatatypeTableView from './DatatypeTableView/index.vue';

export default defineComponent({
  name: 'DataGrid',
  props: {
    id: String,
    chosenRecords: Array,
    dense: Boolean
  },
  components: { DatatypeTableView },
  computed: {
    ...mapGetters(['getProfile']),
    tableStyle(): string {
      return compose({ variant: 'outlined', fill: 'global', dense: this.dense });
    }
  },
  methods: {
    goToCreate(event: any) {
      this.$router.push(`/${this.getProfile.space}/app/create`);
    },
    goToEdit(record: any) {
      this.$router.push(`/${this.getProfile.space}/table/${record.tableId}/data/edit/${record.id}`);
    },
    goToView(record: any) {
      this.$router.push(`/${this.getProfile.space}/table/${record.tableId}/data/view/${record.id}`);
    },
    toggleRecordSelectionEvent(event: any) {
      this.$emit('record-toggled', event.detail.name, event.detail.value);
    }
  },
  setup(props) {
    const allSchemaTableColumnQueryOutput = useQuery(
      allSchemaTableColumnQuery,
      ref({
        tableId: props.id
      })
    );
    const allSchemaTableDataQueryOutput = useQuery(
      allSchemaTableDataQuery,
      ref({
        tableId: props.id
      })
    );
    return {
      columns: useResult(allSchemaTableColumnQueryOutput.result),
      data: useResult(allSchemaTableDataQueryOutput.result),
      loading: allSchemaTableColumnQueryOutput.loading || allSchemaTableDataQueryOutput.loading
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
table {
  thead tr th {
    color: var(--color-default-lighter);
    cursor: default;
  }
  tbody tr td {
    cursor: default;
  }
  tbody tr {
    border-top: 1px solid var(--color-info-lighter);
  }
  tbody tr.active,
  tbody tr.active:hover td {
    background-color: var(--color-primary-transparent);
  }
  tbody tr td.checkbox {
    min-width: 0px;
  }
}
</style>
