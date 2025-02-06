import React from 'react'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import { IDockerResourceAttrs } from '../../../types.ts'

const ImagesTable = ({ data }: { data: IDockerResourceAttrs[] }) => {
  return (
    <Table>
      <tbody>
        {data &&
          data.map((row: any) => (
            <tr key={row.Id}>
              <td title={row.Id}>{row.Id.substring(0, 32)}</td>
              <td>{row?.RepoTags?.map((tag) => <div key={tag}>{tag}</div>)}</td>
              <td>
                <Button size={'small'}>New container</Button>
                <Button size={'small'} color={'error'}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  )
}

export default ImagesTable
