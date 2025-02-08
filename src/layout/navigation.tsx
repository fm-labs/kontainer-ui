import React from 'react'
import { INavigationItem } from './navigation.types.ts'
import { HiOutlineCube, HiOutlineCubeTransparent, HiOutlineServer } from 'react-icons/hi2'
import { FaDocker, FaLayerGroup, FaNetworkWired } from 'react-icons/fa6'
import { FaHistory } from 'react-icons/fa'

const navIconProps = {
  size: 24,
}

export const navItemsDocker: INavigationItem[] = [
  {
    key: 'dashboard',
    icon: <FaDocker {...navIconProps} />,
    label: 'Dashboard',
    to: '/',
  },
  {
    key: 'containers',
    icon: <HiOutlineCube {...navIconProps} />,
    label: 'Containers',
    to: '/containers',
  },
  {
    key: 'stacks',
    icon: <FaLayerGroup {...navIconProps} />,
    label: 'Stacks',
    to: '/stacks',
  },
  {
    key: 'images',
    icon: <HiOutlineCubeTransparent {...navIconProps} />,
    label: 'Images',
    to: '/images',
  },
  {
    key: 'volumes',
    icon: <HiOutlineServer {...navIconProps} />,
    label: 'Volumes',
    to: '/volumes',
  },
  {
    key: 'networks',
    icon: <FaNetworkWired {...navIconProps} />,
    label: 'Networks',
    to: '/networks',
  },
  // {
  //   key: 'run',
  //   icon: <FaTerminal {...navIconProps} />,
  //   label: 'Run',
  //   to: '/run',
  // },
  {
    key: 'events',
    icon: <FaHistory {...navIconProps} />,
    label: 'Events',
    to: '/events',
  },
]
