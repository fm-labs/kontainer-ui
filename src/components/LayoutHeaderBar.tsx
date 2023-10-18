import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Nav } from 'react-bootstrap'
import { FaHdd, FaHome, FaImages, FaRoute, FaServer } from 'react-icons/fa'
import Navigation from './Navigation.tsx'

const LayoutHeaderBar = () => {

  const navItems = [
    {
      icon: <FaHome />,
      title: 'Home',
      link: '/'
    },
    {
      icon: <FaServer />,
      title: 'Containers',
      link: '/containers'
    },
    {
      icon: <FaImages />,
      title: 'Images',
      link: '/images'
    },
    {
      icon: <FaHdd />,
      title: 'Volumes',
      link: '/volumes'
    },
    {
      icon: <FaRoute />,
      title: 'Networks',
      link: '/networks'
    }
  ];

  return (
    <div className={"LayoutHeaderBar pt-3 pb-5"}>
      <Container>
        <Navigation/>
      </Container>
    </div>
  )
}

export default LayoutHeaderBar


