import React from 'react'

const ContainerId = ({ value }) => {
  return <span title={value}>{value.substring(0, 12)}</span>
}

export default ContainerId
