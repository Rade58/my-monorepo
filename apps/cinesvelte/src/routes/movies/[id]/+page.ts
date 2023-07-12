import type { LoadEvent } from "@sveltejs/kit";
import * as api from "$lib/api";
import type { MovieDetails } from "$lib/types";

export async function load({ params, fetch }: LoadEvent) {
  //
  const movie = (await api.get(fetch, `/movie/${params.id}`, {
    append_to_response: "images,videos,recommendations",
  })) as MovieDetails;
  //

  const trailer = movie.videos.results.find((video) => {
    return (
      (video.official &&
        video.site === "Youtube" &&
        video.type === "Trailer") ||
      video.type === "Teaser"
    );
  });

  return {
    movie,
    trailer,
  };
}
