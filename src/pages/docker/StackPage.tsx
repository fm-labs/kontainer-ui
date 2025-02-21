import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import AppIcons from '../../elements/AppIcons.tsx'
import { useEnvApi } from '../../helper/useEnvApi.ts'

const StackPage = () => {
  const loaderData = useLoaderData() as any // IDockerComposeProject
  const [data, setData] = React.useState(loaderData)
  const api = useEnvApi()

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
      api.getStack(data.name).then((data) => {
        console.log('Project refreshed', data)
        setData(data)
      })
    }, 10000)
    return () => {
      console.log('ProjectPage unmounted')
      clearInterval(timer)
    }
  }, [])

  return (
    <Container>
      <h1>Project {data.name}</h1>
      {/*<ProjectCreateModal />*/}
      <Button size={'small'} onClick={handleProjectStartClick(data.name)}>
        <AppIcons.StartIcon /> Start
      </Button>
      <Button size={'small'} onClick={handleProjectStopClick(data.name)}>
        <AppIcons.StopIcon /> Stop
      </Button>
      <Button size={'small'} color={'error'}>
        <AppIcons.DeleteIcon /> Remove
      </Button>
      <hr />
      <h3>Active Containers</h3>
      <div>...</div>
      <hr />
      <textarea style={{ width: '100%', height: '300px' }} defaultValue={data?.data}></textarea>
    </Container>
  )
}

export default StackPage
