import React from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { useLoaderData } from 'react-router-dom'

const ImagesPage = () => {

  const data = useLoaderData() as IDockerImage[]

  return (
    <Container>
      <h1>Images</h1>
      {data && <Table><tbody>
      {data.map((row: any) => <tr key={row.Id}>
        <td title={row.Id}>
          {row.Id.substring(0, 32)}
        </td>
        <td>{row?.RepoTags?.map((tag) => <div key={tag}>{tag}</div>)}</td>
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
