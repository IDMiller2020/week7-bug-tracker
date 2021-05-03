<template>
  <header>
    <Navbar />
  </header>
  <main class="">
    <router-view />
    <CreateBugModal />
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      Scott Miller | May 2nd, 2021
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import CreateBugModal from './components/CreateBugModal'
export default {
  components: {
    CreateBugModal
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
