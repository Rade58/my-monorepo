const BASE = "https://api.movies.tastejs.com"
export const MEDIA_BASE = 'https://image.tmdb.org/t/p'


export async function get(fetch: typeof globalThis.fetch, endpoint: string, params?: Record<string, string>){
  
  const q = new URLSearchParams(params)
  
  const response = await fetch(BASE + "/" + endpoint  + "?" + q.toString() ) 
  return await response.json()
}

export function media(file_path: string, width: number){
  return `${MEDIA_BASE}/w${width}${file_path}`
}