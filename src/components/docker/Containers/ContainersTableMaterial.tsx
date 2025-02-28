import React from 'react'
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { IDockerResourceAttrs } from '../../../types.ts'
import moment from 'moment/moment'
import ContainerPorts from './ContainerPorts.tsx'
import ContainerState from './ContainerState.tsx'
import { Link } from 'react-router-dom'
import ContainerIconControls from './ContainerIconControls.tsx'
import ContainerId from './ContainerId.tsx'
import { useEnvRoute } from '../../../helper/useEnvRoute.ts'

const ContainersTableMaterial = ({ data }: { data: IDockerResourceAttrs[] }) => {
  const { buildEnvUrl } = useEnvRoute()

  // const {
  //   handleContainerStartClick,
  //   handleContainerPauseClick,
  //   handleContainerStopClick,
  //   handleContainerRemoveClick,
  //   handleStackStartClick,
  //   handleStackStopClick,
  //   handleStackDeleteClick,
  //   handleContainerLogsClick,
  //   handleContainerExecClick,
  // } = useContainer()

  // const { api } = useEnvApi()
  // const { defaultErrorHandler } = useErrorHandler()

  // const handleContainerStartClick = (id: string) => () => {
  //   console.log('Starting container', id)
  //   api.startContainer(id).catch(defaultErrorHandler)
  // }
  //
  // const handleContainerPauseClick = (id: string) => () => {
  //   console.log('Pausing container', id)
  //   api.pauseContainer(id).catch(defaultErrorHandler)
  // }
  //
  // const handleContainerStopClick = (id: string) => () => {
  //   console.log('Stopping container', id)
  //   api.stopContainer(id).catch(defaultErrorHandler)
  // }
  //
  // const handleContainerRemoveClick = (id: string) => () => {
  //   console.log('Removing container', id)
  //   api.removeContainer(id).catch(defaultErrorHandler)
  // }

  // const handleStackStartClick = (id: string) => () => {
  //   console.log('Starting project', id)
  //   api.startStack(id)
  // }
  //
  // const handleStackStopClick = (id: string) => () => {
  //   console.log('Stopping project', id)
  //   api.stopStack(id)
  // }
  //
  // const handleStackRemoveClick = (id: string) => () => {
  //   console.log('Removing project', id)
  //   api.removeStack(id)
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
          const url = buildEnvUrl(`/docker/containers/${id}`)
          return (
            <Link to={url} title={name}>
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
          return <ContainerId value={id}></ContainerId>
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
        accessorKey: 'State.StartedAt',
        header: 'Last Started',
        Cell: ({ cell }) => {
          const date = cell.getValue<string>()
          if (!date) {
            return '-'
          }
          return moment(date).fromNow()
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
      // {
      //   id: 'Actions',
      //   header: 'Actions',
      //   //sx: { textAlign: 'right' },
      //   Cell: ({ cell }) => {
      //     const row = cell.row.original
      //     return (
      //       <div style={{ textAlign: 'right' }}>
      //         {row?.State?.Status !== 'running' && (
      //           <IconButton size={'small'} title={'Start'} onClick={handleContainerStartClick(row.Id)}>
      //             <HiOutlinePlay />
      //           </IconButton>
      //         )}
      //         {row?.State?.Status === 'running' && (
      //           <IconButton size={'small'} title={'Pause'} onClick={handleContainerPauseClick(row.Id)}>
      //             <HiPause />
      //           </IconButton>
      //         )}
      //         {row?.State?.Status === 'running' && (
      //           <IconButton size={'small'} title={'Stop'} onClick={handleContainerStopClick(row.Id)}>
      //             <HiStop />
      //           </IconButton>
      //         )}
      //         <IconButton size={'small'} title={'Delete'} onClick={handleContainerRemoveClick(row.Id)}>
      //           <HiTrash />
      //         </IconButton>
      //       </div>
      //     )
      //   },
      // },
      {
        id: 'Controls',
        header: 'Controls',
        //sx: { textAlign: 'right' },
        Cell: ({ cell }) => {
          const row = cell.row.original
          return (
            <div style={{ textAlign: 'right' }}>
              <ContainerIconControls containerId={row.Id} containerStatus={row?.State?.Status} />
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
      columnVisibility: {
        Created: false,
        //Actions: false,
      },
    },
  })

  //note: you can also pass table options as props directly to <MaterialReactTable /> instead of using useMaterialReactTable
  //but the useMaterialReactTable hook will be the most recommended way to define table options
  return <MaterialReactTable table={table} />
}

export default ContainersTableMaterial
