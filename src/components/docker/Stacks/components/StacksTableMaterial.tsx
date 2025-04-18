import React from 'react'
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { IDockerResourceAttrs } from '../../../../types.ts'
import { Link } from 'react-router-dom'
import { useAgentDockerApi } from '../../../../helper/useAgentDockerApi.ts'
import StackIconControls from './StackIconControls.tsx'
import { useErrorHandler } from '../../../../helper/useErrorHandler.ts'
import AppIcons from '../../../../elements/AppIcons.tsx'
import IconButton from '@mui/material/IconButton'
import StackStatusChip from '~/components/docker/Stacks/components/StackStatusChip.tsx'
import StackManagedChip from './StackManagedChip.tsx'

const StacksTableMaterial = ({ data }: { data: IDockerResourceAttrs[] }) => {
  const api = useAgentDockerApi()
  // const defaultErrorHandler = (error: any) => {
  //   toast.error(error?.message || 'An Error occurred')
  // }

  //const { toastError: defaultErrorHandler } = useErrorHandler()

  // const handleStackStartClick = (id: string) => () => {
  //   console.log('Starting stack', id)
  //   api
  //     .startStack(id)
  //     //.then((response) => toast.info(response?.data))
  //     .catch(defaultErrorHandler)
  // }
  //
  // const handleStackStopClick = (id: string) => () => {
  //   console.log('Stopping stack', id)
  //   api
  //     .stopStack(id)
  //     //.then((response) => toast.info(response?.data))
  //     .catch(defaultErrorHandler)
  // }
  //
  // const handleStackPauseClick = (id: string) => () => {
  //   console.log('Pausing stack', id)
  //   api.stopStack(id).catch(defaultErrorHandler)
  // }
  //
  // const handleStackDeleteClick = (id: string) => () => {
  //   console.log('Delete stack', id)
  //   api.deleteStack(id).catch(defaultErrorHandler)
  // }
  //
  // const handleStackDestroyClick = (id: string) => () => {
  //   console.log('Destroy stack', id)
  //   api.destroyStack(id).catch(defaultErrorHandler)
  // }
  //
  // const handleStackSyncClick = (id: string) => () => {
  //   console.log('Sync stack', id)
  //   api.syncStack(id).catch(defaultErrorHandler)
  // }

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
        accessorKey: 'managed',
        header: 'Managed',
        Cell: ({ cell }) => {
          const managed = cell.getValue<boolean>()
          return <StackManagedChip value={managed} />
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        Cell: ({ cell }) => {
          const status = cell.getValue<string>()
          return <StackStatusChip value={status} />
        },
      },
      {
        accessorKey: 'containers',
        header: 'Containers',
        Cell: ({ cell }) => {
          const containers = cell.getValue<any[]>()
          if (!containers || containers.length === 0) {
            return <div>-</div>
          }

          const running = containers.filter((c) => c?.State?.Status === 'running').length
          const total = containers.length
          return <div>{running + '/' + total}</div>
        },
      },
      {
        id: 'Actions',
        header: 'Actions',
        //sx: { textAlign: 'right' },
        Cell: ({ cell }) => {
          const row = cell.row.original
          const stackName = row.name
          const stackStatus = row.status
          return <StackIconControls stackId={stackName} stackStatus={stackStatus} />
          // return (
          //   <div style={{ textAlign: 'right' }}>
          //     <IconButton size={'small'} title={'Start'} onClick={handleStackStartClick(row.name)}>
          //       <AppIcons.StackUpIcon />
          //     </IconButton>
          //     <IconButton size={'small'} title={'Pause'} onClick={handleStackPauseClick(row.name)}>
          //       <AppIcons.PauseIcon />
          //     </IconButton>
          //     <IconButton size={'small'} title={'Stop'} onClick={handleStackStopClick(row.name)}>
          //       <AppIcons.StopIcon />
          //     </IconButton>
          //     <IconButton size={'small'} title={'Delete'} onClick={handleStackDeleteClick(row.name)}>
          //       <AppIcons.StackDownIcon />
          //     </IconButton>
          //     <IconButton size={'small'} title={'Destroy'} onClick={handleStackDestroyClick(row.name)}>
          //       <AppIcons.DeleteIcon />
          //     </IconButton>
          //     <IconButton size={'small'} title={'Sync'} onClick={handleStackSyncClick(row.name)}>
          //       <AppIcons.SyncIcon />
          //     </IconButton>
          //   </div>
          // )
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
