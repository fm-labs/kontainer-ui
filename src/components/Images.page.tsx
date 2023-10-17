import React from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { useLoaderData } from 'react-router-dom'

const ImagesPage = () => {

  const data = useLoaderData() as IDockerImage[]

  return (
    <Container>
      <h1>Images</h1>
      {data && <Table><tbody>
      {data.map((row) => <tr key={row.id}>
        <td title={row.id}>{row.id.substring(0, 32)}</td>
        <td>{row?.tags}</td>
        <td>
          <Button size={"sm"}>New container</Button>
          <Button size={"sm"} variant={"danger"}>Remove</Button>
        </td>
      </tr>)}
      </tbody></Table>}
    </Container>
  )
}

export default ImagesPage
