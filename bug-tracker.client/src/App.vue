<template>
  <header>
    <Navbar />
  </header>
  <main class="">
    <router-view />
    <CreateBugModal />
    <CreateNoteModal />
    <EditBugModal />
  </main>
  <footer>
    <div class="bg-dark text-secondary text-center p-4">
      Scott Miller | May 2nd, 2021
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import CreateBugModal from './components/CreateBugModal'
import CreateNoteModal from './components/CreateNoteModal'
import EditBugModal from './components/EditBugModal'
export default {
  components: {
    CreateBugModal,
    CreateNoteModal,
    EditBugModal
  },
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
