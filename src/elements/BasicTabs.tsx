import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { PropsWithChildren } from 'react'
import { redirect, useLocation, useMatch, useNavigate } from 'react-router'

interface BasicTabPanelProps {
  children?: React.ReactNode
  index: number
  selected: number
}

export interface BasicTabItem extends PropsWithChildren<any> {
  name: string
  label: string
}

export interface BasicTabsProps {
  defaultIdx?: number
  items: BasicTabItem[]
}

function buildTabProps(index: number) {
  return {
    id: `basic-tab-${index}`,
    'aria-controls': `basic-tabpanel-${index}`,
  }
}

function BasicTabPanel(props: BasicTabPanelProps) {
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

export default function BasicTabs({ items, defaultIdx }: BasicTabsProps) {
  const [tabIdx, setTabIdx] = React.useState<number>(defaultIdx || 0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const newItem = items[newValue] || null
    if (newItem) {
      setTabIdx(newValue)
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIdx} onChange={handleChange} aria-label={'Tabs'}>
          {items.map((item: BasicTabItem, idx) => {
            return <Tab key={idx} label={item.label} {...buildTabProps(idx)} />
          })}
        </Tabs>
      </Box>

      {items.map((item: BasicTabItem, idx) => {
        return (
          <BasicTabPanel key={idx} selected={tabIdx} index={idx}>
            {item.children}
          </BasicTabPanel>
        )
      })}
    </Box>
  )
}
