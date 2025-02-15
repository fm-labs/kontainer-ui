import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Container from '@mui/material/Container'
import NetworksTableMaterial from '../../components/docker/Networks/NetworksTableMaterial.tsx'
import { Helmet } from 'react-helmet-async'
import Toolbar from '@mui/material/Toolbar'
import Heading from '../../elements/Heading.tsx'

const NetworksPage = () => {
  const data = useLoaderData() as any // IDockerNetwork[]

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
      <NetworksTableMaterial data={data} />
      {/*<NetworksTable data={data} />*/}
    </Container>
  )
}

export default NetworksPage
