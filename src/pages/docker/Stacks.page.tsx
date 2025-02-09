import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Container from '@mui/material/Container'
import api from '../../lib/api.ts'
import StacksTableMaterial from '../../components/docker/Stacks/StacksTableMaterial.tsx'
import { Helmet } from 'react-helmet-async'
import Toolbar from '@mui/material/Toolbar'
import Heading from '../../elements/Heading.tsx'
import StacksCreateButton from '../../components/docker/Stacks/StacksCreate.button.tsx'

const StacksPage = () => {
  const loaderData = useLoaderData() as any // IDockerStack[]
  const [data, setData] = React.useState(loaderData)

  React.useEffect(() => {
    console.log('StacksPage mounted')
    const timer = setInterval(() => {
      console.log('Refreshing projects')
      api
        .getStacks()()
        .then((data) => {
          console.log('Stacks refreshed', data)
          setData(data)
        })
    }, 5000)
    return () => {
      console.log('StacksPage unmounted')
      clearInterval(timer)
    }
  }, [])

  return (
    <Container maxWidth={false}>
      <Helmet>
        <title>Stacks</title>
      </Helmet>
      <Toolbar disableGutters>
        <Heading label={'Stacks'}>
          <div>
            <StacksCreateButton />
          </div>
        </Heading>
      </Toolbar>

      <StacksTableMaterial data={data} />
    </Container>
  )
}

export default StacksPage
