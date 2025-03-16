import React from 'react'
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef, //if using TypeScript (optional, but recommended)
} from 'material-react-table'
import { IDockerResourceAttrs } from '~/types.ts'
import moment from 'moment'
import BooleanChip from '~/elements/BooleanChip.tsx'
import ImageId from '~/components/docker/Images/components/ImageId.tsx'
import FileSize from '~/elements/FileSize.tsx'

interface ImagesTableProps {
  data: IDockerResourceAttrs[]
  onRowClick?: (row: IDockerResourceAttrs) => void
}

const ImagesDfTableMaterial = ({ data, onRowClick }: ImagesTableProps) => {
  const handleRowClick = (row: IDockerResourceAttrs) => {
    if (onRowClick) {
      console.log('onRowClick', row)
      onRowClick(row)
    }
  }

  const columns = React.useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'Id', //simple recommended way to define a column
        header: 'Id',
        //muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
        enableHiding: false, //disable a feature for this column
        Cell: ({ cell }) => {
          const id = cell.getValue<string>()
          const row = cell.row.original
          return (
            <span onClick={() => handleRowClick(row)}>
              <ImageId value={id} />
            </span>
          )
        },
      },
      {
        //accessorFn: (originalRow) => parseInt(originalRow.age), //alternate way
        accessorKey: 'RepoTags', //simple recommended way to define a column
        id: 'Name', //id required if you use accessorFn instead of accessorKey
        header: 'Name',
        //Header: <i style={{ color: 'red' }}>Age</i>, //optional custom markup
        Cell: ({ cell }) => {
          const tags = cell.getValue<string[]>()
          if (!tags || tags.length === 0) {
            return '-'
          }
          return tags.map((tag) => <div key={tag}>{tag}</div>)
        },
      },
      {
        accessorKey: 'Containers', //simple recommended way to define a column
        header: 'In Use',
        //muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
        enableHiding: true, //disable a feature for this column
        grow: 0, //disable column resizing
        Cell: ({ cell }) => {
          const numberOfContainers = cell.getValue<number>()
          return <BooleanChip value={numberOfContainers > 0} trueLabel={'in use'} falseLabel={'unused'}></BooleanChip>
        },
      },
      {
        accessorKey: 'Size', //simple recommended way to define a column
        header: 'Size',
        //muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
        enableHiding: true, //disable a feature for this column
        Cell: ({ cell }) => {
          const size = cell.getValue<number>()
          //return <div style={{ textAlign: 'right' }}>{(size / 1024 / 1024).toFixed(2)} MB</div>
          return (
            <div style={{ textAlign: 'right' }}>
              <FileSize bytes={size} />
            </div>
          )
        },
      },
      {
        accessorKey: 'SharedSize', //simple recommended way to define a column
        header: 'Shared Size',
        //muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
        enableHiding: true, //disable a feature for this column
        Cell: ({ cell }) => {
          const size = cell.getValue<number>()
          //return <div style={{ textAlign: 'right' }}>{(size / 1024 / 1024).toFixed(2)} MB</div>
          return (
            <div style={{ textAlign: 'right' }}>
              <FileSize bytes={size} />
            </div>
          )
        },
      },
      {
        accessorKey: 'Created',
        header: 'Created',
        Cell: ({ cell }) => {
          const timestamp = cell.getValue<number>()
          if (!timestamp) {
            return '-'
          }
          return <div style={{ textAlign: 'right' }}>{moment.unix(timestamp).fromNow()}</div>
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

    muiTableProps: { size: 'small' }, //custom props for the MUI Table component
    //muiTableBodyCellProps: { size: 'small' }, //custom props for all MUI TableBodyCell components

    // onDensityChange: (density) => {
    //   console.log('density changed', density)
    //   return density
    // },

    initialState: {
      density: 'compact',
      pagination: {
        pageSize: 15,
        pageIndex: 0,
      },
    },
  })

  //note: you can also pass table options as props directly to <MaterialReactTable /> instead of using useMaterialReactTable
  //but the useMaterialReactTable hook will be the most recommended way to define table options
  return <MaterialReactTable table={table} />
}

export default ImagesDfTableMaterial
