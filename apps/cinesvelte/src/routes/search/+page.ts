import type { LoadEvent } from "@sveltejs/kit";
import * as api from "$lib/api";
import type { MovieList } from "$lib/types";

export async function load({ params, url, fetch }: LoadEvent) {
  const query = url.searchParams.get("query");

  if (!query) {
    return {
      query,
      movies: [],
    };
  }

  const data: MovieList = await api.get(fetch, "search/movie", { query });

  return {
    query,
    movies: data.results,
  };
}
