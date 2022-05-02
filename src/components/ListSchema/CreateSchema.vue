<template>
  <div class="create-schema">
    <sidepane-heading
      :heading="
        edit ? `Edit #${schema.id}` : schema ? `Clone based on #${schema.id}` : 'Create new schema'
      "
      @close="$emit('close')"
      @expand="$emit('expand')"
      @collapse="$emit('collapse')"
      :isSidepaneExpanded="isSidepaneExpanded"
    />
    <div class="sidepane-main">
      <action-bar-create @close="$emit('close')" :formGroupName="formId" />
      <app-section>
        <div>
          <div>
            <oak-form :formGroupName="formId" @form-submit="handleSubmit">
              <oak-input
                name="name"
                :value="state.name"
                :formGroupName="formId"
                @input-input="handleChange"
                label="Schema name"
                gutterBottom
              />
              <oak-input
                name="description"
                :value="state.description"
                :formGroupName="formId"
                @input-input="handleChange"
                label="Description"
                gutterBottom
              />
            </oak-form>
          </div>
        </div>
      </app-section>
    </div>
  </div>
</template>

<script lang="ts">
import { updateSchemaMutation } from '@/graphql/updateSchema.mutation';
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
  name: 'CreateSchema',
  props: {
    schema: Object,
    isSidepaneExpanded: Boolean,
    edit: Boolean
  },
  data() {
    return {
      state: {} as any,
      formId: uuidv4()
    };
  },
  components: { ActionBarCreate, SidepaneHeading, AppSection },
  setup(props) {
    const storeVuex = useStore();

    const { mutate } = useMutation(updateSchemaMutation);

    return { mutate };
  },
  methods: {
    handleChange(event: any) {
      this.state = { ...this.state, [event.detail.name]: event.detail.value };
    },
    handleSubmit(event: any) {
      this.mutate({
        payload: {
          id: this.edit ? this.schema?.id : null,
          name: this.state.name,
          description: this.state.description
        }
      }).then((response: any) => {
        store.dispatch('appendSchema', response.data.updateSchema);
        this.state = {};
        this.$emit('saved');
      });
    }
  },
  mounted() {
    if (this.schema) {
      this.state = { ...this.schema };
    }
  },
  watch: {
    schema(newVal: any, oldVal: any) {
      if (newVal) {
        this.state = { ...newVal };
      } else {
        this.state = {};
      }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.create-schema__form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  column-gap: 20px;
}
</style>
