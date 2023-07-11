import type { LoadEvent } from "@sveltejs/kit";
import type { MovieDetails, MovieList } from "$lib/types";
import * as api from "$lib/api";

// const BASE = "https://api.movies.tastejs.com"

export async function load({ fetch }: LoadEvent) {
  // const response = await fetch(BASE + '/trending/movie/day')

  // const trending = await response.json() as MovieList;
  const trending = (await api.get(fetch, "/trending/movie/day")) as MovieList;
  const now_playing = (await api.get(
    fetch,
    "/trending/now_playing"
  )) as MovieList;
  const upcomming = (await api.get(fetch, "/trending/upcomming")) as MovieList;

  const featured = trending.results[0];

  const featured_data = (await api.get(fetch, "/movie/" + featured.id, {
    append_to_response: "images",
  })) as MovieDetails;

  // const featured_data = await featured_response.json() as MovieDetails

  return {
    trending,
    featured_data,
    now_playing,
    upcomming,
  };
}
