const BASE = "https://api.movies.tastejs.com"


export async function get(fetch: typeof globalThis.fetch, endpoint: string, params?: Record<string, string>){
  const response = await fetch(BASE + "/" + endpoint) 
  return await response.json()
}
