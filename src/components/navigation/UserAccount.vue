<template>
  <div class="user-account">
    {{ `${getProfile.auth.given_name} ${getProfile.auth.family_name}` }}
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
