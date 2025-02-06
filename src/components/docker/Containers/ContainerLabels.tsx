import React from 'react'

const ContainerLabels = ({ labels }: { labels: { [key: string]: string } }) => {
  return (
    <div>
      {Object.entries(labels).map((label) => {
        return (
          <div key={label[0]}>
            {label[0]}: {label[1]}
          </div>
        )
      })}
    </div>
  )
}

export default ContainerLabels
