<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col d-flex flex-row align-items-center">
        <h3 class="pr-4">
          Bug List
        </h3>
        <button title="show all bugs" type="button" class="btn btn-outline-warning my-4" @click="state.displayClosed = 0">
          All Bugs
        </button>
        <button title="show closed bugs" type="button" class="btn btn-outline-success my-4 ml-4" @click="state.displayClosed = 1">
          Closed Bugs
        </button>
        <button title="show open bugs" type="button" class="btn btn-outline-danger my-4 ml-4" @click="state.displayClosed = 2">
          Open Bugs
        </button>
        <button title="open create bug form" type="button" class="btn btn-outline-primary my-4 ml-4" data-toggle="modal" data-target="#new-bug-form">
          Add Bug
        </button>
      </div>
    </div>
    <div class="row" v-if="state.displayClosed == 1">
      <Bug v-for="bug in state.closedBugs" :key="bug.id" :bug="bug" />
    </div>
    <div class="row" v-else-if="state.displayClosed == 2">
      <Bug v-for="bug in state.openBugs" :key="bug.id" :bug="bug" />
    </div>
    <div class="row" v-else>
      <Bug v-for="bug in state.bugs" :key="bug.id" :bug="bug" />
    </div>
  </div>
</template>

<script>
import { onMounted, computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      closedBugs: computed(() => AppState.closedBugs),
      openBugs: computed(() => AppState.openBugs),
      displayClosed: 0
    })
    onMounted(async() => {
      try {
        await bugsService.getBugs()
      } catch (error) {
        console.error(error)
      }
    })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
