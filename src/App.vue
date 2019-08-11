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
    <transition :name="transitionName" mode="out-in">
      <router-view/>
    </transition>
  </main>
</template>
<script>
import { mapGetters } from 'vuex';
import { subscrubeData, unsubscrubeAllData } from '@/utils/cache/localDB';
import {
  SET_PAGE_STARSHIPS_CACHE,
  FETCH_STARSHIPS_SCHEMA,
  SET_STARSHIPS_CACHE,
} from '@/store/types';

export default {
  computed: mapGetters(['starshipSchema']),
  data: () => ({
    transitionName: 'up'
  }),
  watch: {
    '$route' (to, from) {
      if (to.name === from.name) {
        this.transitionName = 'none'
        return;
      }
      this.scrollToTop();
      this.transitionName = to.name === 'home' ? 'up' : 'down'
    }
  },
  methods: {
    scrollToTop() {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        window.requestAnimationFrame(this.scrollToTop);
        window.scrollTo(0, c - c / 8);
      }
    }
  },
  mounted() {
    if (!this.starshipSchema) {
      this.$store.dispatch(FETCH_STARSHIPS_SCHEMA);
    }
    subscrubeData('starshipsCache', (newValue) => {
      this.$store.commit(SET_STARSHIPS_CACHE, JSON.parse(newValue));
    });
    subscrubeData('pageStarshipsCache', (newValue) => {
      this.$store.commit(SET_PAGE_STARSHIPS_CACHE, JSON.parse(newValue));
    });
  },
  beforeDestroy() {
    unsubscrubeAllData('starshipsCache');
    unsubscrubeAllData('pageStarshipsCache');
  },
};
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

.up-enter-active,
.up-leave-active,
.down-enter-active,
.down-leave-active {
  transition: opacity .3s, transform .4s;
  opacity: 1;
  transform: scale(1);
  position: relative;
}
.up-enter,
.up-leave-to,
.down-enter,
.down-leave-to {
  opacity: 0;
}
.up-leave-to {
  transform: scale(1.2);
}
.up-enter {
  transform: scale(0);
}
.down-leave-to {
  transform: scale(0);
}
.down-enter {
  transform: scale(1.2);
}
</style>
