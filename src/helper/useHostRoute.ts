import { useLocation } from 'react-router'
import { useMatches } from 'react-router-dom'
import React from 'react'

export const useHostRoute = () => {
  const location = useLocation()
  const matches = useMatches()

  //console.log('useHostRoute', location, matches)

  const getHostAlias = () => {
    if (!matches || matches.length <= 1) {
      return
    }

    // The first match contains the host alias
    const match = matches[1]
    return match?.params?.environment
  }

  // const detectInHostRoute = () => {
  //   const hostAlias = getHostAlias()
  //   return !!hostAlias
  // }

  const environment = React.useMemo(() => getHostAlias(), [matches])

  const buildHostUrl = (path: string) => {
    if (!environment) {
      return path
    }

    return `/${environment}${path}`
  }

  return {
    location,
    matches,
    environment: environment,
    inHostRoute: !!environment,
    buildHostUrl,
  }
}
