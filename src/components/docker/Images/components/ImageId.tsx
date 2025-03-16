import React from 'react'

const ImageId = ({ value }: { value: string }) => {
  return <span>{value.substring(0, 32)}</span>
}

export default ImageId
