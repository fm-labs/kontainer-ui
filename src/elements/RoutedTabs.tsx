import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { PropsWithChildren } from 'react'
import { redirect, useLocation, useMatch, useNavigate } from 'react-router'

interface RoutedTabPanelProps {
  children?: React.ReactNode
  index: number
  selected: number
}

export interface RoutedTabItem extends PropsWithChildren<any> {
  name: string
  label: string
}

export interface RoutedTabsProps {
  defaultIdx?: number
  items: RoutedTabItem[]
}

function buildTabProps(index: number) {
  return {
    id: `basic-tab-${index}`,
    'aria-controls': `basic-tabpanel-${index}`,
  }
}

function RoutedTabPanel(props: RoutedTabPanelProps) {
  const { children, selected, index, ...other } = props

  return (
    <Box
      sx={{ p: 0, m: 0 }}
      role='tabpanel'
      hidden={selected !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {selected === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </Box>
  )
}

export default function RoutedTabs({ items, defaultIdx }: RoutedTabsProps) {
  const [value, setValue] = React.useState<number>(defaultIdx || 0)

  const navigate = useNavigate()
  const location = useLocation()
  const match = useMatch(location.pathname)
  const queryParams = new URLSearchParams(location.search)
  const view = queryParams.get('view')

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    //const newPath = location.pathname.replace(`/${value}$/`, newValue.toString())
    const newItem = items[newValue] || null
    if (newItem) {
      const newPath = location.pathname + '?view=' + newItem.name
      console.log('RoutedTabPanel:changed', location, newValue, newPath)
      navigate(newPath, { replace: true })
    }
  }

  React.useEffect(() => {
    console.log('RoutedTabs', location, match)
    console.log('RoutedTabPanel:useEffect', view)

    if (view) {
      const value = items.findIndex((item) => item.name === view)
      if (value > -1) {
        setValue(value)
      }
    }
  }, [view])

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label={'Tabs'}>
          {items.map((item: RoutedTabItem, idx) => {
            return <Tab key={idx} label={item.label} {...buildTabProps(idx)} />
          })}
        </Tabs>
      </Box>

      {items.map((item: RoutedTabItem, idx) => {
        return (
          <RoutedTabPanel key={idx} selected={value} index={idx}>
            {item.children}
          </RoutedTabPanel>
        )
      })}
    </Box>
  )
}
