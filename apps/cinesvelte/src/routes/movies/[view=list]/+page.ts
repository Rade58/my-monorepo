import type { LoadEvent } from "@sveltejs/kit";
import * as api from "$lib/api";
import { views } from "$lib/views";
import type { MovieList } from "$lib/types";

export async function load({ params, url, fetch }: LoadEvent) {
  const view = views[params.view as string];

  const data = (await api.get(fetch, view.endpoint)) as MovieList;
  //
  //
  return {
    title: view.title,
    endpoint: view.endpoint,
    movies: data.results,
  };
}
