import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Container from '@mui/material/Container'
import { Helmet } from 'react-helmet-async'
import Toolbar from '@mui/material/Toolbar'
import Heading from '../../../elements/Heading.tsx'
import NetworksView from '~/components/docker/Networks/components/NetworksView.tsx'
import { IDockerNetwork } from '~/types.ts'
import { useAgentDockerApi } from '~/helper/useAgentDockerApi.ts'

const NetworksPage = () => {
  //const data = useLoaderData() as any // IDockerNetwork[]
  const api = useAgentDockerApi()
  const [data, setData] = React.useState<IDockerNetwork[]>([])

  const fetchNetworks = React.useCallback(async () => {
    const data = await api.getNetworks()
    setData(data as IDockerNetwork[])
  }, [api])

  React.useEffect(() => {
    fetchNetworks()
  }, [fetchNetworks])

  return (
    <Container maxWidth={false}>
      <Helmet>
        <title>Networks</title>
      </Helmet>
      <Toolbar disableGutters>
        <Heading label={'Networks'}>
          <div>{/*<Button variant={'outlined'}>Create Network</Button>*/}</div>
        </Heading>
      </Toolbar>
      <NetworksView data={data} />
    </Container>
  )
}

export default NetworksPage
