<template>
  <router-link :to="{ name: 'BugDetails', params: {id: bug.id}}" class="BugCard flex-grow-1 d-flex flex-row border border-dark justify-content-center">
    <div class="col-md-3">
      <p class="m-0">
        <b>{{ bug.title }}
        </b>
      </p>
    </div>
    <div class="col-md-3">
      <p>{{ bug.creator.name }}</p>
    </div>
    <div class="col-md-3">
      <p>{{ dateFormatter(bug.createdAt) }}</p>
    </div>
    <div v-if="state.color" class="col-md-3 d-flex align-items-center">
      <p>Closed: &nbsp;</p>
      <i class="fas fa-circle red"></i>
    </div>
    <div v-else class="col-md-3 d-flex align-items-center">
      <p>Open: &nbsp;</p>
      <i class="fas fa-circle green"></i>
    </div>
  </router-link>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { dateFormatter } from '../utils/DateFormat'

export default {
  name: 'BugCard',
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      color: computed(() => props.bug.closed)
    })
    return {
      state,
      dateFormatter
    }
  }
}
</script>

<style lang="scss" scoped>
.red {
  color: rgb(255, 0, 0);
}

.green {
  color: rgb(0, 156, 0)
}

.BugCard {
  color: black;
}

</style>
