import React from 'react'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import { useNavigate } from 'react-router'
import { INavigationItem } from './navigation.types.ts'

interface NavListItemsProps {
  items: INavigationItem[]
}

const NavListItems = ({ items }: NavListItemsProps) => {
  const navigate = useNavigate()

  return (
    <>
      {items.map((item, index) => {
        const Icon = item.icon as React.ReactElement
        // if item.target is set, it will open the link in a new tab
        // otherwise it will use the navigate function from react-router
        return (
          <ListItemButton
            key={index}
            onClick={() => !item?.target && navigate(item.to)}
            href={item?.target ? item.to : ''}
            target={item?.target}
            title={item.label}
            aria-label={item.label}
          >
            <ListItemIcon>{Icon}</ListItemIcon>
            <ListItemText
              slotProps={{ primary: { fontSize: '0.9rem' } }}
              primary={item.label} /*secondary={resolvedPath}*/
            />
          </ListItemButton>
        )
      })}
    </>
  )
}

export default NavListItems
