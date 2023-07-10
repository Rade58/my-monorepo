<script lang="ts">
  import { media } from "$lib/api";
  import type { MovieDetails } from "$lib/types";

  export let movie: MovieDetails;

  $: backdrop =
    movie.images.backdrops.find(({ iso_639_1 }) => {
      return !iso_639_1;
    }) || movie.images.backdrops[0];
</script>

<a href="/movie/{movie.id}">
  <img src={media(backdrop.file_path, 1280)} alt={movie.title} />
</a>
