<template>
  <div v-if="selectedRecords?.length > 0">
    <sidepane-heading
      :heading="`Edit #${selectedRecords[0].reference}`"
      @close="$emit('close')"
      @expand="$emit('expand')"
      @collapse="$emit('collapse')"
      :isSidepaneExpanded="isSidepaneExpanded"
    />
    <action-bar-edit :formGroupName="formId" />
    <edit-detail
      :rowData="selectedRecords[0]"
      :tableId="tableId"
      :formGroupName="formId"
      @saved="$emit('saved', $event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EditDetail from '@/components/ViewRecord/EditDetail.vue';
import { useStore } from 'vuex';
import { uuid } from 'uuidv4';
import SidepaneHeading from '@/components/ui/SidepaneHeading.vue';
import ActionBarEdit from './ActionBarEdit.vue';

export default defineComponent({
  name: 'EditRecord',
  components: { EditDetail, ActionBarEdit, SidepaneHeading },
  setup() {
    const formId = uuid();
    return { formId };
  },
  props: {
    selectedRecords: Array,
    tableId: String,
    isSidepaneExpanded: Boolean
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
