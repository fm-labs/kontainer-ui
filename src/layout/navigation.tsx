import React from 'react'
import { FaFolder, FaHdd, FaHome, FaImages, FaRoute, FaServer } from 'react-icons/fa'
import { INavigationItem } from './navigation.types.ts'
import ViewInArIcon from '@mui/icons-material/ViewInAr'
import FilterTiltShiftIcon from '@mui/icons-material/FilterTiltShift'
import { HiMiniCircleStack, HiOutlineCube, HiOutlineCubeTransparent, HiOutlineServer } from 'react-icons/hi2'
import { FaNetworkWired } from 'react-icons/fa6'

export const navItemsDocker: INavigationItem[] = [
  // {
  //   key: 'home',
  //   icon: <FaHome />,
  //   label: 'Home',
  //   to: '/',
  // },
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
]
