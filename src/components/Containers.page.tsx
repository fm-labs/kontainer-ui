import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { Button, Container, Table } from 'react-bootstrap'

const ContainersPage = () => {

  const data = useLoaderData() as IDockerContainer[]

  return (
    <Container>
      <h1>Containers</h1>
      {data && <Table><tbody>
        {data.map((row) => <tr key={row.id}>
          <td>{row.id}</td>
          <td>{row?.name}</td>
          <td>{row?.status}</td>
          <td>
            <Button size={"sm"}>Start</Button>
            <Button size={"sm"}>Stop</Button>
            <Button size={"sm"} variant={"danger"}>Remove</Button>
          </td>
        </tr>)}
      </tbody></Table>}
    </Container>
  )
}

export default ContainersPage
