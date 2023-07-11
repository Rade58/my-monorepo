<script lang="ts">
  import { media } from "$lib/api";
  import type { MovieListResult } from "$lib/types";
  import { onMount } from "svelte";

  export let movies: MovieListResult[];
  export let next: string | null;

  let viewport: HTMLDivElement;
  let results: HTMLDivElement;

  let a: number = 0;
  let b: number = movies.length;
  let paddingTop = 0;
  let paddingBottom = 0;
  let item_width: number;
  let item_height: number;
  let num_columns = 4;

  function handle_resize(
    e?: UIEvent & {
      currentTarget: EventTarget & Window;
    }
  ) {
    //
    //
    const first = results.firstChild as HTMLAnchorElement;
    if (first) {
      item_width = first.offsetWidth;
      item_height = first.offsetHeight;
    }
    num_columns = 4;

    //
    handle_scroll();
  }

  function handle_scroll(
    e?: UIEvent & {
      currentTarget: EventTarget & HTMLDivElement;
    }
  ) {
    //
    a = Math.floor((viewport.scrollTop / item_height) * num_columns);
    b = Math.floor(
      ((viewport.scrollTop + viewport.clientHeight) / item_height) * num_columns
    );
  }

  onMount(handle_resize);
</script>

<svelte:window on:resize={handle_resize} />

<p class="column">showing items {a} - {b}</p>

<div
  bind:this={viewport}
  class="viewport"
  style="height: 500px"
  on:scroll={handle_scroll}
>
  <div bind:this={results} class="results column">
    {#each movies.slice(a, b) as movie}
      <a href="/movies/{movie.id}">
        <img src={media(movie.poster_path, 500)} alt={movie.title} /></a
      >
    {/each}
  </div>
  {#if next}
    <a style="margin-left: 3.6rem" href={next}>next page</a>
  {/if}
</div>

<style>
  .viewport {
    height: 0;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .results {
    --columns: 2;
    display: grid;
    grid-template-rows: 2em repeat(auto, 1fr);
    grid-template-columns: repeat(var(--columns), 1fr);
    margin: 0 -0.5rem;
  }

  a {
    padding: 0.5rem;
  }

  img {
    width: 100%;
    aspect-ratio: 2 / 3;
    height: auto;
  }

  @media (min-width: 30rem) {
    .results {
      --columns: 3;
    }
  }

  @media (min-width: 40rem) {
    .results {
      --columns: 4;
    }
  }

  @media (min-width: 50rem) {
    .results {
      --columns: 5;
    }
  }

  @media (min-width: 60rem) {
    .results {
      --columns: 6;
    }
  }
</style>
