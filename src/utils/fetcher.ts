export const API_BASE = import.meta.env.VITE_API_URL ?? '/api/v1'

export async function fetcher<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`API ${res.status}: ${body}`)
  }
  return res.json() as Promise<T>
}
