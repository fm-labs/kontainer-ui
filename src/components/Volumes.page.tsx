import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { Container, Table } from 'react-bootstrap'

const VolumesPage = () => {

  const data = useLoaderData() as any // IDockerVolume[]

  return (
    <Container>
      <h1>Volumes</h1>
      {data && <Table><tbody>
      {data.map((row) => <tr key={row.id}>
        <td>{row?.Id}</td>
        <td>{row?.Name}</td>
        <td>{row?.Driver}</td>
        <td>{row?.CreatedAt}</td>
      </tr>)}
      </tbody></Table>}
    </Container>
  )
}

export default VolumesPage
