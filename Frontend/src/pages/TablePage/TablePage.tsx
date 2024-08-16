import { columns } from '@/app/config/columns'
import { getData } from '@/app/lib/api'
import LoaderSvg from '@/entities/LoaderSvg/LoaderSvg'
import { LoaderData } from '@/global'
import { DataTable } from '@/widgets/DataTable/DataTable'
import { Suspense } from 'react'
import { Await, defer, LoaderFunction, useLoaderData } from 'react-router-dom'

export const tableLoader = (async ({ params }: any) => {
  const dataPromise = getData(params.pageId)
  return defer({ data: dataPromise })
}) satisfies LoaderFunction

export default function TablePage() {
  const { data } = useLoaderData() as LoaderData<typeof tableLoader>

  return (
    <Suspense
      fallback={
        <div className="w-3/4 h-[500px] bg-background text-foreground flex flex-col justify-center items-center">
          <LoaderSvg className="md:w-32" />
        </div>
      }
    >
      <Await resolve={data} errorElement={<div>Error</div>}>
        {(data) => <DataTable columns={columns} data={data} />}
      </Await>
    </Suspense>
  )
}
