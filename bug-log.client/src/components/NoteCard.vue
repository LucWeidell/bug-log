<template>
  <div class="NoteCard row d-flex flex-column m-0">
    <div class="col md-12">
      This is this Notes pages
      <p>{{ note.body }}</p>
      <img :src="note.creator.picture" alt="account-pic">
      <p>{{ note.creator.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoteCard',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
