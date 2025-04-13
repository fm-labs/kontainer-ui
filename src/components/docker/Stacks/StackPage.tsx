import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import AppIcons from '../../../elements/AppIcons.tsx'
import { useAgentDockerApi } from '~/helper/useAgentDockerApi.ts'
import BasicTabs, { BasicTabItem } from '~/elements/BasicTabs.tsx'
import StackIconControls from '~/components/docker/Stacks/components/StackIconControls.tsx'
import Heading from '~/elements/Heading.tsx'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import StackWidget from '~/components/docker/Dashboard/components/StackWidget.tsx'
import KeyValueTable from '~/elements/KeyValueTable.tsx'

const StackPage = () => {
  //const loaderData = useLoaderData() as any // IDockerComposeProject
  //const stackId = loaderData.name
  const { stackId } = useParams<{ stackId: string }>()
  if (!stackId) {
    throw new Error('Stack ID is required')
  }

  const [data, setData] = React.useState<any>()
  const api = useAgentDockerApi()

  const handleProjectStartClick = (id: string) => () => {
    console.log('Starting project', id)
    //api.startProject()(id)
  }

  const handleProjectStopClick = (id: string) => () => {
    console.log('Stopping project', id)
    //api.stopProject()(id)
  }

  const fetchProject = React.useCallback(async () => {
    const data = await api.getStack(stackId)
    setData(data)
  }, [api, stackId])

  React.useEffect(() => {
    console.log('ProjectPage mounted')
    fetchProject()
    const timer = setInterval(fetchProject, 10000)
    return () => {
      console.log('ProjectPage unmounted')
      clearInterval(timer)
    }
  }, [])

  if (!data) {
    return <div>Loading...</div>
  }

  const tabs: BasicTabItem[] = [
    {
      label: 'Active Containers',
      name: 'stack-active-containers',
      children: (
        <>
          <StackWidget stackName={stackId}></StackWidget>
        </>
      ),
    },
    {
      label: 'Stack Info',
      name: 'stack-info',
      children: (
        <>
          <textarea style={{ width: '100%', height: '300px' }} defaultValue={JSON.stringify(data, null, 2)}></textarea>
        </>
      ),
    },
  ]

  return (
    <Container>
      <Toolbar disableGutters>
        <Heading label={`Stack ${data.name}`}>
          <StackIconControls stackId={stackId} />
        </Heading>
      </Toolbar>

      <Box sx={{ my: 2 }}>
        <BasicTabs items={tabs} />
      </Box>
    </Container>
  )
}

export default StackPage
