import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { Button, Container, Table } from 'react-bootstrap'
import { FaPause, FaPlay, FaTrash } from 'react-icons/fa'
import ContainerCreateModal from './ContainerCreate.modal.tsx'

const ContainersPage = () => {

  const data = useLoaderData() as IDockerContainer[]

  return (
    <Container>
      <h1>Containers</h1>
      <ContainerCreateModal />
      <hr />
      {data && <Table><tbody>
        {data.map((row) => <tr key={row.id}>
          <td>{row.id}</td>
          <td>{row?.name}</td>
          <td>{row?.status}</td>
          <td>
            <Button size={"sm"}><FaPlay />{' '}Start</Button>
            <Button size={"sm"}><FaPause />{' '}Stop</Button>
            <Button size={"sm"} variant={"danger"}><FaTrash />{' '}Remove</Button>
          </td>
        </tr>)}
      </tbody></Table>}
    </Container>
  )
}

export default ContainersPage
