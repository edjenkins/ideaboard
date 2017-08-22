<template lang="pug">
.tab-content--activity
  h1.tab--header.no-parent
    | Recent Activity
    .tab--header--action Refresh

  .tab--content
    p {{ currentUser.profile.name }} hasn't been busy lately.
</template>

<script>
export default {
  name: 'activity-tab',
  props: ['currentUser']
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.tab-content--activity
  text-align left
  .tab--content
    padding 25px  
    p
      reset()

</style>
