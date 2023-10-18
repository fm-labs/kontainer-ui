import React from 'react'
import { Link } from 'react-router-dom'
import { DOCKER_HTTP_BASEURL } from '../constants.ts'
import { Container } from 'react-bootstrap'

const Home = () => {
  return (
    <Container>
      <h1>docker-http-client</h1>
      <p>Assumes docker-http server running on <a target={"_blank"} href={DOCKER_HTTP_BASEURL}>{DOCKER_HTTP_BASEURL}</a></p>
    </Container>
  )
}

export default Home
