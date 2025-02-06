import React from 'react'
import Container from '@mui/material/Container'
import { DOCKER_HTTP_BASEURL } from '../../constants.ts'

const Home = () => {
  return (
    <Container>
      <h1>kstack-ui</h1>
      <p>
        Assumes kstack-agent server running on{' '}
        <a target={'_blank'} href={DOCKER_HTTP_BASEURL} rel='noreferrer'>
          {DOCKER_HTTP_BASEURL}
        </a>
      </p>
    </Container>
  )
}

export default Home
