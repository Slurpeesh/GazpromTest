import { useAppDispatch, useAppSelector } from '@/app/hooks/useActions'
import { cn } from '@/app/lib/utils'
import { setPage } from '@/app/store/slices/currentPage'
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

export default function PaginationBlock() {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector((state) => state.currentPage.value)
  const totalPages = useAppSelector((state) => state.totalPages.value)

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

  function previousPageHandler() {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1))
    }
  }

  function nextPageHandler() {
    if (currentPage < totalPages) {
      dispatch(setPage(currentPage + 1))
    }
  }

  function pageSelectHandler(page: number) {
    dispatch(setPage(page))
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="hover:cursor-pointer hover:bg-slate-800"
            onClick={() => previousPageHandler()}
          />
        </PaginationItem>
        {currentPage > 2 && (
          <>
            <PaginationItem>
              <PaginationLink
                className={cn('hover:bg-slate-800', {
                  'bg-blue-900 hover:bg-blue-900': currentPage === 1,
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

        {visiblePages.map((item) => {
          return (
            <PaginationItem>
              <PaginationLink
                className={cn('hover:bg-slate-800', {
                  'bg-blue-900 hover:bg-blue-900': currentPage === item,
                })}
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
                className={cn('hover:bg-slate-800', {
                  'bg-blue-900 hover:bg-blue-900': currentPage === totalPages,
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
            className="hover:cursor-pointer hover:bg-slate-800"
            onClick={() => nextPageHandler()}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
