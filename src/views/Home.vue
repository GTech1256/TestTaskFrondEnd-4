<template>
  <section class="home">
    <h2 class="home__title">Collections</h2>
    <input
      class="home__search"
      type="search"
      placeholder="name"
      v-model.trim="queryInput"
      @input="search"
    >
    <div class="home__paginator"
      v-if="1 != computedNextPage"
    >
      <button
        class="home__btn"
        type="button"
        :disabled="page === 1"
        @click="fetchStarships(query, page - 1)"
      >
        Предыдущая страница
      </button>
      <p>{{ `${page} / ${computedNextPage} `}}</p>
      <button
        class="home__btn"
        type="button"
        :disabled="page >= computedNextPage"
        @click="fetchStarships(query, page + 1)"
      >
        Следующая страница
      </button>
    </div>
    <ul class="home__list" v-if="starships.length !== 0 && !starshipsIsLoading">
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
  </section>
</template>

<script>
import {
  FETCH_STARSHIPS,
  SET_MODULE_STARSHIP_NEXT_PAGE
} from '@/store/types'
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
  computed: {
    computedNextPage() {
      return this.query.trim() === '' ? this.starshipsPageCounts : this.nextPage
    },
    ...mapGetters([
    'starships',
    'starshipsCount',
    'nextPage',
    'starshipsPageCounts',
    'starshipsIsLoading',
  ])
  },
  created() {
    this.fetchStarships(this.query, this.page);
  },
  methods: {
    fetchStarships(query, page) {
      if(this.query !== query || this.page !== page) {
        this.$router.push({
          query: {
            q: query,
            p: page
          }
        })
      }

      return this.$store.dispatch(FETCH_STARSHIPS, {
        page,
        query,
        isForceLoad: !!query
      })
    },
    search() {
      this.nowDebounceFN.clear()
      this.nowDebounceFN = debounce(() => {
        this.fetchStarships(this.queryInput, this.page, true)
          .then(() => {
            /*
            this.$router.push({
              query: { p: 1 }
            })
            */
            // this.$store.commit(SET_MODULE_STARSHIP_NEXT_PAGE, 1);
          })
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
  margin: 0 auto;
  margin-bottom: 50px;

  justify-content: space-around;


}
</style>

