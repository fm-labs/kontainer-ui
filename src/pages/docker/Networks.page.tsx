import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Container from '@mui/material/Container'
import NetworksTableMaterial from '../../components/docker/Networks/NetworksTableMaterial.tsx'

const NetworksPage = () => {
  const data = useLoaderData() as any // IDockerNetwork[]

  return (
    <Container maxWidth={false}>
      <h1>Networks</h1>
      <NetworksTableMaterial data={data} />
      {/*<NetworksTable data={data} />*/}
    </Container>
  )
}

export default NetworksPage
