<template>
  <div class="home-page">
    <div class="home-page__content">
      <h1>Three.js playground</h1>

      <div class="home-page__content-links">
        <router-link :to="experiment.path" v-for="experiment in this.$router.options.routes" :key="experiment.name">
          {{experiment.name}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-page'
}
</script>

<style>
  .home-page {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }

  .home-page__content {
    text-align: center;
  }

  .home-page__content h1 {
    margin: 0;
  }

  .home-page__content-links {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
  }

  .home-page__content-links a {
    margin: .2rem;
  }
</style>
