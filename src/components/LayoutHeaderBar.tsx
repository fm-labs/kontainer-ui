import React from 'react'
import { Container, Nav } from 'react-bootstrap'
import Navigation from './Navigation.tsx'

const LayoutHeaderBar = () => {
  // const navItems = [
  //   {
  //     icon: <FaHome />,
  //     title: 'Home',
  //     link: '/'
  //   },
  //   {
  //     icon: <FaFolder />,
  //     title: 'Projects',
  //     link: '/projects'
  //   },
  //   {
  //     icon: <FaServer />,
  //     title: 'Containers',
  //     link: '/containers'
  //   },
  //   {
  //     icon: <FaImages />,
  //     title: 'Images',
  //     link: '/images'
  //   },
  //   {
  //     icon: <FaHdd />,
  //     title: 'Volumes',
  //     link: '/volumes'
  //   },
  //   {
  //     icon: <FaRoute />,
  //     title: 'Networks',
  //     link: '/networks'
  //   }
  // ];

  return (
    <div className={'LayoutHeaderBar pt-3 pb-5'}>
      <Container>
        <Navigation />
      </Container>
    </div>
  )
}

export default LayoutHeaderBar
