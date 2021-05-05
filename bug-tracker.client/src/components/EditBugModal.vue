<template>
  <div class="modal fade"
       id="edit-bug-form"
       tabindex="-1"
       role="dialog"
       aria-labelledby="editBug"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Edit Bug
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="editBug">
          <div class="modal-body">
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text"
                     class="form-control"
                     id="title"
                     placeholder="title..."
                     minLength="3"
                     maxlength="25"
                     v-model="state.editedBug.title"
              >
              <div class="form-group">
                <label for="description">Description</label>
                <input type="text"
                       class="form-control"
                       id="description"
                       placeholder="Description..."
                       minlength="3"
                       maxlength="75"
                       v-model="state.editedBug.description"
                >
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Edit
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
import { bugsService } from '../services/BugsService'
import $ from 'jquery'
import { useRoute } from 'vue-router'
export default {
  name: 'Component',
  setup() {
    const route = useRoute()
    const state = reactive({
      editedBug: {}
    })
    return {
      state,
      async editBug() {
        try {
          // FIXME The modal won't close after I click the edit button
          state.editedBug.bugId = route.params.id
          await bugsService.editBug(state.editedBug)
          // NOTE reseting to the empty object resets the input fields
          // state.newBug = {}
          // eslint-disable-next-line no-undef
          $('#edit-bug-form').modal('hide')
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
