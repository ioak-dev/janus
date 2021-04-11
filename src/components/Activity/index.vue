<template>
  <div>
    <sidepane-heading
      heading="Recent activity"
      @close="$emit('close')"
      @expand="$emit('expand')"
      @collapse="$emit('collapse')"
      :isSidepaneExpanded="isSidepaneExpanded"
    />
    <div class="sidepane-main">
      <action-bar-create @close="$emit('close')" :formGroupName="formId" />
      <app-section>
        <div slot>
          <div class="activity">
            <div v-for="item in result?.activity" :key="item.id" class="activity-item">
              <activity-log :log="item" />
            </div>
          </div>
        </div>
      </app-section>
    </div>
  </div>
</template>

<script lang="ts">
import { activityQuery } from '@/graphql/activity.query';
import { useQuery, useResult } from '@vue/apollo-composable';
import { defineComponent, reactive, ref, watch } from 'vue';
import SidepaneHeading from '@/components/ui/SidepaneHeading.vue';
import ActivityLog from './ActivityLog.vue';

export default defineComponent({
  components: { ActivityLog, SidepaneHeading },
  name: 'Activity',
  props: {
    selectedRecords: Array,
    table: Object,
    isSidepaneExpanded: Boolean
  },
  setup(props) {
    const variables = reactive({
      domains: ['record'],
      parentReference: props.table?.id,
      references: props.selectedRecords
    });
    const { result } = useQuery(activityQuery, variables);

    const updateVariables = () => {
      if (!props.table) {
        return;
      }
      if (props.table && props.table !== variables.parentReference) {
        variables.parentReference = props.table.id;
        variables.references = props.selectedRecords;
      }
      if (props.selectedRecords && props.selectedRecords.length > 0) {
        variables.domains = ['record'];
      } else {
        variables.domains = ['record', 'column'];
      }
    };

    watch(
      () => props.table,
      () => {
        updateVariables();
      }
    );

    watch(
      () => props.selectedRecords,
      () => {
        updateVariables();
      }
    );

    return { result, variables };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.activity {
  // margin: 10px 0;
}
.activity-item {
  margin: 10px 0;
}
</style>
