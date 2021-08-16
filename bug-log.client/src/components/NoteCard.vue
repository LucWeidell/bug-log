<template>
  <div class="NoteCard row d-flex flex-column m-0 border border-dark">
    <div class="col-md-12 p-0">
      <div class="row m-0">
        <div class="col-md-4 d-flex bg-yellow border border-dark justify-content-start align-items-center">
          <img :src="note.creator.picture" alt="account-pic" class="w-25">
          <h6>{{ note.creator.name }}</h6>
        </div>
        <div v-if="state.isCreator"
             class="col-md-1 p-0 bg-pencil
                    d-flex justify-content-center align-items-center border border-dark bg-red"
        >
          <i class="far fa-2x fa-times-circle action" @click="removeNote"></i>
        </div>
      </div>
    </div>

    <div class="col-md-10 pt-2 text-left">
      <p>{{ note.body }}</p>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { notesService } from '../services/NotesService'
import Pop from '../utils/Notifier'

export default {
  name: 'NoteCard',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    logger.log('Note Prop:', props.note)
    const state = reactive({
      isCreator: computed(() => props.note.creatorId === AppState.account.id)
    })
    return {
      state,
      async removeNote() {
        try {
          logger.log('I GOT HERE')
          await notesService.removeNote(props.note.id)
          Pop.toast('Removed Message!', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
