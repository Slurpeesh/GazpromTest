'use client'

import { ColumnDef } from '@tanstack/react-table'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Data = {
  articleid: string
  subarticleid: string
  articlename: string
  external_str_id: string
  ecrlongname: string
}

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: 'articleid',
    header: 'articleid',
  },
  {
    accessorKey: 'subarticleid',
    header: 'subarticleid',
  },
  {
    accessorKey: 'articlename',
    header: 'articlename',
  },
  {
    accessorKey: 'external_str_id',
    header: 'external_str_id',
  },
  {
    accessorKey: 'ecrlongname',
    header: 'ecrlongname',
  },
]
