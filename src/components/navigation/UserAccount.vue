<template>
  <div class="user-account">
    {{ getProfile.auth.firstName }}
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'UserAccount',
  computed: { ...mapGetters(['getProfile']) }
};
</script>
<style lang="scss" scoped></style>
