import React from 'react'
import { Link } from 'react-router-dom'
import { DOCKER_HTTP_BASEURL } from '../constants.ts'
import { Container } from 'react-bootstrap'

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
