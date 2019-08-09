<template>
  <router-link
    class="starship-card"
    tag="li"
    :to="`/starship/${starship.id}`"
  >
      <div class="starship-card__header">
        <h3>{{ starship.name }}</h3>
        <p>{{ starship.model }}</p>
      </div>
      <button class="starship-card__btn" type="button">
        Подробнее
      </button>
  </router-link>
</template>
<script>
export default {
  name: 'starship-card',
  props: {
    starship: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss">
.starship-card {
  padding: 20px;
  width: 300px;

  border: 1px solid $yellow-color;
  border-radius: 10px;

  box-shadow: 0 0 5px 10px rgba(0, 0, 0, .2);
  transition: box-shadow .3s;

  cursor: pointer;

  &:hover {
    box-shadow: 0 0 10px 15px rgba(0, 0, 0, .4);
  }
}

.starship-card:hover .starship-card__btn  {
  letter-spacing: .5em;
}


.starship-card__header {
  border-bottom: 1px solid gray;

  min-height: 120px
}

.starship-card__btn {
  padding: 20px;
  letter-spacing: .7em;

  transition: letter-spacing .3s;

  background: none;
  border: none;

  color: $yellow-color;
  font-weight: 700;
  text-transform: uppercase;

  cursor: pointer;
}
</style>
