import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { Button, Container, Table } from 'react-bootstrap'
import { FaPause, FaPlay, FaStop, FaTrash } from 'react-icons/fa'
import ContainerCreateModal from './ContainerCreate.modal.tsx'
import api from '../api.ts'
import moment from 'moment'
import CircleProgress from '../elements/progress/CircleProgress.tsx'
import RadialProgress from '../elements/progress/RadialProgress.tsx'
import CakeProgress from '../elements/progress/CakeProgress.tsx'
import ArcProgress from '../elements/progress/ArcProgress.tsx'
import GreenCircleSVG from '../elements/progress/GreenCircleSVG.tsx'

/**
 *     "Ports": {
 *       "5000/tcp": [
 *         {
 *           "HostIp": "0.0.0.0",
 *           "HostPort": "5000"
 *         }
 *       ]
 *     },
 * @param ports
 * @constructor
 */
const ContainerPorts = ({ ports }: { ports: any }) => {
  //console.log('ContainerPorts', ports)

  if (!ports) {
    return <div>-</div>
  }

  return <div>
    {Object.keys(ports).map((port) => {
      const portData = ports[port]
      if (!portData) {
        return <div key={port}>0.0.0.0:{port} {'->'} {port}</div>
      }
      const portData0 = portData[0]
      return <div key={port}>{portData0.HostIp}:{portData0.HostPort} {'->'} {port}</div>
    })}
  </div>
}

const ContainersPage = () => {

  const loaderData = useLoaderData() as any // IDockerContainer[]
  const [data, setData] = React.useState(loaderData)
  //const [groupedData, setGroupedData] = React.useState({})

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
    const sorted: object = Object.keys(grouped).sort().reduce(
      (obj, key) => {
        obj[key] = grouped[key]
        return obj
      },
      {}
    )
    return sorted
  }, [data])

  const handleContainerStartClick = (id: string) => () => {
    console.log('Starting container', id)
    api.startContainer()(id)
  }

  const handleContainerStopClick = (id: string) => () => {
    console.log('Stopping container', id)
    api.stopContainer()(id)
  }

  const handleContainerRemoveClick = (id: string) => () => {
    console.log('Removing container', id)
    api.removeContainer()(id)
  }

  const handleProjectStartClick = (id: string) => () => {
    console.log('Starting project', id)
    api.startProject()(id)
  }

  const handleProjectStopClick = (id: string) => () => {
    console.log('Stopping project', id)
    api.stopProject()(id)
  }

  const handleProjectRemoveClick = (id: string) => () => {
    console.log('Removing project', id)
    api.removeProject()(id)
  }

  React.useEffect(()=> {
    console.log('ContainersPage mounted')
    let timer = setInterval(() => {
      console.log('Refreshing containers')
      api.getContainers()().then((data) => {
        console.log('Containers refreshed', data)
        setData(data);
      })
    }, 5000)
    return () => {
      console.log('ContainersPage unmounted')
      clearInterval(timer)
    }
  }, [])

  return (
    <Container>
      <h1>Containers</h1>
      <ContainerCreateModal />
      <hr />
      {groupedData && <Table><tbody>
      {Object.entries(groupedData).map(([key, rows]: any) => {
        const composeProject = key
        const running = rows.filter((row: any) => row?.State?.Status === "running").length

        return <>
          {composeProject !== '_' && <tr>
            <td>
              <Link style={{textDecoration: "dashed underline"}} to={`/project/${composeProject}`}>{composeProject}</Link>
            </td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>{`${running}/${rows.length} running`}</td>
            <td>-</td>
            <td>
              {running === 0 &&<Button size={'sm'} onClick={handleProjectStartClick(composeProject)}><FaPlay />{' '}</Button>}
              {running > 0 && <Button size={'sm'} onClick={handleProjectStopClick(composeProject)}><FaStop />{' '}</Button>}
              <Button size={'sm'} onClick={handleProjectRemoveClick(composeProject)} variant={'danger'}><FaTrash />{' '}</Button>
            </td>
          </tr>}
          {rows.map((row: any) => {
            const name = row?.Name.substring(1).replace(`${composeProject}-`, '')

            return (<tr key={row.Id}>
              <td style={{paddingLeft: (composeProject !== '_') ? '1.5em' : 0}}>
                <Link to={`/container/${row?.Id}`}>{name}</Link>
              </td>
              <td>{row.Id.substring(0, 12)}</td>
              <td>{row?.Config?.Image}</td>
              {/*<td><ContainerPorts ports={row?.NetworkSettings?.Ports} /></td>*/}
              <td><ContainerPorts ports={row?.HostConfig?.PortBindings} /></td>
              <td>{row?.State?.Status}</td>
              <td>{moment(row?.State?.StartedAt).fromNow()}</td>
              <td>
                {row?.State?.Status !== "running" &&<Button size={'sm'} onClick={handleContainerStartClick(row.Id)}><FaPlay />{' '}</Button>}
                {row?.State?.Status === "running" && <Button size={'sm'} onClick={handleContainerStopClick(row.Id)}><FaStop />{' '}</Button>}
                <Button size={'sm'} onClick={handleContainerRemoveClick(row.Id)} variant={'danger'}><FaTrash />{' '}</Button>
              </td>
            </tr>)
          })}
        </>
      })}
      </tbody></Table>}
      <hr />
      {data && <Table><tbody>
        {data.map((row: any) => {
          const labels = row?.Config?.Labels
          const composeProject = labels?.['com.docker.compose.project']

          return (<tr key={row.Id}>
            <td>{composeProject || '-'}<br /><Link to={`/container/${row?.Id}`}>{row?.Name.substring(1)}</Link></td>
            <td>{row.Id.substring(0, 12)}</td>
            <td>{row?.Config?.Image}</td>
            {/*<td><ContainerPorts ports={row?.NetworkSettings?.Ports} /></td>*/}
            <td><ContainerPorts ports={row?.HostConfig?.PortBindings} /></td>
            <td>{row?.State?.Status}</td>
            <td>{moment(row?.State?.StartedAt).fromNow()}</td>
            <td>
              {row?.State?.Status !== "running" &&<Button size={'sm'} onClick={handleContainerStartClick(row.Id)}><FaPlay />{' '}</Button>}
              {row?.State?.Status === "running" && <Button size={'sm'} onClick={handleContainerStopClick(row.Id)}><FaStop />{' '}</Button>}
              <Button size={'sm'} onClick={handleContainerRemoveClick(row.Id)} variant={'danger'}><FaTrash />{' '}</Button>
            </td>
          </tr>)
        })}
      </tbody></Table>}
    </Container>
  )
}

export default ContainersPage
