import type { LoadEvent } from "@sveltejs/kit";
import type { MovieDetails, MovieList } from "$lib/types";
import * as api from "$lib/api";

// const BASE = "https://api.movies.tastejs.com"

export async function load({ fetch }: LoadEvent) {
  // const response = await fetch(BASE + '/trending/movie/day')

  // const trending = await response.json() as MovieList;
  const [trending, now_playing, upcoming] = await Promise.all([
    api.get(fetch, "/trending/movie/day") as Promise<MovieList>,
    api.get(fetch, "/movie/now_playing") as Promise<MovieList>,
    api.get(fetch, "/movie/upcoming") as Promise<MovieList>,
  ]);
  /* const trending = (await api.get(fetch, "/trending/movie/day")) as MovieList;
  const now_playing = (await api.get(
    fetch,
    "/trending/now_playing"
  )) as MovieList;
  const upcoming = (await api.get(fetch, "/trending/upcoming")) as MovieList; */

  const featured = trending.results[0];

  const featured_data = (await api.get(fetch, "/movie/" + featured.id, {
    append_to_response: "images",
  })) as MovieDetails;

  // const featured_data = await featured_response.json() as MovieDetails

  return {
    trending,
    featured_data,
    now_playing,
    upcoming,
  };
}
