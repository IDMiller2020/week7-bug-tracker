<template>
  <div class="container">
    <div class="row bug-details">
      <div class="col-12" v-if="state.bug">
        <h3>{{ state.bug.title }}</h3>
        <h5>Bug Closed: {{ state.bug.closed }}</h5>
        <p> Id: {{ state.bug.id }}</p>
        <p> Description: {{ state.bug.description }} </p>
        <p> Reported By: {{ state.bug.creator.name }}</p>
        <button type="button" class="btn btn-danger" @click="closeeBug">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { reactive, computed, onMounted } from 'vue'
import { bugsService } from '../services/BugsService'

export default {
  name: 'BugDetails',
  setup() {
    // ROUTE is the current page info
    const route = useRoute()
    // ROUTER is the toolset of changing routes automatically
    const router = useRouter()
    const state = reactive({
      bug: computed(() => AppState.activeBug)

    })

    onMounted(async() => {
      try {
        await bugsService.getBugById(route.params.id)
      } catch (error) {
        console.error(error)
      }
    })

    return {
      route,
      state,
      async closeBug() {
        try {
          await bugsService.closeBug(state.bug.id)
          // Router is a toolset, here used to change the page after the delete is completed
          // returning the user to the bugs page
          AppState.activeBug = null
          router.push({ name: 'Bugs' })
        } catch (error) {
          console.error(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
