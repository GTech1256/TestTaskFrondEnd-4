<template>
  <section class="starship-details" v-if="starship && starship.id === id">
    <div class="starship-details__header">
      <h3>{{ starship.name }}</h3>
      <p>{{ starship.model }}</p>
    </div>
    <div class="starship-details__addit-info">
      <p> {{starshipSchema.MGLT}}: {{ starship.MLGT }}</p>
      <p>cargo_capacity: {{ starship.cargo_capacity }}</p>
      <p>consumables: {{ starship.consumables }}</p>
      <p>cost_in_credits: {{ starship.cost_in_credits }}</p>

      <p>crew: {{ starship.crew }}</p>
      <p>films:
        <a
          v-for="(film, index) in starship.films"
          :key="film"
          :href="film"
        >
          {{ 'film #' + index }}
          {{ index !== starship.films.length - 1 ? ', ' : '' }}
        </a>
      </p>
      <p>hyperdrive_rating: {{ starship.hyperdrive_rating }}</p>
      <p>length: {{ starship.length }}</p>
      <p>manufacturer: {{ starship.manufacturer }}</p>
      <p>max_atmosphering_speed: {{ starship.max_atmosphering_speed }}</p>

      <p>passengers: {{ starship.passengers }}</p>
      <p>pilots: {{ starship.pilots }}</p>
      <p>starship_class: {{ starship.starship_class }}</p>
    </div>
  </section>
  <h3 class="pulse" v-else>Loading</h3>
</template>
<script>
import { mapGetters } from 'vuex';
import { FETCH_ONE_STARSHIP } from '@/store/types';

export default {
  name: 'starship-details',
  props: {
    // from router
    id: {
      type: String,
      required: true
    }
  },
  created() {
    this.$store.dispatch(FETCH_ONE_STARSHIP, { id: this.id });
  },
  computed: {

    ...mapGetters({
      starship: 'starshipById',
      starshipSchema: 'starshipSchema'
    })
  },
}
</script>
<style lang="scss">
.starship-details {
  max-width: 900px;
  margin: 0 auto;
}

.starship-details__addit-info {
  display: flex;

  border-top: 1px solid gray;
}

.pulse {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-size: 30px;

  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
</style>
