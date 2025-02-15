import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import JsonView from '../../elements/JsonView.tsx'
import Container from '@mui/material/Container'

const defaultEnvs = [
  {
    hostname: 'localhost',
    name: 'Local',
  },
]

const saveEnvsInLocalStorage = (envs: any[]) => {
  localStorage.setItem('kstack.environments', JSON.stringify(envs))
}

const restoreEnvsFromLocalStorage = () => {
  const envs = localStorage.getItem('kstack.environments')
  if (!envs) return defaultEnvs
  return JSON.parse(envs)
}

const EnvironmentsPage = () => {
  //const data = useLoaderData() as any
  const [envs, setEnvs] = React.useState(defaultEnvs)

  const handleAddEnvClick = () => {
    const hostname = prompt('Enter hostname')
    if (!hostname) return

    const newEnvs = [...envs, { hostname, name: hostname }]
    setEnvs(newEnvs)
    saveEnvsInLocalStorage(newEnvs)
  }

  React.useEffect(() => {
    const envs = restoreEnvsFromLocalStorage()
    setEnvs(envs)
  }, [])

  return (
    <Container maxWidth={false}>
      <h1>Environments</h1>
      <button onClick={handleAddEnvClick}>Add Environment</button>
      {envs.map((env: any) => (
        <div key={env.hostname}>
          <h2>{env.hostname}</h2>
          <div>
            <Link to={`/${env.hostname}`}>Dashboard</Link> | <Link to={`/${env.hostname}/docker`}>Docker</Link> |{' '}
            <Link to={`/${env.hostname}/docker/containers`}>Containers</Link> |{' '}
            <Link to={`/${env.hostname}/docker/images`}>Images</Link> |{' '}
            <Link to={`/${env.hostname}/docker/volumes`}>Volumes</Link>
          </div>
        </div>
      ))}
      <hr />
      <JsonView src={envs} />
    </Container>
  )
}

export default EnvironmentsPage
