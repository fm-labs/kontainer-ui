import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { TableCellProps } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

interface KeyValueTableProps {
  showHeader?: boolean
  data: { key: string; value: any }[]
  keyCellProps?: TableCellProps
  valueCellProps?: TableCellProps
}

export default function KeyValueTable({ data, showHeader, ...props }: KeyValueTableProps) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 200 }} aria-label='Key-Value-Table' size={'small'}>
        {showHeader && (
          <TableHead>
            <TableRow>
              <TableCell>Key</TableCell>
              <TableCell align='right'>Value</TableCell>
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row' sx={{ fontWeight: 'bold' }} {...props?.keyCellProps}>
                {row.key}
              </TableCell>
              <TableCell {...props?.valueCellProps}>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
