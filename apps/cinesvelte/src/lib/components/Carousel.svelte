<script lang="ts">
  import { media } from "$lib/api";
  import type { MovieList } from "$lib/types";
  export let movies: MovieList;
</script>

<div class="carousel column">
  {#each movies.results as movie}
    <a href="/movie/{movie.id}">
      <img src={media(movie.poster_path, 500)} alt={movie.title} /></a
    >
  {/each}
</div>
