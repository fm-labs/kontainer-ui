import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { Alert, Button, Container, Table } from 'react-bootstrap'

const NetworksPage = () => {
  const data = useLoaderData() as any // IDockerNetwork[]

  return (
    <Container>
      <h1>Networks</h1>
      {data && (
        <Table>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row?.Id}</td>
                <td>{row?.Driver}</td>
                <td>{row?.Name}</td>
                <td>{row?.Created}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default NetworksPage
