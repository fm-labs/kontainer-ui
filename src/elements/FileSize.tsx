import React from 'react'

const FileSize = ({ bytes }: { bytes: number }) => {
  if (bytes > 1000000000) {
    return <span>{(bytes / 1000000000).toFixed(2)} GB</span>
  }
  if (bytes > 1000000) {
    return <span>{(bytes / 1000000).toFixed(2)} MB</span>
  }
  if (bytes > 1000) {
    return <span>{(bytes / 1000).toFixed(2)} KB</span>
  }

  return <span>{bytes} B</span>
}

export default FileSize
