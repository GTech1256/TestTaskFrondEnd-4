<template>
  <main class="app">
    <router-link
      class="app__title"
      tag="h1"
      to="/"
    >
      Starships
    </router-link>
    <router-view/>
  </main>
</template>
<script>
import { INIT_STARSHIPS_CACHE } from '@/store/types';

export default {
  mounted() {
    // console.log(this.$store.commit())
    this.$store.commit(INIT_STARSHIPS_CACHE)
  }
}
</script>
<style lang="scss">
.app {
  width: 100%;
  height: 100%;
  min-height: 100vh;

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  text-align: center;

  background-color: $background-color;
}

.app__title {
  display: block;
  padding: 20px 0;
  margin: 0;

  text-transform: uppercase;
  letter-spacing: .4em;

  text-align: center;
  color: $yellow-color;
}

</style>
