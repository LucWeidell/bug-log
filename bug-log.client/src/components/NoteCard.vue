<template>
  <div class="NoteCard row d-flex flex-column m-0">
    <div class="col-md-12 p-0">
      <div class="row m-0">
        <div class="col-md-3 bg-yellow border border-dark justify-content-start">
          <img :src="state.bug.creator.picture" alt="account-pic" class="w-75">
          <h6>{{ note.creator.name }}</h6>
        </div>
        <div v-if="state.isCreator" class="col-md-1 p-0 bg-pencil d-flex justify-content-center border border-dark bg-red">
          <i class="far fa-2x fa-times-circle action" data-toggle="modal" :data-target="'#bug-edit-' + state.bug.id"></i>
        </div>
      </div>
    </div>

    <div class="col-md-10 pt-3 mx-5 text-left">
      <p>{{ note.body }}</p>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'

export default {
  name: 'NoteCard',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      isCreator: computed(() => props.note.creatorId === AppState.account.id)
    })
    return { state }
  }
}
</script>

<style lang="scss" scoped>

</style>
