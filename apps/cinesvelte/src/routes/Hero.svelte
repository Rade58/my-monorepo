<script lang="ts">
  import { media } from "$lib/api";
  import type { MovieDetails } from "$lib/types";

  export let movie: MovieDetails;

  $: backdrop =
    movie.images.backdrops.find(({ iso_639_1 }) => {
      return !iso_639_1;
    }) || movie.images.backdrops[0];
  $: logo =
    movie.images.logos.find(({ iso_639_1 }) => {
      return iso_639_1 === "en";
    }) || movie.images.logos[0];
</script>

<a href="/movies/{movie.id}" class="column hero-img">
  <img
    src={media(backdrop.file_path, 1280)}
    alt={movie.title}
    style="asppect-rtio: {backdrop.aspect_ratio}"
  />
  <div class="logo-movie">
    <img
      src={media(logo.file_path, 1280)}
      alt={movie.title}
      style="asppect-rtio: {logo.aspect_ratio}"
    />
  </div>
</a>

<!-- <a href="/movie/{movie.id}" class="logo-movie"> -->
<!-- </a> -->

<style>
  /* .hero-img {
    width: 200px;
    height: 200px;
    display: inline-block;
    border: crimson solid 2px;
  } */

  .hero-img {
    display: flex;
    position: relative;
  }

  .hero-img img {
    width: 100%;
  }

  .logo-movie {
    position: absolute;
    width: 30%;
    height: 100%;
  }

  .logo-movie img {
    position: absolute;
    left: 1rem;
    top: 0;
    height: 100%;
    width: 100%;
    object-fit: contain;

    object-position: 50% 75%;
    filter: drop-shadow(0 0 3rem black) drop-shadow(0 0 0.5rem black);
  }
</style>
