import { useAppDispatch, useAppSelector } from '@/app/hooks/useActions'
import { cn } from '@/app/lib/utils'
import { setPage } from '@/app/store/slices/currentPage'
import { setLoading } from '@/app/store/slices/isLoading'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/entities/Pagination/Pagination'
import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function PaginationBlock() {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector((state) => state.currentPage.value)
  const totalPages = useAppSelector((state) => state.totalPages.value)
  const navigate = useNavigate()
  const location = useLocation()

  const visiblePages = useMemo(() => {
    let arr: Array<number>
    switch (currentPage) {
      case 1:
        arr = [currentPage, currentPage + 1, currentPage + 2]
        break
      case totalPages:
        arr = [totalPages - 2, totalPages - 1, totalPages]
        break
      default:
        arr = [currentPage - 1, currentPage, currentPage + 1]
        break
    }
    return arr
  }, [currentPage])

  useEffect(() => {
    const page = Number(location.pathname.slice(1))
    dispatch(setPage(page))
  }, [location])

  function previousPageHandler() {
    if (currentPage > 1) {
      navigate(`${currentPage - 1}`)
      dispatch(setPage(currentPage - 1))
      dispatch(setLoading(true))
    }
  }

  function nextPageHandler() {
    if (currentPage < totalPages) {
      navigate(`${currentPage + 1}`)
      dispatch(setPage(currentPage + 1))
      dispatch(setLoading(true))
    }
  }

  function pageSelectHandler(page: number) {
    navigate(`${page}`)
    dispatch(setPage(page))
    dispatch(setLoading(true))
  }

  return (
    <Pagination>
      <PaginationContent className="flex-wrap">
        <PaginationItem>
          <PaginationPrevious
            className="hover:cursor-pointer hover:bg-muted"
            onClick={() => previousPageHandler()}
          />
        </PaginationItem>
        {currentPage > 2 && (
          <>
            <PaginationItem>
              <PaginationLink
                className={cn('hover:bg-muted', {
                  'bg-accent hover:bg-accent': currentPage === 1,
                })}
                onClick={() => pageSelectHandler(1)}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {visiblePages.map((item, index) => {
          return (
            <PaginationItem key={index}>
              <PaginationLink
                className={cn('hover:bg-muted', {
                  'bg-accent hover:bg-accent pointer-events-none':
                    currentPage === item,
                })}
                isActive={item === currentPage}
                onClick={() => pageSelectHandler(item)}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        })}
        {currentPage < totalPages - 1 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                className={cn('hover:bg-muted', {
                  'bg-accent hover:bg-accent': currentPage === totalPages,
                })}
                onClick={() => pageSelectHandler(totalPages)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            className="hover:cursor-pointer hover:bg-muted"
            onClick={() => nextPageHandler()}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
