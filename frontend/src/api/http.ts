const API_BASE = '/api'

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

interface RequestOptions {
  method?: string
  body?: unknown
  signal?: AbortSignal
}

export async function request(path: string, { method = 'GET', body, signal }: RequestOptions = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  })

  if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
  if (response.status === 204) return null
  return (await response.json()) as unknown
}
