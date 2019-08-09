<template>
  <section class="home">
    <h2 class="home__title">Collections</h2>
    <input
      class="home__search"
      type="search"
      placeholder="name"
      v-model="queryInput"
      @input="search"
    >
    <ul class="home__list" v-if="starships.length !== 0">
      <starship-card
        class="home__item"
        v-for="starship in starships"
        :key="starship.url"
        :starship="starship"
      />
    </ul>
    <p v-else-if="!starshipsIsLoading">
      По данным притериям кораблей нет
    </p>
    <p class="pulse" v-else>
      Загрузка
    </p>
    <div class="home__paginator"
      v-if="page !== nextPage"
    >
      <button
        class="home__btn"
        type="button"
        :disabled="page <= nextPage"
      >
        Следующая страница
      </button>
      <p>{{ `${page} / ${nextPage} `}}</p>
      <button
        class="home__btn"
        type="button"
        :disabled="page >= nextPage"
        @click="fetchStarships(query, page + 1)"
      >
        Следующая страница
      </button>
    </div>
  </section>
</template>

<script>
import { FETCH_STARSHIPS } from '@/store/types'
import StarshipCard from '@/components/StarshipCard'
import { mapGetters } from 'vuex';
import { debounce } from "debounce";

export default {
  name: 'home',
  components: {
    StarshipCard
  },
  props: {
    // from router
    query: {
      type: String,
      default: ''
    },
    // from router
    page: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      queryInput: this.query,
      nowDebounceFN: {
        clear: () => {}
      }
    }
  },
  computed: mapGetters([
    'starships',
    'starshipsCount',
    'nextPage',
    'starshipsIsLoading',
  ]),
  created() {
    this.fetchStarships(this.query, this.page);
  },
  methods: {
    fetchStarships(query, page, isForceLoad) {
      this.$store.dispatch(FETCH_STARSHIPS, {
        page: this.page,
        query
      }, isForceLoad)
    },
    search() {
      this.nowDebounceFN.clear()
      this.nowDebounceFN = debounce(() => {
        this.$router.push({
          query: { q: this.queryInput   }
        })
        this.fetchStarships(this.queryInput, this.page, true)
      }, 500)
      this.nowDebounceFN();
    }
  }
};
</script>
<style lang="scss">
.home__title {
  margin-bottom: 50px;
}

.home__search {
  width: 400px;
  max-width: 75%;
  margin-bottom: 50px;
  padding: 5px 0;

  text-align: center;

  background: transparent;
  border: none;
  border-bottom: 5px solid gray;
  border-radius: 10px;

  color: #ffffff;
}

.home__list {
  display: flex;
  margin: 0;
  padding: 0 100px;

  justify-content: space-around;
  flex-wrap: wrap;


  list-style: none
}

.home__item {
  margin: 0 50px;
  margin-bottom: 50px;
}

.home__paginator {
  display: flex;
  width: 900px;
  max-width: 75%;

  justify-content: space-around;

  margin: 0 auto;
}
</style>

