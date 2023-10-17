import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'

const LayoutHeaderBar = () => {
  return (
    <div className={"LayoutHeaderBar"}>
      <Container>
        <ul>
          <li>
            <Link to={'/containers'}>Containers</Link>
          </li>
          <li>
            <Link to={'/images'}>Images</Link>
          </li>
          <li>
            <Link to={'/volumes'}>Volumes</Link>
          </li>
        </ul>
      </Container>
    </div>
  )
}

export default LayoutHeaderBar


