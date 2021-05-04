<template>
  <div class="container">
    <div class="row bug-details">
      <div class="col-12" v-if="state.bug">
        <h3>{{ state.bug.title }}</h3>
        <h5>Bug Closed: {{ state.bug.closed }}</h5>
        <p> Id: {{ state.bug.id }}</p>
        <p> Description: {{ state.bug.description }} </p>
        <p> Reported By: {{ state.bug.creator.name }}</p>
        <button type="button" class="btn btn-outline-danger" @click="closeBug">
          Close Bug
        </button>
        <button title="open create note form" type="button" class="btn btn-outline-success my-4" data-toggle="modal" data-target="#new-note-form">
          Add Note
        </button>
        <button title="open edit note form" type="button" class="btn btn-outline-primary my-4" data-toggle="modal" data-target="#edit-note-form">
          Edit Bug
        </button>
      </div>
    </div>
    <div class="row">
      <div class="card" style="width: 18rem;">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <div v-for="note in state.activeNotes" :key="note.id">
              <p id="note">
                <img id="creator-image" class="w-1 rounded-circle" :src="note.creator.picture" alt="Creator Image"> {{ note.body }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { reactive, computed, onMounted } from 'vue'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'

export default {
  name: 'BugDetails',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      bug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes),
      activeNotes: computed(() => AppState.activeNotes)
    })

    onMounted(async() => {
      try {
        await bugsService.getBugById(route.params.id)
        await notesService.getNoteByBugId(route.params.id)
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
          AppState.activeBug = null
          router.push({ name: 'Home' })
          Notification.toast('Successfully Closed', 'success')
        } catch (error) {
          Notification.toast(error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.w-1 {
  width: 2.5rem
}

</style>
