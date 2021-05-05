<template>
  <div class="container">
    <div class="row bug-details">
      <div class="col-12" v-if="state.bug">
        <h3>{{ state.bug.title }}</h3>
        <h5 class="text-danger" v-if="!state.bug.closed">
          Bug Closed: {{ state.bug.closed }}
        </h5>
        <h5 class="text-success" v-if="state.bug.closed">
          Bug Closed: {{ state.bug.closed }}
        </h5>
        <p> Id: {{ state.bug.id }}</p>
        <p> Description: {{ state.bug.description }} </p>
        <p> Reported By: {{ state.bug.creator.name }}</p>
        <button v-if="!state.bug.closed && state.user.isAuthenticated"
                title="open create note form"
                type="button"
                class="btn btn-outline-success my-4"
                data-toggle="modal"
                data-target="#new-note-form"
        >
          Add Note
        </button>
        <!-- FIXME Edit Bug and Close Bug are showing up when not logged in -->
        <button v-if="!state.bug.closed && state.account.id == state.bug.creatorId && state.user.isAuthenticated"
                title="open edit note form"
                type="button"
                class="btn btn-outline-primary my-4 ml-4"
                data-toggle="modal"
                data-target="#edit-bug-form"
        >
          Edit Bug
        </button>
        <button v-if="!state.bug.closed && state.user.isAuthenticated" type="button" class="btn btn-outline-danger ml-4" @click="closeBug">
          Close Bug
        </button>
      </div>
    </div>
    <div class="row">
      <div class="card">
        <ul class="list-group list-group-flush">
          <div v-for="note in state.activeNotes" :key="note.id">
            <li class="list-group-item">
              <p id="note" v-if="note.creator">
                <img id="creator-image" class="w-1 rounded-circle" :src="note.creator.picture" alt="Creator Image"> {{ note.body }}
                <i class="fas fa-trash" @click="deleteNote(note.id)" v-if="state.account.id == note.creatorId"></i>
              </p>
            </li>
          </div>
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
import Notification from '../utils/Notification'

export default {
  name: 'BugDetails',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      bug: computed(() => AppState.activeBug),
      activeBug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes),
      activeNotes: computed(() => AppState.activeNotes),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
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
      },
      async deleteNote(noteId) {
        try {
          if (await Notification.confirmAction('Are you sure you want to delete this note?', "You won't be able to revert this.", 'warning', 'Yes, delete it!')) {
            await notesService.deleteNote(noteId)
            Notification.toast('Successfully Deleted', 'success')
          }
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
