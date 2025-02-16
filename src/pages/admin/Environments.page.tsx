import React from 'react'
import { Link } from 'react-router-dom'
import JsonView from '../../elements/JsonView.tsx'
import Container from '@mui/material/Container'
import useEnvironments from '../../helper/useEnvironments.ts'

const EnvironmentsPage = () => {
  const { envs } = useEnvironments()

  //const data = useLoaderData() as any
  //const [envs, setEnvs] = React.useState(defaultEnvs)

  // const handleAddEnvClick = () => {
  //   const hostname = prompt('Enter hostname')
  //   if (!hostname) return
  //
  //   const newEnvs = [...envs, { hostname, name: hostname }]
  //   setEnvs(newEnvs)
  //   saveEnvsInLocalStorage(newEnvs)
  // }

  // React.useEffect(() => {
  //   const envs = restoreEnvsFromLocalStorage()
  //   setEnvs(envs)
  // }, [])

  return (
    <Container maxWidth={false}>
      <h1>Environments</h1>
      {/*<button onClick={handleAddEnvClick}>Add Environment</button>*/}
      {envs.map((env: any) => (
        <div key={env.id}>
          <h2>
            {env.label} ({env.hostname})
          </h2>
          <div>
            <Link to={`/${env.id}`}>Dashboard</Link> | <Link to={`/${env.id}/docker`}>Docker</Link> |{' '}
            <Link to={`/${env.id}/docker/containers`}>Containers</Link> |{' '}
            <Link to={`/${env.id}/docker/images`}>Images</Link> | <Link to={`/${env.id}/docker/volumes`}>Volumes</Link>
          </div>
        </div>
      ))}
      <hr />
      <JsonView src={envs} />
    </Container>
  )
}

export default EnvironmentsPage
