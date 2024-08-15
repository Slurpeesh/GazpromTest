import ThemeButton from '@/features/ThemeButton/ThemeButton'
import PaginationBlock from '@/widgets/PaginationBlock/PaginationBlock'
import { useEffect } from 'react'
import {
  LoaderFunction,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { useAppDispatch } from './hooks/useActions'
import { getPagesAmount } from './lib/api'
import { setPage } from './store/slices/currentPage'
import { setTotalPages } from './store/slices/totalPages'

export type LoaderData<TLoaderFn extends LoaderFunction> = Awaited<
  ReturnType<TLoaderFn>
> extends Response | infer D
  ? D
  : never

export const initLoader = (async () => {
  const totalPages = await getPagesAmount()
  const numTotalPages = totalPages.pagesAmount
  return { numTotalPages }
}) satisfies LoaderFunction

export default function App() {
  const { numTotalPages } = useLoaderData() as LoaderData<typeof initLoader>
  const location = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(setTotalPages(numTotalPages))
    const initPage = Number(location.pathname.slice(1))
    if (initPage < 1 || Number.isNaN(initPage)) {
      navigate(`1`, { replace: true })
      dispatch(setPage(1))
    } else if (initPage > numTotalPages) {
      navigate(`${numTotalPages}`, { replace: true })
      dispatch(setPage(numTotalPages))
    } else {
      dispatch(setPage(initPage))
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
