<template>
  <div class="BugDetails row mx-0 mt-2 flex-grow-1 d-flex flex-column">
    <div class="col-md-12">
      <div class="row m-0 d-flex flex-row">
        <div class="col-md-4">
          <h4>{{ state.bug.title }}</h4>
        </div>
        <div v-if="isCreator && (state.bug.closed === false)" class="col-md-1">
          <i class="fa fa-pencil" data-toggle="modal" :data-target="'#bug-edit-' + state.bug.id"></i>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal for Edits -->
  <div class="modal fade"
       :id="'bug-edit-'+state.bug.id"
       tabindex="-1"
       role="dialog"
       :aria-labelledby="'modelTitleId'+state.bug.id"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Edit Bug
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="editBug">
            <div class="form-group">
              <label :for="'title'+state.bug.id" class="">title </label>
              <input class="mb-2 ml-2"
                     type="string"
                     :name="'title'+state.bug.id"
                     :id="'title'+state.bug.id"
                     placeholder="title..."
                     required
                     v-model="state.bugCopy.title"
              >
              <label :for="'description'+state.bug.id" class="">description </label>
              <input class="mb-2 ml-2"
                     type="string"
                     :name="'description'+state.bug.id"
                     :id="'description'+state.bug.id"
                     placeholder="0"
                     required
                     v-model="state.bugCopy.description"
              >
              <div class="form-group">
                <label for="status">Status:&nbsp; </label>
                <select class="form-control action" name="status" id="status" v-model="state.bug.closed" required>
                  <option value="false">
                    Open
                  </option>
                  <option value="true">
                    Closed
                  </option>
                </select>
              </div>
              <div v-if="state.bugCopy.closed === 'true'" class="form-group">
                <label for="closeDate">Closed Date:&nbsp;</label>
                <input type="date"
                       class="form-control action"
                       name="closeDate"
                       id="closeDate"
                       aria-describedby="close-date"
                       v-model="state.bugCopy.closedDate"
                >
              </div>
              <div v-else class="form-group">
                <label for="closeDate">Closed Date:&nbsp;</label>
                <input type="date"
                       class="form-control"
                       name="closeDate"
                       id="closeDate"
                       aria-describedby="close-date"
                       v-model="state.bugCopy.closedDate"
                       readonly
                >
              </div>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { computed, onMounted, reactive, onBeforeMount } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import Pop from '../utils/Notifier'
import { logger } from '../utils/Logger'

export default {
  name: 'BugDetails',
  route: useRoute(),
  setup() {
    const route = useRoute()
    onBeforeMount(async() => {
      try {
        await bugsService.getNotesInBug(route.params.id)
        AppState.bugCopy = { ...AppState.bugs.find(b => b.id === route.params.id) }
        state.bugCopy = AppState.bugCopy
        logger.log('Copy bug Mount:', state.bugCopy)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    const state = reactive({
      notes: computed(() => AppState.notes[route.params.id]),
      bug: computed(() => AppState.bugs.find(b => b.id === route.params.id)),
      bugCopy: {}
    })
    logger.log('Real bug:', state.bug)
    logger.log('Copy bug:', state.bugCopy)
    logger.log('Account Id:', AppState.account.id)
    logger.log('Notes in Bug Setup:', state.notes)

    return {
      state,
      isCreator: computed(() => {
        logger.log('copy in return:', state.bugCopy)
        return state.bug.creatorId === AppState.account.id
      }),
      async editTask() {
        try {
          if (!state.bugCopy.closed) {
            delete state.bugCopy.closedDate
          }
          const bug = bugsService.editBut(state.bugCopy)
          state.bugCopy = bug
          $('#edit-bug-' + route.params.id).modal('hide')
          Pop.toast('Successful Bug Edit', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fa-pencil {
  color: rgb(75, 68, 41)
}

</style>
