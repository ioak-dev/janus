<template>
  <div class="relation-edit-datatype">
    <div>
      <oak-typography variant="body2"> {{ cellHeader.name }}</oak-typography>
    </div>
    <div>
      {{ value }}
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
        secondaryGrid
        @record-toggled="handleRecordToggled"
        @record-selected="handleRecordSelected"
      />
    </div>
  </oak-sheet>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Datagrid from '@/components/ListRecord/Datagrid.vue';

export default defineComponent({
  name: 'RelationFormDatatype',
  components: { Datagrid },
  props: {
    value: Object,
    cellHeader: Object,
    rowData: Object
  },
  data() {
    return {
      showChoosePrompt: false,
      selectedRecords: [] as string[]
    };
  },
  methods: {
    openChoosePrompt() {
      this.showChoosePrompt = true;
    },
    closeChoosePrompt() {
      this.showChoosePrompt = false;
    },
    handleRecordToggled(recordId: string, add: boolean) {
      if (add) {
        this.selectedRecords = [...this.selectedRecords, recordId];
      } else {
        this.selectedRecords = this.selectedRecords.filter((item) => item !== recordId);
      }
    },
    handleRecordSelected(recordId: string) {
      this.selectedRecords = [recordId];
    },
    handleChange() {
      console.log(this.selectedRecords[0]);
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
}
.sheet-container {
  display: grid;
  grid-auto-flow: row;
}
</style>
