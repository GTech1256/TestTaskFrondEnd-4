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
        class="home__btn home__btn_left"
        type="button"
        :disabled="page === 1"
        @click="fetchStarships(query, page - 1)"
      >
        Предыдущая страница
      </button>
      <p class="home__page-num">{{ `${page} / ${computedNextPage} `}}</p>
      <button
        class="home__btn home__btn_right"
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

.home__btn {
  width: 200px;
  height: 100px;

  font-size: 0px;

  position: relative;

  background: transparent;
  border: none;

  cursor: pointer;

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &::before,
  &::after {
    display: block;

    position: absolute;
    left: 90px;
    top: 50%;

    transform: translateY(-50%);

    width: 100px;
    height: 25px;

    background: $yellow-color;

    transition: left .3s, right .3s;
    content: "";
  }

  &::after {
    width: 0;
    height: 0;
    left: 60px;

    background-color: transparent;

    border: 40px solid $yellow-color;
    border-left-width: 0;
    border-top-color: transparent;
    border-bottom-color: transparent;
  }
}

.home__btn_left:hover {
  &::before {
    left: 100px
  }
  &::after {
    left: 80px;
  }
}

.home__btn_left:active,
.home__btn_left:focus {
  &::before {
    left: 30px;
  }
  &::after {
    left: 0px;
  }
}

.home__btn_right::before {
  left: auto;
  right: 80px;
}

.home__btn_right::after {
  left: auto;
  right: 50px;
  border-right-width: 0;
  border-left-width: 40px;
  border-top-color: transparent;
  border-bottom-color: transparent;
}

.home__btn_right:hover {
  &::before {
    right: 100px;
  }
  &::after {
    right: 85px;
  }
}

.home__btn_right:active,
.home__btn_right:focus {
  &::before {
    right: 40px;
  }
  &::after {
    right: 0px;
  }
}

.home__paginator {
  display: flex;
  flex-wrap: wrap;
  width: 900px;
  max-width: 75%;
  margin: 0 auto;
  margin-bottom: 50px;

  justify-content: space-around;
}

.home__page-num {
  padding: 0;
  margin: 0;

  font-size: 25px;
  font-weight: bold;
  line-height: 100px;
}

@media screen and (max-width: 800px) {
  .home__paginator {
    flex-direction: column;
    align-items: center;
  }

  .home__btn_left {
    margin-right: 70px;
  }
  .home__btn_right {
    margin-left: 70px;
  }
}
</style>

