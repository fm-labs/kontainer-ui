import React from 'react'
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { IDockerResourceAttrs } from '../../../types.ts'
import IconButton from '@mui/material/IconButton'
import { HiOutlinePlay, HiPause, HiStop, HiTrash } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { useEnvApi } from '../../../helper/useEnvApi.ts'
import { useErrorHandler } from '../../../helper/useErrorHandler.ts'
import { toast } from 'react-toastify'

const StacksTableMaterial = ({ data }: { data: IDockerResourceAttrs[] }) => {
  const api = useEnvApi()
  // const defaultErrorHandler = (error: any) => {
  //   toast.error(error?.message || 'An Error occurred')
  // }

  const { toastError: defaultErrorHandler } = useErrorHandler()

  const handleStackStartClick = (id: string) => () => {
    console.log('Starting stack', id)
    api
      .startStack()(id)
      //.then((response) => toast.info(response?.data))
      .catch(defaultErrorHandler)
  }

  const handleStackStopClick = (id: string) => () => {
    console.log('Stopping stack', id)
    api
      .stopStack()(id)
      //.then((response) => toast.info(response?.data))
      .catch(defaultErrorHandler)
  }

  const handleStackPauseClick = (id: string) => () => {
    console.log('Pausing stack', id)
    api.stopStack()(id).catch(defaultErrorHandler)
  }

  const handleStackRemoveClick = (id: string) => () => {
    console.log('Removing stack', id)
    api.removeStack()(id).catch(defaultErrorHandler)
  }

  const columns = React.useMemo<MRT_ColumnDef<IDockerResourceAttrs>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Stack name',
        enableHiding: false, //disable a feature for this column
        Cell: ({ cell }) => {
          const name = cell.getValue<string>()
          return (
            <Link to={`${name}`} title={name}>
              {name}
            </Link>
          )
        },
      },
      {
        accessorKey: 'running',
        header: 'Running',
        Cell: ({ cell }) => {
          const running = cell.getValue<boolean>()
          return <div>{running ? 'Yes' : 'No'}</div>
        },
      },
      {
        accessorKey: 'managed',
        header: 'Managed',
        Cell: ({ cell }) => {
          const managed = cell.getValue<boolean>()
          return <div>{managed ? 'Yes' : 'No'}</div>
        },
      },
      {
        id: 'Actions',
        header: 'Actions',
        //sx: { textAlign: 'right' },
        Cell: ({ cell }) => {
          const row = cell.row.original
          return (
            <div style={{ textAlign: 'right' }}>
              {!row?.running && <></>}
              <IconButton size={'small'} title={'Start'} onClick={handleStackStartClick(row.name)}>
                <HiOutlinePlay />
              </IconButton>
              {row?.running && <></>}
              <IconButton size={'small'} title={'Pause'} onClick={handleStackPauseClick(row.name)}>
                <HiPause />
              </IconButton>
              {row?.running && <></>}
              <IconButton size={'small'} title={'Stop'} onClick={handleStackStopClick(row.name)}>
                <HiStop />
              </IconButton>
              <IconButton size={'small'} title={'Delete'} onClick={handleStackRemoveClick(row.name)}>
                <HiTrash />
              </IconButton>
            </div>
          )
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
      sorting: [{ id: 'name', desc: false }],
    },
  })

  //note: you can also pass table options as props directly to <MaterialReactTable /> instead of using useMaterialReactTable
  //but the useMaterialReactTable hook will be the most recommended way to define table options
  return <MaterialReactTable table={table} />
}

export default StacksTableMaterial
