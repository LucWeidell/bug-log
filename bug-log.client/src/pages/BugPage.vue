<template>
  <div class="BugPage">
    <div class="row mx-0 mt-2 flex-grow-1 d-flex flex-column">
      <div class="col-md-12 py-2">
        <h4>Create Bug:</h4>
      </div>
      <div class="col-md-12 py-2">
        <form class="d-flex align-items-start justify-conent-between" @submit.prevent="createBug">
          <div class="form-group">
            <label for="title">Title: </label>
            <input type="text"
                   class="form-control action"
                   name="title"
                   id="title"
                   aria-describedby="title"
                   placeholder="title..."
                   v-model="state.newBug.title"
                   required
            >
          </div>
          <div class="form-group">
            <label for="description">Description: &nbsp; </label>
            <textarea class="form-control action"
                      name="description"
                      id="description"
                      rows="3"
                      v-model="state.newBug.description"
                      required
                      placeholder="Describe the Bug..."
            ></textarea>
          </div>
          <div class="form-group">
            <label for="status">Status:&nbsp; </label>
            <select class="form-control action" name="status" id="status" v-model="state.newBug.closed" required>
              <option value="false">
                Open
              </option>
              <option value="true">
                Closed
              </option>
            </select>
          </div>
          <div v-if="state.newBug.closed === 'true'" class="form-group">
            <label for="closeDate">Closed Date:&nbsp;</label>
            <input type="date"
                   class="form-control action"
                   name="closeDate"
                   id="closeDate"
                   aria-describedby="close-date"
                   v-model="state.newBug.closedDate"
            >
          </div>
          <div v-else class="form-group">
            <label for="closeDate">Closed Date:&nbsp;</label>
            <input type="date"
                   class="form-control"
                   name="closeDate"
                   id="closeDate"
                   aria-describedby="close-date"
                   v-model="state.newBug.closedDate"
                   readonly
            >
            <!-- REVIEW not really needed -->
            <small id="close-date" class="form-text text-muted">Only can fill bug closed!</small>
          </div>
          <button type="submit" class="btn btn-info">
            Report Bug
          </button>
        </form>
      </div>
    </div>
    <div class="row flex-grow-1 d-flex flex-row justify-content-center">
      <div class="col-md-10 border border-dark p-0 pt-1 text-light bg-blue">
        <div class="row m-0">
          <div class="col-md-3">
            <h4>Title:</h4>
          </div>
          <div class="col-md-3">
            <h4>Reported By:</h4>
          </div>
          <div class="col-md-3">
            <h4>Last Updated:</h4>
          </div>
          <div class="col-md-3">
            <button type="button" class="btn btn-success mb-1" @click="filterStatus">
              All/Closed/Open
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row flex-grow-1 d-flex flex-row  justify-content-center mb-1">
      <div class="col-md-10 p-0 border border-dark" v-for="b in state.bugsList" :key="b.id">
        <BugCard :bug="b" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import Pop from '../utils/Notifier'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { computed, onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
// import { logger } from '../utils/Logger'

export default {
  name: 'BugPage',
  setup() {
    onMounted(async() => {
      try {
        await bugsService.getAllBugs()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    const router = useRouter()
    const state = reactive({
      bugsList: computed(() => AppState.bugs),
      newBug: {},
      filterKey: 0,
      filterOption: ['all', 'closed', 'open']
    })
    return {
      state,
      router,
      async createBug() {
        try {
          state.newBug.creatorId = AppState.account.id
          state.newBug.closed = (state.newBug.closed === 'true')
          if (!state.newBug.closed) {
            delete state.newBug.closedDate
          }
          // eslint-disable-next-line no-unused-vars
          const bug = await bugsService.createBug(state.newBug)
          state.newBug = {}
          Pop.toast('Added Bug', 'success')
          router.push({ name: 'BugDetails', params: { id: bug.id } })
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async filterStatus() {
        try {
          state.filterKey++
          if (state.filterKey === 3) {
            state.filterKey = 0
          }
          // logger.log('option to check:', state.filterOption[state.filterKey])
          switch (state.filterOption[state.filterKey]) {
            case 'all':
              await bugsService.getAllBugs()
              // logger.log(AppState.bugs.length)
              break
            case 'closed':
              await bugsService.getAllBugs()
              AppState.bugs = AppState.bugs.filter(b => b.closed === true)
              // logger.log(AppState.bugs.length)
              break
            case 'open':
              await bugsService.getAllBugs()
              AppState.bugs = AppState.bugs.filter(b => !(b.closed === true))
              break
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.form-group{
  display: flex;
  flex-direction: row;
  padding: 0 0.5em;
}

</style>
