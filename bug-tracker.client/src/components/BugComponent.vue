<template>
  <div class="bug col-12">
    <!-- Route parameter getting set with the Params object -->
    <router-link :to="{name: 'BugDetails', params: { id: bug.id }}">
      <div class="card shadow">
        <div class="card-body">
          <p class="card-title">
            {{ bug.title }} | {{ bug.creator.name }} | {{ bug.closed }} | {{ bug.updatedAt }}
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

</style>
