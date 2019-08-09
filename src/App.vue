<template>
  <main class="app">
    <router-link
      class="app__title"
      :class="{ app__title_inactive: $route.name === 'home' }"
      tag="h1"
      to="/"
    >
      Starships
    </router-link>
    <router-view/>
  </main>
</template>
<script>
import { subscrubeData, unsubscrubeAllData } from '@/utils/cache/localDB';
import {
  SET_PAGE_STARSHIPS_CACHE,
  SET_STARSHIPS_CACHE,
  FETCH_STARSHIPS_SCHEMA
} from '@/store/types';
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters(['starshipSchema']),
  mounted() {
    if (!this.starshipSchema) {
      this.$store.dispatch(FETCH_STARSHIPS_SCHEMA)
    }
    subscrubeData('starshipsCache', (newValue) => {
      this.$store.commit(SET_PAGE_STARSHIPS_CACHE, newValue)
    })
    subscrubeData('pageStarshipsCache', (newValue) => {
      this.$store.commit(SET_PAGE_STARSHIPS_CACHE, newValue)
    })
  },
  beforeDestroy() {
    unsubscrubeAllData('starshipsCache')
    unsubscrubeAllData('pageStarshipsCache')
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

  cursor: pointer;

  &_inactive {
    pointer-events: none;
    cursor: default;
  }
}

</style>
