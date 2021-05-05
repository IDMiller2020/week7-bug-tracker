<template>
  <div class="bug col-12">
    <!-- Route parameter getting set with the Params object -->
    <router-link :to="{name: 'BugDetails', params: { id: bug.id }}">
      <div class="card shadow">
        <div class="card-body">
          <p class="card-title text-success" v-if="bug.creator && bug.closed">
            {{ bug.title }} | <img class="w-1 rounded-circle" :src="bug.creator.picture" alt="creator picture">{{ bug.creator.name }} | {{ bug.closed }} | {{ new Date(bug.updatedAt).toLocaleString() }}
          </p>
          <p class="card-title text-danger" v-if="bug.creator && !bug.closed">
            {{ bug.title }} | <img class="w-1 rounded-circle" :src="bug.creator.picture" alt="creator picture">{{ bug.creator.name }} | {{ bug.closed }} | {{ new Date(bug.updatedAt).toLocaleString() }}
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Bug',
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.w-1 {
  width: 2rem;
}
</style>
