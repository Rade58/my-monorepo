<script lang="ts">
  import Hero from "./Hero.svelte";
  import Carousel from "$lib/components/Carousel.svelte";

  export let data;

  // console.log({ data });
</script>

<h1 class="column">Top Trending Movies</h1>
<Hero movie={data.featured_data} />
<Carousel movies={data.trending} />
<Carousel movies={data.now_playing} />
<Carousel movies={data.upcoming} />
