import ThemeButton from '@/features/ThemeButton/ThemeButton'
import { LoaderData } from '@/global'
import PaginationBlock from '@/widgets/PaginationBlock/PaginationBlock'
import { useEffect } from 'react'
import {
  LoaderFunction,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { getPagesAmount } from './lib/api'

export const initLoader = (async () => {
  const pagesAmount = await getPagesAmount()
  return { pagesAmount }
}) satisfies LoaderFunction

export default function App() {
  const { pagesAmount } = useLoaderData() as LoaderData<typeof initLoader>
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const initPage = Number(location.pathname.slice(1))
    if (initPage < 1 || Number.isNaN(initPage)) {
      navigate(`1`, { replace: true })
    } else if (initPage > pagesAmount) {
      navigate(`${pagesAmount}`, { replace: true })
    }
  }, [])
  return (
    <div className="h-dvh w-dvw bg-background text-foreground flex flex-col justify-between items-center py-5">
      <Outlet />
      <PaginationBlock />
      <ThemeButton />
    </div>
  )
}
