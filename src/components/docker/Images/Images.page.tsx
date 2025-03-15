import React from 'react'
import Container from '@mui/material/Container'
import { useLoaderData } from 'react-router-dom'
import { IDockerResourceAttrs } from '../../../types.ts'
import ImagesTableMaterial from './ImagesTableMaterial.tsx'
import { Helmet } from 'react-helmet-async'
import Toolbar from '@mui/material/Toolbar'
import Heading from '../../../elements/Heading.tsx'

const ImagesPage = () => {
  const data = useLoaderData() as IDockerResourceAttrs[]

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
      <ImagesTableMaterial data={data} />
    </Container>
  )
}

export default ImagesPage
