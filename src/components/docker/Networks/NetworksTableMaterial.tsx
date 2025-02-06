import React from 'react'
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef, //if using TypeScript (optional, but recommended)
} from 'material-react-table'
import { IDockerResourceAttrs } from '../../../types.ts'
import moment from 'moment/moment'

const NetworksTableMaterial = ({ data }: { data: IDockerResourceAttrs[] }) => {
  const columns = React.useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'Name',
        header: 'Name',
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: 'Id',
        header: 'Id',
        Cell: ({ cell }) => {
          const id = cell.getValue<string>()
          return <div title={id}>{id.substring(0, 32)}</div>
        },
      },
      {
        accessorKey: 'Driver',
        header: 'Driver',
      },
      {
        accessorKey: 'Labels',
        header: 'Labels',
        Cell: ({ cell }) => {
          const labels = cell.getValue<object>()
          if (!labels) {
            return '-'
          }
          return Object.entries(labels).map(([key, value]) => <div key={key}>{value}</div>)
        },
      },
      {
        accessorKey: 'Created',
        header: 'Created',
        Cell: ({ cell }) => {
          const date = cell.getValue<string>()
          if (!date) {
            return '-'
          }
          return moment(date).fromNow()
        },
      },
    ],
    [],
  )

  //pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowSelection: true, //enable some features
    enableColumnOrdering: true, //enable a feature for all columns
    enableGlobalFilter: false, //turn off a feature

    muiTableProps: { size: 'small' }, //custom props for the MUI Table component
    //muiTableBodyCellProps: { size: 'small' }, //custom props for all MUI TableBodyCell components
  })

  //note: you can also pass table options as props directly to <MaterialReactTable /> instead of using useMaterialReactTable
  //but the useMaterialReactTable hook will be the most recommended way to define table options
  return <MaterialReactTable table={table} />
}

export default NetworksTableMaterial
