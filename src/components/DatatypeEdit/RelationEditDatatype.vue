<template>
  <div class="relation-edit-datatype">
    <div>
      <oak-typography variant="body2"> {{ cellHeader.name }}</oak-typography>
    </div>
    <div>
      <div v-for="(item, index) in selectedRecordsObject" :key="index">
        {{ item.row[cellHeader.meta.columnId] }}
      </div>
      <oak-link @link-click="openChoosePrompt" color="primary">Choose</oak-link>
    </div>
  </div>
  <oak-sheet
    fillColor="global"
    position="bottom"
    sizeVertical="two-third"
    sizeHorizontal="full"
    :isOpen="showChoosePrompt"
    @sheet-close="closeChoosePrompt"
  >
    <div class="sheet-container">
      <app-section subtle>
        <div slot>
          <div class="app-action-bar">
            <div>
              <oak-button
                theme="primary"
                :variant="selectedRecords.length > 0 ? 'appear' : 'appear'"
                shape="sharp"
                @button-click="handleChange"
                ><font-awesome-icon :icon="['fas', 'plus']" />Choose selected</oak-button
              >
            </div>
          </div>
        </div>
      </app-section>
      <datagrid
        :id="cellHeader?.meta?.tableId"
        :selectedRecords="selectedRecords"
        @record-toggled="handleRecordToggled"
        @record-selected="handleRecordSelected"
      />
    </div>
  </oak-sheet>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import { mapGetters, useStore } from 'vuex';
import Datagrid from '@/components/ListRecord/Datagrid.vue';

export default defineComponent({
  name: 'RelationEditDatatype',
  components: { Datagrid },
  props: {
    value: Object,
    cellHeader: Object,
    rowData: Object
  },
  data() {
    return {
      showChoosePrompt: false,
      selectedRecords: [] as any[],
      selectedRecordsObject: [] as any[]
    };
  },
  mounted() {
    if (this.rowData?.relation[this.cellHeader?.id]?.length > 0) {
      this.selectedRecordsObject = [...this.rowData?.relation[this.cellHeader?.id]];
      if (this.selectedRecordsObject) {
        this.selectedRecordsObject.forEach((item) => {
          this.selectedRecords.push(item._id);
        });
      }
    }
  },
  methods: {
    openChoosePrompt() {
      this.showChoosePrompt = true;
    },
    closeChoosePrompt() {
      this.showChoosePrompt = false;
    },
    handleRecordToggled(record: any, add: boolean) {
      if (add) {
        this.selectedRecords = [...this.selectedRecords, record.id];
        this.selectedRecordsObject = [...this.selectedRecords, record];
      } else {
        this.selectedRecords = this.selectedRecords.filter((item) => item !== record.id);
        this.selectedRecordsObject = this.selectedRecordsObject.filter(
          (item) => item !== record.id
        );
      }
    },
    handleRecordSelected(record: any) {
      this.selectedRecords = [record.id];
      this.selectedRecordsObject = [record];
    },
    handleChange() {
      this.$emit('change', {
        detail: {
          name: this.cellHeader?.id,
          value: this.selectedRecords[0]
        }
      });
      this.closeChoosePrompt();
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.relation-edit-datatype {
  margin-bottom: 10px;
}
.sheet-container {
  display: grid;
  grid-auto-flow: row;
}
</style>
