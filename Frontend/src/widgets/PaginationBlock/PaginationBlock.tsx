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
import { useLocation } from 'react-router-dom'

export default function PaginationBlock() {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector((state) => state.currentPage.value)
  const totalPages = useAppSelector((state) => state.totalPages.value)
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
      dispatch(setLoading(true))
    }
  }

  function nextPageHandler() {
    if (currentPage < totalPages) {
      dispatch(setLoading(true))
    }
  }

  function pageSelectHandler() {
    dispatch(setLoading(true))
  }

  return (
    <Pagination>
      <PaginationContent className="flex-wrap">
        <PaginationItem>
          <PaginationPrevious
            to={`/${currentPage === 1 ? currentPage : currentPage - 1}`}
            className="hover:cursor-pointer hover:bg-muted"
            onClick={() => previousPageHandler()}
          />
        </PaginationItem>
        {currentPage > 2 && (
          <>
            <PaginationItem>
              <PaginationLink
                to="/1"
                className={cn('hover:bg-muted', {
                  'bg-accent hover:bg-accent': currentPage === 1,
                })}
                onClick={() => pageSelectHandler()}
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
                to={`/${item}`}
                className={cn('hover:bg-muted', {
                  'bg-accent hover:bg-accent pointer-events-none':
                    currentPage === item,
                })}
                isActive={item === currentPage}
                onClick={() => pageSelectHandler()}
                tabIndex={currentPage === item ? -1 : undefined}
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
                to={`/${totalPages}`}
                className={cn('hover:bg-muted', {
                  'bg-accent hover:bg-accent': currentPage === totalPages,
                })}
                onClick={() => pageSelectHandler()}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            to={`/${
              currentPage === totalPages ? currentPage : currentPage + 1
            }`}
            className="hover:cursor-pointer hover:bg-muted"
            onClick={() => nextPageHandler()}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
