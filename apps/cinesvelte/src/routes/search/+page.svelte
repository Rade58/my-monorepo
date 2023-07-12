<script lang="ts">
  import Results from "$lib/components/Results.svelte";

  export let data;
</script>

<div class="column">
  <h1>Search</h1>
  <form>
    <input
      type="text"
      name="query"
      value={data.query}
      autocomplete="off"
      spellcheck="false"
    />
  </form>
  {#if data.query}
    <Results movies={data.movies} next={null} />
  {/if}
</div>

<style>
  input {
    font-family: inherit;
    font-size: 2em;
    padding: 0.5em;
    width: 100%;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 0.2rem;
    color: white;
  }

  input:focus-visible {
    outline: 2px solid var(--accent);
  }
</style>
