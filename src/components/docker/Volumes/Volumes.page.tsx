import React from 'react'
// import { useLoaderData } from 'react-router-dom'
// import VolumesTableMaterial from './components/VolumesTableMaterial.tsx'
import Container from '@mui/material/Container'
import { Helmet } from 'react-helmet-async'
import Toolbar from '@mui/material/Toolbar'
import Heading from '../../../elements/Heading.tsx'
import VolumesDfView from '~/components/docker/Volumes/components/VolumesDfView.tsx'

const VolumesPage = () => {
  //const data = useLoaderData() as any // IDockerVolume[]

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
      <VolumesDfView />
      {/*<VolumesTableMaterial data={data} />*/}
      {/*<VolumesTable data={data} />*/}
    </Container>
  )
}

export default VolumesPage
