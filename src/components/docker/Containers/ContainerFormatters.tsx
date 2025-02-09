import * as React from 'react'
import { Link } from 'react-router-dom'

export const ContainerId = (props: { value: string; showLink?: boolean; maxDigits?: number }) => {
  const _showLink = props?.showLink || false
  const _maxDigits = props?.maxDigits || 32

  if (_showLink) {
    return <Link to={`/containers/${props.value}`}>{props.value.substring(0, _maxDigits)}</Link>
  }

  return <span>{props.value.substring(0, _maxDigits)}</span>
}

export const ContainerName = (props: { value: string; showLink?: boolean }) => {
  const _showLink = props?.showLink || false

  if (_showLink) {
    return <Link to={`/containers/${props.value}`}>{props.value}</Link>
  }

  return <span>{props.value}</span>
}

export default {
  ContainerId,
  ContainerName,
}
