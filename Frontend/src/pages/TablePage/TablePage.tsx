import { columns } from '@/app/config/columns'
import { useAppDispatch, useAppSelector } from '@/app/hooks/useActions'
import { getData } from '@/app/lib/api'
import { setLoading } from '@/app/store/slices/isLoading'
import LoaderSvg from '@/entities/LoaderSvg/LoaderSvg'
import { LoaderData } from '@/global'
import { DataTable } from '@/widgets/DataTable/DataTable'
import { useEffect } from 'react'
import { LoaderFunction, useLoaderData } from 'react-router-dom'

export const tableLoader = (async ({ params }: any) => {
  const data = await getData(params.pageId)
  return { data }
}) satisfies LoaderFunction

export default function TablePage() {
  const { data } = useLoaderData() as LoaderData<typeof tableLoader>
  const isLoading = useAppSelector((state) => state.isLoading.value)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setLoading(false))
  }, [data])

  if (isLoading) {
    return (
      <div className="w-3/4 h-[500px] bg-background text-foreground flex flex-col justify-center items-center">
        <LoaderSvg className="md:w-32" />
      </div>
    )
  }
  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  )
}
