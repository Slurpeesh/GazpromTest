import { Data } from '../config/columns'

export async function getData(page: number): Promise<Data[]> {
  const response = await fetch(`http://localhost:5000/?page=${page}`)
  const data = await response.json()
  return data
}

export async function getPagesAmount() {
  const response = await fetch('http://localhost:5000/pagesAmount')
  const data = await response.json()
  return data
}
