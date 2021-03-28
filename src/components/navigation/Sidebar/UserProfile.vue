<template>
  <div class="user-profile">
    <div class="user-profile__avatar" />
    <div class="user-profile__name">User name</div>
  </div>
</template>
<script>
export default {
  name: 'UserProfile'
};
</script>

<style lang="scss">
.user-profile {
  display: grid;
  grid-auto-flow: row;
  justify-items: center;
  margin: 20px 0 40px 0;
  row-gap: 10px;
}
.user-profile__avatar {
  height: 100px;
  width: 100px;
  border-radius: 100%;
  border: 2px solid var(--color-secondary);
}
</style>
