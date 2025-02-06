import React from 'react'
import Container from '@mui/material/Container'
import { useLoaderData } from 'react-router-dom'
import { IDockerResourceAttrs } from '../../types.ts'
import ImagesTableMaterial from '../../components/docker/Images/ImagesTableMaterial.tsx'

const ImagesPage = () => {
  const data = useLoaderData() as IDockerResourceAttrs[]

  return (
    <Container maxWidth={false}>
      <h1>Images</h1>
      <ImagesTableMaterial data={data} />
    </Container>
  )
}

export default ImagesPage
