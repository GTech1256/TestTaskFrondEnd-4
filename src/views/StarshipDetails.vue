<script>
import { mapGetters } from 'vuex';
import { FETCH_ONE_STARSHIP } from '@/store/types';

export default {
  name: 'starship-details',
  render (createElement) {
    const starship = this.starship;

    if(!starship || starship.id !== this.id) {
      return (<h3 class="pulse">Loading</h3>);
    }

    const additInfo = (

      Object.entries(this.starshipSchema)
        .map(([key, value]) => (
          <p class="starship-details__property" data-description={value.description}>{starship[key]}</p>
        ))
    );
    const section = (
    <section class="starship-details">
      <h3>{starship.name}</h3>
      <p>{starship.model}</p>
      { additInfo}
    </section>
    )

    return section;
  },
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
  padding-bottom: 100px;
}

.starship-details__addit-info {
  display: flex;

  border-top: 1px solid gray;
}

.starship-details__property {
  margin: 0 30px;

  position: relative;

  border-bottom: 1px solid gray;
  &::after {
    display: block;
    width: 300px;

    position: absolute;
    left: 50%;
    z-index: 10;

    transform: translate(-50%, 50%);
    transition: opacity 0.3s, transform 0.3s;

    opacity: 0;

    border-radius: 10px;
    background: rgba(0, 0, 0, 1);

    pointer-events: none;

    content:attr(data-description);
  }

  &:hover::after {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}
</style>
