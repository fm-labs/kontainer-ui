import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Container from '@mui/material/Container'
import VolumesTableMaterial from '../../components/docker/Volumes/VolumesTableMaterial.tsx'

const VolumesPage = () => {
  const data = useLoaderData() as any // IDockerVolume[]

  return (
    <Container maxWidth={false}>
      <h1>Volumes</h1>
      <VolumesTableMaterial data={data} />
      {/*<VolumesTable data={data} />*/}
    </Container>
  )
}

export default VolumesPage
