const BASE = "https://api.movies.tastejs.com";
export const MEDIA_BASE = "https://image.tmdb.org/t/p";

const cache = new Map<string, any>();

export async function get(
  fetch: typeof globalThis.fetch,
  endpoint: string,
  params?: Record<string, string>
) {
  const q = new URLSearchParams(params);
  const url = BASE + "/" + endpoint + "?" + q.toString();

  if (cache.has(url)) {
    // console.log("cache hit", url);
    return cache.get(url);
  }
  // console.log("cache miss", url);

  const response = await fetch(url);
  const data = await response.json();

  cache.set(url, data);

  return data;
}

export function media(file_path: string, width: number) {
  return `${MEDIA_BASE}/w${width}${file_path}`;
}
