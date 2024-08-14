import { DataTable } from '@/widgets/DataTable/DataTable'
import PaginationBlock from '@/widgets/PaginationBlock/PaginationBlock'
import { useEffect, useState } from 'react'
import { columns, Data } from './config/columns'
import { useAppDispatch, useAppSelector } from './hooks/useActions'
import { setTotalPages } from './store/slices/totalPages'

async function getData(page: number): Promise<Data[]> {
  const response = await fetch(`http://localhost:5000/?page=${page}`)
  const data = await response.json()
  return data
}

async function getPagesAmount() {
  const response = await fetch('http://localhost:5000/pagesAmount')
  const data = await response.json()
  return data
}

export default function App() {
  const theme = useAppSelector((state) => state.theme.value)
  const currentPage = useAppSelector((state) => state.currentPage.value)
  const totalPages = useAppSelector((state) => state.totalPages.value)
  const dispatch = useAppDispatch()
  const [data, setData] = useState<Data[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const result = await getData(currentPage)
      const newTotalPages = await getPagesAmount()
      if (totalPages !== newTotalPages.pagesAmount) {
        dispatch(setTotalPages(newTotalPages.pagesAmount))
      }
      setData(result)
      setLoading(false)
    }
    fetchData()
  }, [currentPage])

  if (loading) {
    return (
      <div className="h-dvh w-dvw bg-background text-foreground flex flex-col justify-center items-center">
        <div className="loader">Loading...</div>
      </div>
    )
  }

  return (
    <div className="h-dvh w-dvw bg-background text-foreground flex flex-col justify-center items-center gap-2">
      <DataTable columns={columns} data={data} />
      <PaginationBlock />
    </div>
  )
}
