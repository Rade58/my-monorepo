<script lang="ts">
  import Results from "$lib/components/Results.svelte";

  export let data;
</script>

<div class="column">
  <h1>{data.title}</h1>
  <Results
    movies={data.movies}
    next="/movies/{data.view}?page={data.next_page ? data.next_page : null}"
    on:end={() => {
      console.log("Todo - load some more data");
    }}
  />
</div>
