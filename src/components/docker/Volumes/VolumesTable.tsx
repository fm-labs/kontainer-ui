import React from 'react'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import { IDockerResourceAttrs } from '../../../types.ts'

const ImagesTable = ({ data }: { data: IDockerResourceAttrs[] }) => {
  return (
    <Table>
      <tbody>
        {data &&
          data.map((row) => (
            <tr key={row.id}>
              <td>{row?.Id}</td>
              <td>{row?.Name}</td>
              <td>{row?.Driver}</td>
              <td>{row?.CreatedAt}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  )
}

export default ImagesTable
