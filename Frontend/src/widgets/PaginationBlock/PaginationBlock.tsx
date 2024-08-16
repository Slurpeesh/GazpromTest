import { useAppDispatch, useAppSelector } from '@/app/hooks/useActions'
import { cn } from '@/app/lib/utils'
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
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export default function PaginationBlock() {
  const dispatch = useAppDispatch()
  const totalPages = useAppSelector((state) => state.totalPages.value)
  const location = useLocation()

  const curPage = Number(location.pathname.slice(1))

  const visiblePages = useMemo(() => {
    let arr: Array<number>
    switch (curPage) {
      case 1:
        arr = [curPage, curPage + 1, curPage + 2]
        break
      case totalPages:
        arr = [totalPages - 2, totalPages - 1, totalPages]
        break
      default:
        arr = [curPage - 1, curPage, curPage + 1]
        break
    }
    return arr
  }, [curPage])

  function previousPageHandler() {
    if (curPage > 1) {
      dispatch(setLoading(true))
    }
  }

  function nextPageHandler() {
    if (curPage < totalPages) {
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
            to={`/${curPage === 1 ? curPage : curPage - 1}`}
            className="hover:cursor-pointer hover:bg-muted"
            onClick={() => previousPageHandler()}
          />
        </PaginationItem>
        {curPage > 2 && (
          <>
            <PaginationItem>
              <PaginationLink
                to="/1"
                className={cn('hover:bg-muted', {
                  'bg-accent hover:bg-accent': curPage === 1,
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
                    curPage === item,
                })}
                isActive={item === curPage}
                onClick={() => pageSelectHandler()}
                tabIndex={curPage === item ? -1 : undefined}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        })}
        {curPage < totalPages - 1 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                to={`/${totalPages}`}
                className={cn('hover:bg-muted', {
                  'bg-accent hover:bg-accent': curPage === totalPages,
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
            to={`/${curPage === totalPages ? curPage : curPage + 1}`}
            className="hover:cursor-pointer hover:bg-muted"
            onClick={() => nextPageHandler()}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
