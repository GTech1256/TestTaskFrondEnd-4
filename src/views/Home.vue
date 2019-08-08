<template>
  <section class="home">
    <h2 class="home__title">Collections</h2>
    <input
      class="home__search"
      type="search"
      placeholder="name"
      v-model="queryInput"
    >
    <ul class="home__list" v-if="starships.length !== 0">
      <starship-card
        class="home__item"
        v-for="starship in starships"
        :key="starship.url"
        :starship="starship"
      />
    </ul>
    <p v-else>
      По данным притериям кораблей нет
    </p>
    <div class="home__paginator"
      v-if="page !== totalPages"
    >
      <button
        class="home__btn"
        type="button"
        :disabled="page <= totalPages"
      >
        Следующая страница
      </button>
      <p>{{ `${page} / ${totalPages} `}}</p>
      <button
        class="home__btn"
        type="button"
        :disabled="page >= totalPages"
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
      totalPages: 1
    }
  },
  computed: mapGetters([
    'starships',
    'starshipsCount',
    'nextPage'
  ]),
  created() {

    this.$store.dispatch(FETCH_STARSHIPS, {
      page: this.page,
      query: this.query
    })

  },
  methods: {
    search() {

    }
  }
};
</script>
<style lang="scss">
.home {

}

.home__title {
  margin-bottom: 50px;
}

.home__search {
  width: 400px;
  max-width: 75%;
  margin-bottom: 50px;

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

