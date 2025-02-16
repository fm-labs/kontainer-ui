import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment/moment'
import Table from '@mui/material/Table'
import IconButton from '@mui/material/IconButton'
import { TableCell, TableRow } from '@mui/material'
import { HiOutlinePlay, HiPause, HiStop, HiTrash } from 'react-icons/hi2'
import { IDockerResourceAttrs } from '../../../types.ts'
import ContainerPorts from './ContainerPorts.tsx'
import ContainerState from './ContainerState.tsx'
import { useContainer } from './useContainer.ts'

const ContainersTableGrouped = ({ data }: { data: IDockerResourceAttrs[] }) => {
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

  const groupedData = React.useMemo(() => {
    if (!data) {
      return {}
    }
    const grouped = {}
    data.forEach((row: any) => {
      const labels = row?.Config?.Labels
      const composeProject = labels?.['com.docker.compose.project'] || '_'
      if (!composeProject) {
        return
      }
      if (!grouped[composeProject]) {
        grouped[composeProject] = []
      }
      grouped[composeProject].push(row)
    })

    // Sort grouped by key
    const sorted: object = Object.keys(grouped)
      .sort()
      .reduce((obj, key) => {
        obj[key] = grouped[key]
        return obj
      }, {})
    return sorted
  }, [data])

  return (
    <Table size={'small'}>
      <tbody>
        {Object.entries(groupedData).map(([key, rows]: any) => {
          const composeProject = key
          const running = rows.filter((row: any) => row?.State?.Status === 'running').length

          return (
            <React.Fragment key={composeProject}>
              {composeProject !== '_' && (
                <TableRow key={composeProject}>
                  <TableCell>
                    <Link style={{ textDecoration: 'dashed underline' }} to={`../stacks/${composeProject}`}>
                      {composeProject}
                    </Link>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>{`${running}/${rows.length} running`}</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell style={{ textAlign: 'right' }}>
                    {running === 0 && (
                      <IconButton size={'small'} title={'Start'} onClick={handleStackStartClick(composeProject)}>
                        <HiOutlinePlay />
                      </IconButton>
                    )}
                    {running > 0 && (
                      <IconButton size={'small'} title={'Stop'} onClick={handleStackStopClick(composeProject)}>
                        <HiStop />
                      </IconButton>
                    )}
                    <IconButton size={'small'} title={'Delete'} onClick={handleStackDeleteClick(composeProject)}>
                      <HiTrash />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )}
              {rows.map((row: any) => {
                const name = row?.Name.substring(1).replace(`${composeProject}-`, '')
                const labels = row?.Config?.Labels
                const hasProtectedLabel = labels?.['kstack.protected'] === 'true'

                return (
                  <tr key={row.Id}>
                    <TableCell>
                      <div
                        style={{
                          display: 'inline-block',
                          paddingLeft: composeProject !== '_' ? '1em' : 0,
                        }}
                      >
                        {/*<Link to={`/container/${row?.Id}`}>{name}</Link>*/}
                        <Link to={`${row?.Id}`}>{name}</Link>
                        {hasProtectedLabel && <span style={{ color: 'red' }}> PROTECTED</span>}
                      </div>
                    </TableCell>
                    <TableCell>{row.Id.substring(0, 12)}</TableCell>
                    <TableCell>{row?.Config?.Image}</TableCell>
                    {/*<TableCell><ContainerPorts ports={row?.NetworkSettings?.Ports} /></TableCell>*/}
                    <TableCell>
                      <ContainerPorts ports={row?.HostConfig?.PortBindings} />
                    </TableCell>
                    <TableCell>
                      <ContainerState state={row?.State} />
                    </TableCell>
                    <TableCell>{moment(row?.State?.StartedAt).fromNow()}</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>
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
                    </TableCell>
                  </tr>
                )
              })}
            </React.Fragment>
          )
        })}
      </tbody>
    </Table>
  )
}

export default ContainersTableGrouped
