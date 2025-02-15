import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import JsonView from '../../elements/JsonView.tsx'
import Container from '@mui/material/Container'

const EnvironmentsPage = () => {
  const data = useLoaderData() as any

  return (
    <Container maxWidth={false}>
      <h1>Environments</h1>
      {data.map((env: any) => (
        <div key={env.hostname}>
          <h2>{env.hostname}</h2>
          <div>
            <Link to={`/${env.hostname}`}>Dashboard</Link> | <Link to={`/${env.hostname}/docker`}>Docker</Link> |{' '}
            <Link to={`/${env.hostname}/docker/containers`}>Containers</Link> |{' '}
            <Link to={`/${env.hostname}/docker/images`}>Images</Link> |{' '}
            <Link to={`/${env.hostname}/docker/volumes`}>Volumes</Link>
          </div>
        </div>
      ))}
      <hr />
      <JsonView src={data} />
    </Container>
  )
}

export default EnvironmentsPage
