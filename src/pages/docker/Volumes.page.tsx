import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Container from '@mui/material/Container'
import VolumesTableMaterial from '../../components/docker/Volumes/VolumesTableMaterial.tsx'
import { Helmet } from 'react-helmet-async'
import Toolbar from '@mui/material/Toolbar'
import Heading from '../../elements/Heading.tsx'
import Button from '@mui/material/Button'

const VolumesPage = () => {
  const data = useLoaderData() as any // IDockerVolume[]

  return (
    <Container maxWidth={false}>
      <Helmet>
        <title>Volumes</title>
      </Helmet>
      <Toolbar disableGutters>
        <Heading label={'Volumes'}>
          <div>{/*<Button variant={'outlined'}>Create Volume</Button>*/}</div>
        </Heading>
      </Toolbar>
      <VolumesTableMaterial data={data} />
      {/*<VolumesTable data={data} />*/}
    </Container>
  )
}

export default VolumesPage
