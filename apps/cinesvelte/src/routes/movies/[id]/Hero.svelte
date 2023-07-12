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

<div class="hero column">
  <div class="backdrop">
    <img src={media(backdrop.file_path, 1280)} alt={movie.title} />
  </div>

  <div class="info">
    <h1>{movie.title}</h1>
    <p>{movie.overview}</p>
  </div>
</div>

<style>
  .hero {
    /* display: grid; */
    /* background: black; */
  }

  .backdrop img {
    width: 100%;
  }

  .backdrop::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 8rem;
    background: linear-gradient(to top, black, transparent);
    left: 0;
    bottom: 0;
  }

  .info {
    padding: 0 var(--side);
    display: flex;
    flex-direction: column;
    margin-top: -4rem;
    gap: 1rem;
  }

  .info h1,
  .info p {
    margin: 0;
  }

  @media (min-width: 60rem) {
    .hero {
      grid-template-columns: 1fr 60rem;
      grid-template-rows: auto;
    }

    .backdrop {
      grid-column: 2/3;
    }

    .info {
      position: absolute;
      bottom: 0.2rem;
      left: 2rem;
      width: 100%;
      backdrop-filter: blur(66px);
    }
  }
</style>
