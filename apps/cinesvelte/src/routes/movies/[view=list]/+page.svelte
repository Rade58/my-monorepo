<script lang="ts">
  import * as api from "$lib/api";
  import Results from "$lib/components/Results.svelte";

  export let data;
  let appending = false;
</script>

<div class="column">
  <h1>{data.title}</h1>
  <Results
    movies={data.movies}
    next="/movies/{data.view}?page={data.next_page ? data.next_page : null}"
    on:end={async () => {
      if (!data.next_page) return;
      if (appending) return;

      const next = await api.get(fetch, data.endpoint, {
        page: String(data.next_page),
      });

      data.movies = [...data.movies, ...next.results];

      // @ts-expect-error
      data.next_page = next.page < next.total_pages;
    }}
  />
</div>

<style>
  /*  */
</style>
