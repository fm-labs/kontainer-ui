import React from 'react'
import { IDockerResourceAttrs } from '../../../types.ts'

const ContainerPaths = ({ container }: { container: IDockerResourceAttrs }) => {
  return (
    <div>
      {Object.entries(container).map(([key, value]) => {
        if (!key.endsWith('Path')) {
          return null
        }
        return (
          <div key={key}>
            {key}: {value}
          </div>
        )
      })}
    </div>
  )
}

export default ContainerPaths
