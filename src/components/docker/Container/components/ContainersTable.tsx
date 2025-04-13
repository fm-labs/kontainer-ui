import React from 'react'
import Table from '@mui/material/Table'
import { Link } from 'react-router-dom'
import moment from 'moment/moment'
import Button from '@mui/material/Button'
import ContainerPorts from './ContainerPorts.tsx'
import AppIcons from '../../../../elements/AppIcons.tsx'
import { useAgentDockerApi } from '../../../../helper/useAgentDockerApi.ts'

const ContainersTable = ({ data }) => {
  const api = useAgentDockerApi()

  const handleContainerStartClick = (id: string) => () => {
    console.log('Starting container', id)
    api.startContainer(id)
  }

  const handleContainerStopClick = (id: string) => () => {
    console.log('Stopping container', id)
    api.stopContainer(id)
  }

  const handleContainerRemoveClick = (id: string) => () => {
    console.log('Removing container', id)
    api.removeContainer(id)
  }

  return (
    <Table>
      <tbody>
        {data.map((row: any) => {
          const labels = row?.Config?.Labels
          const composeProject = labels?.['com.docker.compose.project']

          return (
            <tr key={row.Id}>
              <td>
                {composeProject || '-'}
                <br />
                <Link to={`/container/${row?.Id}`}>{row?.Name.substring(1)}</Link>
              </td>
              <td>{row.Id.substring(0, 12)}</td>
              <td>{row?.Config?.Image}</td>
              {/*<td><ContainerPorts ports={row?.NetworkSettings?.Ports} /></td>*/}
              <td>
                <ContainerPorts ports={row?.HostConfig?.PortBindings} />
              </td>
              <td>{row?.State?.Status}</td>
              <td>{moment(row?.State?.StartedAt).fromNow()}</td>
              <td>
                {row?.State?.Status !== 'running' && (
                  <Button size={'small'} onClick={handleContainerStartClick(row.Id)}>
                    <AppIcons.StartIcon />{' '}
                  </Button>
                )}
                {row?.State?.Status === 'running' && (
                  <Button size={'small'} onClick={handleContainerStopClick(row.Id)}>
                    <AppIcons.StopIcon />{' '}
                  </Button>
                )}
                <Button size={'small'} onClick={handleContainerRemoveClick(row.Id)} color={'error'}>
                  <AppIcons.DeleteIcon />{' '}
                </Button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default ContainersTable
