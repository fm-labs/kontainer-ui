import React from 'react'
import ReactJson, { ReactJsonViewProps } from '@microlink/react-json-view'

const JsonView = (props: ReactJsonViewProps) => {
  const defaultProps: ReactJsonViewProps = {
    src: {},
    displayObjectSize: false,
    displayDataTypes: false,
    style: { fontSize: '0.8rem' },
  }
  const viewProps = { ...defaultProps, ...props }

  const containerStyle: any = {
    maxHeight: '400px',
    maxWidth: '100%',
    overflowY: 'auto',
  }

  return (
    <div style={containerStyle}>
      <ReactJson {...viewProps} />
    </div>
  )
}

export default JsonView
