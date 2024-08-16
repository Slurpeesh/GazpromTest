import { Data } from '../config/columns'

const URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '/api'

let controller: AbortController | null = null

export async function getData(page: number): Promise<Data[]> {
  if (controller) {
    controller.abort()
  }

  controller = new AbortController()
  const signal = controller.signal

  const response = await fetch(`${URL}/?page=${page}`, { signal })
  const data = await response.json()
  return data
}

export async function getPagesAmount(): Promise<number> {
  const response = await fetch(`${URL}/pagesAmount`)
  const { pagesAmount } = await response.json()
  return pagesAmount
}
