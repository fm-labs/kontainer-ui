import * as React from 'react'
import Grid, { GridSize } from '@mui/material/Grid2'

interface KeyValueTableProps {
  //showHeader?: boolean
  data: { key: string; value: any }[]
  //keyCellProps?: TableCellProps
  //valueCellProps?: TableCellProps
  size?: number | GridSize
}

export default function KeyValueGrid({ data, ...props }: KeyValueTableProps) {
  const gridSize = props.size || { xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }

  const renderValue = (value: any) => {
    if (value === null || value === undefined || value === '') {
      return '-'
    }
    if (typeof value === 'boolean') {
      return value ? 'on' : 'off'
    }
    if (typeof value === 'object') {
      return JSON.stringify(value)
    }
    return value.toString()
  }

  return (
    <>
      <Grid container spacing={2}>
        {data.map((row) => (
          <Grid key={row.key} size={gridSize}>
            <div className={'key'} style={{ fontWeight: 'bold' }}>
              {row.key}
            </div>
            <div className={'value'}>{renderValue(row.value)}</div>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
