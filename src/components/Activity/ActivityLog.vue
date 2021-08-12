<template>
  <div class="activity-log">
    <app-section> {{ `${user?.given_name} ${user?.family_name}` }} {{ text }} </app-section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue';
import AppSection from '@/components/ui/AppSection.vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ActivityLog',
  components: { AppSection },
  props: {
    log: Object
  },
  setup(props) {
    const store = useStore();
    const user = computed(() =>
      store.getters.getUser.find((item: any) => item.id === props.log?.userId)
    );

    const buildText = () => {
      let _text = '';
      if (props.log?.domain === 'record' && props.log?.operation === 'ADD') {
        _text += `Created new record ${props.log.reference}`;
      } else if (props.log?.domain === 'record' && props.log?.operation === 'DELETE') {
        _text += `Deleted ${props.log.reference?.length} record${
          props.log.reference?.length > 1 ? 's' : ''
        }`;
      } else if (props.log?.domain === 'record' && props.log?.operation === 'EDIT') {
        _text += `Updated ${props.log.fields.toString()} fields of record ${props.log.reference}`;
      } else if (props.log?.domain === 'column' && props.log?.operation === 'ADD') {
        _text += `Added new column ${props.log.reference}`;
      } else if (props.log?.domain === 'column' && props.log?.operation === 'EDIT') {
        _text += `Updated ${props.log.fields.toString()} fields of column definition ${
          props.log.reference
        }`;
      }
      return _text;
    };
    const text = computed(() => buildText());

    return { user, text };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.activity-log {
  font-size: 12px;
}
</style>
