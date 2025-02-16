import React from 'react'
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { IDockerResourceAttrs } from '../../../types.ts'
import moment from 'moment/moment'
import ContainerPorts from './ContainerPorts.tsx'
import IconButton from '@mui/material/IconButton'
import { HiOutlinePlay, HiPause, HiStop, HiTrash } from 'react-icons/hi2'
import ContainerState from './ContainerState.tsx'
import { Link } from 'react-router-dom'
import { useContainer } from './useContainer.ts'

const ContainersTableMaterial = ({ data }: { data: IDockerResourceAttrs[] }) => {
  const {
    handleContainerStartClick,
    handleContainerPauseClick,
    handleContainerStopClick,
    handleContainerRemoveClick,
    handleStackStartClick,
    handleStackStopClick,
    handleStackDeleteClick,
    handleContainerLogsClick,
    handleContainerExecClick,
  } = useContainer()

  // const api = useEnvApi()
  // const { defaultErrorHandler } = useErrorHandler()

  // const handleContainerStartClick = (id: string) => () => {
  //   console.log('Starting container', id)
  //   api.startContainer()(id).catch(defaultErrorHandler)
  // }
  //
  // const handleContainerPauseClick = (id: string) => () => {
  //   console.log('Pausing container', id)
  //   api.pauseContainer()(id).catch(defaultErrorHandler)
  // }
  //
  // const handleContainerStopClick = (id: string) => () => {
  //   console.log('Stopping container', id)
  //   api.stopContainer()(id).catch(defaultErrorHandler)
  // }
  //
  // const handleContainerRemoveClick = (id: string) => () => {
  //   console.log('Removing container', id)
  //   api.removeContainer()(id).catch(defaultErrorHandler)
  // }

  // const handleStackStartClick = (id: string) => () => {
  //   console.log('Starting project', id)
  //   api.startStack()(id)
  // }
  //
  // const handleStackStopClick = (id: string) => () => {
  //   console.log('Stopping project', id)
  //   api.stopStack()(id)
  // }
  //
  // const handleStackRemoveClick = (id: string) => () => {
  //   console.log('Removing project', id)
  //   api.removeStack()(id)
  // }

  // const handleContainerLogsClick = (id: string) => () => {
  //   // open a new window with the logs
  //   window.open(`/logstream.html?container=${id}`, '_blank')
  // }
  //
  // const handleContainerExecClick = (id: string) => () => {
  //   // open a new window with the logs
  //   window.open(`/exec.html?container=${id}`, '_blank')
  // }

  const columns = React.useMemo<MRT_ColumnDef<IDockerResourceAttrs>[]>(
    () => [
      {
        accessorKey: 'Name',
        header: 'Name',
        enableHiding: false, //disable a feature for this column
        Cell: ({ cell }) => {
          const name = cell.getValue<string>()
          const id = cell.row.original?.Id
          return (
            <Link to={`/container/${id}`} title={name}>
              {name.substring(1)}
            </Link>
          )
        },
      },
      {
        accessorKey: 'Id',
        header: 'Id',
        Cell: ({ cell }) => {
          const id = cell.getValue<string>()
          return <div title={id}>{id.substring(0, 12)}</div>
        },
      },
      {
        //accessorKey: 'Image',
        accessorKey: 'Config.Image',
        header: 'Image',
      },
      {
        accessorKey: 'HostConfig.PortBindings',
        header: 'Ports',
        Cell: ({ cell }) => {
          return <ContainerPorts ports={cell.getValue<object>()} />
        },
      },
      {
        accessorKey: 'State',
        header: 'Status',
        Cell: ({ cell }) => {
          return <ContainerState state={cell.getValue<object>()} />
        },
      },
      // {
      //   accessorKey: 'Labels',
      //   header: 'Labels',
      //   Cell: ({ cell }) => {
      //     const labels = cell.getValue<object>()
      //     if (!labels) {
      //       return '-'
      //     }
      //     return Object.entries(labels).map(([key, value]) => <div key={key}>{value}</div>)
      //   },
      // },
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
      {
        id: 'Actions',
        header: 'Actions',
        //sx: { textAlign: 'right' },
        Cell: ({ cell }) => {
          const row = cell.row.original
          return (
            <div style={{ textAlign: 'right' }}>
              {row?.State?.Status !== 'running' && (
                <IconButton size={'small'} title={'Start'} onClick={handleContainerStartClick(row.Id)}>
                  <HiOutlinePlay />
                </IconButton>
              )}
              {row?.State?.Status === 'running' && (
                <IconButton size={'small'} title={'Pause'} onClick={handleContainerPauseClick(row.Id)}>
                  <HiPause />
                </IconButton>
              )}
              {row?.State?.Status === 'running' && (
                <IconButton size={'small'} title={'Stop'} onClick={handleContainerStopClick(row.Id)}>
                  <HiStop />
                </IconButton>
              )}
              <IconButton size={'small'} title={'Delete'} onClick={handleContainerRemoveClick(row.Id)}>
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
    },
  })

  //note: you can also pass table options as props directly to <MaterialReactTable /> instead of using useMaterialReactTable
  //but the useMaterialReactTable hook will be the most recommended way to define table options
  return <MaterialReactTable table={table} />
}

export default ContainersTableMaterial
