import React from 'react'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef, //if using TypeScript (optional, but recommended)
} from 'material-react-table'
import { IDockerResourceAttrs } from '../../../types.ts'
import moment from 'moment/moment'

const VolumesTableMaterial = ({ data }: { data: IDockerResourceAttrs[] }) => {
  const columns = React.useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'Name', //simple recommended way to define a column
        header: 'Name',
        //muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: '_InUse', //simple recommended way to define a column
        header: 'In Use',
        //muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
        enableHiding: true, //disable a feature for this column
        Cell: ({ cell }) => {
          const inUse = cell.getValue<boolean>()
          return <div>{/*inUse ? 'in-use' : 'no'*/}</div>
        },
      },
      // {
      //   accessorKey: 'Scope', //simple recommended way to define a column
      //   header: 'Scope',
      //   //muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
      //   //enableHiding: false, //disable a feature for this column
      // },
      {
        accessorKey: '_Size', //simple recommended way to define a column
        header: 'Size',
        //muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
        enableHiding: true, //disable a feature for this column
        Cell: ({ cell }) => {
          const size = cell.getValue<number>()
          return <div>{(size / 1024).toFixed(2)} kB</div>
        },
      },
      {
        accessorKey: 'CreatedAt',
        header: 'Created',
        Cell: ({ cell }) => {
          const date = cell.getValue<string>()
          if (!date) {
            return '-'
          }
          return moment(date).fromNow()
        },
      },
      {
        //accessorFn: (originalRow) => parseInt(originalRow.age), //alternate way
        accessorKey: 'Labels', //simple recommended way to define a column
        header: 'labels',
        //Header: <i style={{ color: 'red' }}>Age</i>, //optional custom markup
        Cell: ({ cell }) => {
          const labels = cell.getValue<object>()
          if (!labels) {
            return '-'
          }
          return Object.entries(labels).map(([key, value]) => (
            <div key={key}>
              {key}={value}
            </div>
          ))
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

export default VolumesTableMaterial
