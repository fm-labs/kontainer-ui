import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { Button, Container, Table } from 'react-bootstrap'
import { FaPause, FaPlay, FaStop, FaTrash } from 'react-icons/fa'
import api from '../api.ts'

const ProjectsPage = () => {
  const loaderData = useLoaderData() as any // IDockerProject[]
  const [data, setData] = React.useState(loaderData)

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

  React.useEffect(() => {
    console.log('ProjectsPage mounted')
    const timer = setInterval(() => {
      console.log('Refreshing projects')
      api
        .getProjects()()
        .then((data) => {
          console.log('Projects refreshed', data)
          setData(data)
        })
    }, 5000)
    return () => {
      console.log('ProjectsPage unmounted')
      clearInterval(timer)
    }
  }, [])

  return (
    <Container>
      <h1>Projects</h1>
      {/*<ProjectCreateModal />*/}
      <hr />
      {data && (
        <Table>
          <tbody>
            {data.map((row: any) => {
              return (
                <tr key={row?.key}>
                  <td>
                    <Link to={`/projects/${row?.key}`}>{row?.key}</Link>
                  </td>
                  <td>{row?.name}</td>
                  <td>{row?.State?.Status}</td>
                  <td>
                    <Button size={'sm'} onClick={handleProjectStartClick(row.key)}>
                      <FaPlay /> Start
                    </Button>
                    <Button size={'sm'} onClick={handleProjectStopClick(row.key)}>
                      <FaStop /> Stop
                    </Button>
                    <Button size={'sm'} onClick={handleProjectRemoveClick(row.key)} variant={'danger'}>
                      <FaTrash />{' '}
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default ProjectsPage
