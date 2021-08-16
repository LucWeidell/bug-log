<template>
  <div class="BugDetails row mx-0 mt-2 flex-grow-1 d-flex flex-column">
    <div class="col-md-12 p-0">
      <div class="row m-0">
        <div class="col-md-12 p-0">
          <div class="row mt-3 d-flex ">
            <div class="col-md-3 ml-5 bg-yellow border border-dark">
              <h2>{{ state.bug.title }}</h2>
            </div>
            <!-- FIXME add below:::: v-if="isCreator && (state.bug.closed === false)" -->
            <div v-if="isCreator && (!state.bug.closed === true)" class="col-md-1 p-0 bg-pencil d-flex justify-content-center border border-dark">
              <i class="fas fa-3x fa-pencil-alt action" data-toggle="modal" :data-target="'#bug-edit-' + state.bug.id"></i>
            </div>
          </div>
          <!-- NOTE this is the bug car -->
          <div class="row my-2">
            <div class="col-md-11 ml-5">
              <!-- NOTE this is the account info -->
              <div class="row align-items-end justify-content-around pl-2">
                <div class="col-md-1 border-left ">
                  <img :src="state.bug.creator.picture" alt="account-pic" class="w-75">
                </div>
                <div class="col-md-3">
                  <p class="m-0">
                    Reported By:
                  </p>
                  <h6>{{ state.bug.creator.name }}</h6>
                </div>
                <div class="col-md-2">
                  <p class="m-0">
                    Last Updated:
                  </p>
                  <h6>{{ dateFormatter(state.bug.createdAt) }}</h6>
                </div>
                <div class="col-md-2">
                  <div v-if="state.bug.closed" class="d-flex align-items-center">
                    <i class="fas fa-3x fa-circle red action" @click="openBug"></i>
                    <div>
                      <p class="m-0">
                        Status:
                      </p>
                      <h5 class="m-0">
                        Closed: &nbsp;
                      </h5>
                    </div>
                  </div>
                  <div v-else class="d-flex align-items-center">
                    <i class="fas fa-3x fa-circle green action" @click="closeBug"></i> &nbsp;
                    <div>
                      <p class="m-0">
                        Status:
                      </p>
                      <h5 class="m-0">
                        Open: &nbsp;
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-11 mx-5">
              <div class="row align-items-end mt-4 mb-2 pl-2">
                <div class="col-md-12 border-bottom border-left border-dark">
                  <p>{{ state.bug.description }}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- FIXME put not cards here -->
          <div class="row my-2">
            <div class="col-md-11 mx-5">
              <div class="row align-items-end pl-2 border-top  border-dark">
                <div class="col-md-3 bg-yellow border border-dark justify-content-start ">
                  <h4>Notes</h4>
                </div>
                <div class="col-md-10 pt-3 mx-5">
                  <form v-if="state.user.isAuthenticated && ((!state.bug.closed)===true)" @submit.prevent="createNote">
                    <div class="form-group">
                      <textarea class="form-control"
                                name="body"
                                id="body"
                                rows="3"
                                placeholder="Write Something..."
                                required
                                v-model="state.newNote.body"
                      ></textarea>
                    </div>
                    <div class="d-flex justify-content-end">
                      <button type="submit" class="btn btn-primary">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
                <div class="col-md-10 pt-3 mx-5" v-for="n in state.notes" :key="n">
                  <NoteCard :note="n" />
                </div>
              </div>
            </div>
          </div>
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
              <div v-if="state.bugCopy.closed" class="form-group">
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
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
import Pop from '../utils/Notifier'
import { logger } from '../utils/Logger'
import { dateFormatter } from '../utils/DateFormat'

export default {
  name: 'BugDetails',
  route: useRoute(),
  setup() {
    onMounted(async() => {
      try {
        await bugsService.getNotesInBug(state.route.params.id)
        const foundBug = AppState.bugs.find(b => b.id === state.route.params.id)
        AppState.bugCopy = Object.assign({}, foundBug)
        state.bugCopy = AppState.bugCopy
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    const route = useRoute()
    const bugId = route.params.id

    const state = reactive({
      route: route,
      bug: computed(() => AppState.bugs.find(b => b.id === route.params.id)),
      bugCopy: {},
      newNote: {},
      user: computed(() => AppState.user),
      notes: computed(() => AppState.notes[route.params.id])
    })
    // logger.log('Real bug:', state.bug)
    // logger.log('Copy bug:', state.bugCopy)
    // logger.log('Account Id:', AppState.account.id)
    // logger.log('Notes in Bug Setup:', state.notes)

    return {
      state,
      bugId,
      route,
      dateFormatter,
      isCreator: computed(() => {
        return state.bug.creatorId === AppState.account.id
      }),
      async editBug() {
        try {
          if (!state.bugCopy.closed) {
            delete state.bugCopy.closedDate
          }
          const bug = await bugsService.editBug(state.bugCopy)
          state.bugCopy = bug
          $('#edit-bug-' + state.route.params.id).modal('hide')
          Pop.toast('Successful Bug Edit', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async closeBug() {
        try {
          if (state.bugCopy.creatorId === AppState.account.id) {
            state.bugCopy.closed = true
            state.bugCopy.closedDate = new Date().toString()
            const bug = await bugsService.editBug(state.bugCopy)
            state.bugCopy = bug
            Pop.toast('Closed Bug', 'success')
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async openBug() {
        try {
          if (state.bugCopy.creatorId === AppState.account.id) {
            state.bugCopy.closed = false
            // FIXME maybe delete edit
            state.bugCopy.closedDate = ''
            const bug = await bugsService.editBug(state.bugCopy)
            state.bugCopy = bug
            Pop.toast('Opened Bug', 'success')
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async createNote() {
        try {
          state.bugCopy.closed = false
          state.newNote.creatorId = AppState.account.id
          state.newNote.bugId = state.bug.id
          await notesService.createNote(state.newNote)
          state.newNote = {}
          Pop.toast('Created a note', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fa-pencil-alt {
  color: rgb(75, 68, 41)
}

.bg-pencil {
  background-color: rgb(161, 161, 161);
}

.red {
  color: rgb(255, 0, 0);
}
.green {
  color: rgb(0, 255, 0)
}

</style>
