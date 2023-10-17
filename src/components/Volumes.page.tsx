import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { Alert, Button, Container, Table } from 'react-bootstrap'

const VolumesPage = () => {

  const data = useLoaderData() as IDockerVolume[]

  return (
    <Container>
      <h1>Volumes</h1>
      <Alert variant={"warning"}>
        Not implemented yet
      </Alert>
      {data && <Table><tbody>
      {data.map((row) => <tr key={row.id}>
        <td>{row.id}</td>
        <td>{row?.name}</td>
        <td>{row?.status}</td>
      </tr>)}
      </tbody></Table>}
    </Container>
  )
}

export default VolumesPage
