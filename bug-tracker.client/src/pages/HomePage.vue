<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col d-flex flex-row align-items-center">
        <h3 class="pr-4">
          Bug List
        </h3>
        <button title="open create bug form" type="button" class="btn btn-outline-success my-4" data-toggle="modal" data-target="#new-bug-form">
          Add Bug
        </button>
      </div>
    </div>
    <div class="row">
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
      bugs: computed(() => AppState.bugs)
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
