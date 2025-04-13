import React from 'react'
import Container from '@mui/material/Container'
import { Helmet } from 'react-helmet-async'
import Toolbar from '@mui/material/Toolbar'
import Heading from '../../../elements/Heading.tsx'
import ImagesDfView from '~/components/docker/Images/components/ImagesDfView.tsx'

const ImagesPage = () => {
  return (
    <Container maxWidth={false}>
      <Helmet>
        <title>Images</title>
      </Helmet>
      <Toolbar disableGutters>
        <Heading label={'Images'}>
          <div>{/*<Button variant={'outlined'}>Pull Image</Button>*/}</div>
        </Heading>
      </Toolbar>
      <ImagesDfView />
      {/*<ImagesTableMaterial data={data} />*/}
    </Container>
  )
}

export default ImagesPage
