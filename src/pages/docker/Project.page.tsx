import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import api from '../../lib/api.ts'
import AppIcons from '../../elements/AppIcons.tsx'

const ProjectPage = () => {
  const loaderData = useLoaderData() as any // IDockerComposeProject
  const [data, setData] = React.useState(loaderData)

  const handleProjectStartClick = (id: string) => () => {
    console.log('Starting project', id)
    //api.startProject()(id)
  }

  const handleProjectStopClick = (id: string) => () => {
    console.log('Stopping project', id)
    //api.stopProject()(id)
  }

  React.useEffect(() => {
    console.log('ProjectPage mounted')
    const timer = setInterval(() => {
      console.log('Refreshing projects')
      api
        .getStack()(data.key)
        .then((data) => {
          console.log('Project refreshed', data)
          setData(data)
        })
    }, 5000)
    return () => {
      console.log('ProjectPage unmounted')
      clearInterval(timer)
    }
  }, [])

  return (
    <Container>
      <h1>Project {data?.key || 'Untitled'}</h1>
      {/*<ProjectCreateModal />*/}
      <Button size={'small'} onClick={handleProjectStartClick(data.key)}>
        <AppIcons.ContainerStartIcon /> Start
      </Button>
      <Button size={'small'} onClick={handleProjectStopClick(data.key)}>
        <AppIcons.ContainerStopIcon /> Stop
      </Button>
      <Button size={'small'} color={'error'}>
        <AppIcons.ContainerDeleteIcon /> Remove
      </Button>
      <hr />
      <textarea style={{ width: '100%', height: '300px' }} defaultValue={data?.data}></textarea>
    </Container>
  )
}

export default ProjectPage
