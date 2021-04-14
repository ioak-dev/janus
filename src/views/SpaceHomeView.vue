<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SpaceHomeView',
  mounted() {
    this.$router.push({ name: 'ListSchemaView' });
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
