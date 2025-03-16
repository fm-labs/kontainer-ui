import React from 'react'
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef, //if using TypeScript (optional, but recommended)
} from 'material-react-table'
import { IDockerResourceAttrs } from '~/types.ts'
import moment from 'moment/moment'
import BooleanChip from '~/elements/BooleanChip.tsx'

interface VolumesTableProps {
  data: IDockerResourceAttrs[]
  onRowClick?: (row: IDockerResourceAttrs) => void
}

const VolumesDfTableMaterial = ({ data, onRowClick }: VolumesTableProps) => {
  const handleRowClick = (row: IDockerResourceAttrs) => {
    if (onRowClick) {
      console.log('onRowClick', row)
      onRowClick(row)
    }
  }

  const columns = React.useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'Name', //simple recommended way to define a column
        header: 'Name',
        //muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
        enableHiding: false, //disable a feature for this column
        Cell: ({ cell, column }) => {
          const name = cell.getValue<string>()
          const row = cell.row.original
          return (
            <div title={name} onClick={() => handleRowClick(row)}>
              {name}
            </div>
          )
        },
      },
      {
        accessorKey: 'UsageData.RefCount', //simple recommended way to define a column
        header: 'In Use',
        //muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
        enableHiding: true, //disable a feature for this column
        Cell: ({ cell }) => {
          const count = cell.getValue<number>()
          // const containerIds = cell.row.original?._ContainerIds
          // const chipProps: ChipProps = {
          //   color: inUse ? 'success' : 'warning',
          //   size: 'small',
          //   label: inUse ? 'in-use' : 'no',
          // }
          // const typographyProps: TypographyProps = {
          //   variant: 'caption',
          //   component: 'span',
          //   color: count ? 'success' : 'warning',
          // }
          return (
            <div>
              {/*<Chip {...chipProps} />*/}
              {/*<Typography {...typographyProps}>
                {count > 0 ? 'Yes' : 'No'} ({count})
              </Typography>*/}
              <BooleanChip value={count > 0} trueLabel={`in-use (${count})`} falseLabel={'unused'} />
            </div>
          )
        },
      },
      {
        accessorKey: 'Driver', //simple recommended way to define a column
        header: 'Driver',
        //muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
        //enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: 'UsageData.Size', //simple recommended way to define a column
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
    enableRowSelection: false, //enable some features
    enableColumnOrdering: true, //enable a feature for all columns
    enableGlobalFilter: false, //turn off a feature

    //muiTableProps: { size: 'small' }, //custom props for the MUI Table component
    //muiTableBodyCellProps: { size: 'small' }, //custom props for all MUI TableBodyCell components

    initialState: {
      density: 'compact',
      columnVisibility: {
        Labels: false,
      },
      pagination: {
        pageSize: 20,
        pageIndex: 0,
      },
    },
  })

  //note: you can also pass table options as props directly to <MaterialReactTable /> instead of using useMaterialReactTable
  //but the useMaterialReactTable hook will be the most recommended way to define table options
  return <MaterialReactTable table={table} />
}

export default VolumesDfTableMaterial
