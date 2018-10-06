<template>
  <div class="home-page">
    <h1>Three.js playground</h1>

    <router-link :to="experiment.path" v-for="experiment in this.$router.options.routes" :key="experiment.name">
      {{experiment.name}}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'home-page'
}
</script>
