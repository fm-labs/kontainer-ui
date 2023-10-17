import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>docker-http-client</h1>
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
    </div>
  )
}

export default Home
