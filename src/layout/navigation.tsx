import React from 'react'
import { INavigationItem } from './navigation.types.ts'
import { HiOutlineCube, HiOutlineCubeTransparent, HiOutlineServer } from 'react-icons/hi2'
import { FaDocker, FaNetworkWired } from 'react-icons/fa6'
import { FaTerminal } from 'react-icons/fa6'
import { FaHistory } from 'react-icons/fa'

export const navItemsDocker: INavigationItem[] = [
  {
    key: 'dashboard',
    icon: <FaDocker size={24} />,
    label: 'Dashboard',
    to: '/',
  },
  // {
  //   key: 'compose',
  //   icon: <HiMiniSquare3Stack3D />,
  //   label: 'Compose Stacks',
  //   to: '/compose',
  // },
  {
    key: 'containers',
    icon: <HiOutlineCube size={24} />,
    label: 'Containers',
    to: '/containers',
  },
  {
    key: 'images',
    icon: <HiOutlineCubeTransparent size={24} />,
    label: 'Images',
    to: '/images',
  },
  {
    key: 'volumes',
    icon: <HiOutlineServer size={24} />,
    label: 'Volumes',
    to: '/volumes',
  },
  {
    key: 'networks',
    icon: <FaNetworkWired size={24} />,
    label: 'Networks',
    to: '/networks',
  },
  // {
  //   key: 'run',
  //   icon: <FaTerminal size={24} />,
  //   label: 'Run',
  //   to: '/run',
  // },
  {
    key: 'events',
    icon: <FaHistory size={24} />,
    label: 'Events',
    to: '/events',
  },
]
