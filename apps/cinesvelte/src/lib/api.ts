const BASE = "https://api.movies.tastejs.com"


export async function get(fetch: typeof globalThis.fetch, endpoint: string, params?: Record<string, string>){
  
  const q = new URLSearchParams(params)
  
  const response = await fetch(BASE + "/" + endpoint  + "?" + q.toString() ) 
  return await response.json()
}
