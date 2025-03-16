import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import AppIcons from '../../../elements/AppIcons.tsx'
import { useEnvApi } from '~/helper/useEnvApi.ts'
import BasicTabs, { BasicTabItem } from '~/elements/BasicTabs.tsx'
import StackIconControls from '~/components/docker/Stacks/components/StackIconControls.tsx'
import Heading from '~/elements/Heading.tsx'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import StackWidget from '~/components/docker/Dashboard/components/StackWidget.tsx'
import KeyValueTable from '~/elements/KeyValueTable.tsx'

const StackPage = () => {
  const loaderData = useLoaderData() as any // IDockerComposeProject
  const stackId = loaderData.name

  const [data, setData] = React.useState(loaderData)
  const { api } = useEnvApi()

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
