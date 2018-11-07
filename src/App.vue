<template>
  <div id="app">
    <router-link v-if="$router.currentRoute.name !== 'HomePage'" to="/" class="go-back">Go back</router-link>
    <span class="current-name">{{ $router.currentRoute.name }} - <a href="https://github.com/Eronne">source code</a></span>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Poppins:200,400');

  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
  }

  .current-name,
  .go-back {
    z-index: 10;
    position: absolute;
    top: .2rem;
    font-size: 12px;
    font-weight: lighter;
  }

  .current-name {
    left: 50%;
    transform: translateX(-50%);
  }

  .go-back {
    cursor: pointer;
    left: 1rem;
    text-decoration: none;
  }

  .current-name a,
  .go-back {
    color: inherit;
  }
</style>
