<template>
  <div class="modal fade"
       id="new-note-form"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            New Note
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="createNote">
          <div class="modal-body">
            <div class="form-group">
              <label for="note">Note</label>
              <input type="text"
                     class="form-control"
                     id="note"
                     placeholder="note..."
                     minLength="5"
                     maxlength="200"
                     v-model="state.newNote.body"
                     required
              >
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { notesService } from '../services/NotesService'
import $ from 'jquery'
// import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
export default {
  // name: 'Component',
  setup() {
    const route = useRoute()
    const state = reactive({
      newNote: {}
    })
    return {
      state,
      async createNote() {
        try {
          state.newNote.bugId = route.params.id
          await notesService.createNote(state.newNote)
          // NOTE reseting to the empty object resets the input fields
          // state.newNote = {}
          // eslint-disable-next-line no-undef
          $('#new-note-form').modal('hide')
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
  // components: {} also add a , on the previous line
}
</script>

<style lang="scss" scoped>

</style>
