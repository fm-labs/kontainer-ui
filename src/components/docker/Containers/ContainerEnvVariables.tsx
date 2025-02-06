import React from 'react'

const ContainerEnvVariables = ({ env }: { env: string[] }) => {
  return (
    <div>
      {env.map((envVar) => {
        const [key, value] = envVar.split('=')
        return (
          <div key={key}>
            {key}: {value}
          </div>
        )
      })}
    </div>
  )
}

export default ContainerEnvVariables
