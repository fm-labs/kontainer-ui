import React from 'react'
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef, //if using TypeScript (optional, but recommended)
} from 'material-react-table'
import { IDockerResourceAttrs } from '../../../types.ts'
import moment from 'moment/moment'

const EventsTableMaterial = ({ data }: { data: IDockerResourceAttrs[] }) => {
  const columns = React.useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'time',
        header: 'Time',
        Cell: ({ cell }) => {
          const value: number = cell.getValue<number>()
          //return moment(value * 1000).format('YYYY-MM-DD HH:mm:ss')
          return moment(value * 1000).fromNow()
        },
      },
      {
        accessorKey: 'from',
        header: 'From',
      },
      {
        accessorKey: 'Type',
        header: 'Type',
      },
      {
        accessorKey: 'Action',
        header: 'Action',
      },
    ],
    [],
  )

  //pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowSelection: false, //enable some features
    enableColumnOrdering: true, //enable a feature for all columns
    enableGlobalFilter: false, //turn off a feature

    //muiTableProps: { size: 'small' }, //custom props for the MUI Table component
    //muiTableBodyCellProps: { size: 'small' }, //custom props for all MUI TableBodyCell components

    initialState: {
      density: 'compact',
    },
  })

  //note: you can also pass table options as props directly to <MaterialReactTable /> instead of using useMaterialReactTable
  //but the useMaterialReactTable hook will be the most recommended way to define table options
  return <MaterialReactTable table={table} />
}

export default EventsTableMaterial
