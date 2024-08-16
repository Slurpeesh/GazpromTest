import { initLoader } from '@/app/App'
import { cn } from '@/app/lib/utils'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/entities/Pagination/Pagination'
import { LoaderData } from '@/global'
import { useMemo } from 'react'
import { useLoaderData, useLocation } from 'react-router-dom'

export default function PaginationBlock() {
  const { pagesAmount } = useLoaderData() as LoaderData<typeof initLoader>
  const location = useLocation()

  const curPage = Number(location.pathname.slice(1))

  const visiblePages = useMemo(() => {
    let arr: Array<number>
    switch (curPage) {
      case 1:
        arr = [curPage, curPage + 1, curPage + 2]
        break
      case pagesAmount:
        arr = [pagesAmount - 2, pagesAmount - 1, pagesAmount]
        break
      default:
        arr = [curPage - 1, curPage, curPage + 1]
        break
    }
    return arr
  }, [curPage])

  return (
    <Pagination>
      <PaginationContent className="flex-wrap">
        <PaginationItem>
          <PaginationPrevious
            to={`/${curPage === 1 ? curPage : curPage - 1}`}
            className="hover:cursor-pointer hover:bg-muted"
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
                tabIndex={curPage === item ? -1 : undefined}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        })}
        {curPage < pagesAmount - 1 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                to={`/${pagesAmount}`}
                className={cn('hover:bg-muted', {
                  'bg-accent hover:bg-accent': curPage === pagesAmount,
                })}
              >
                {pagesAmount}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            to={`/${curPage === pagesAmount ? curPage : curPage + 1}`}
            className="hover:cursor-pointer hover:bg-muted"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
