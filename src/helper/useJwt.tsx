export const decodeJwtToken = (token: string | null): any => {
  if (!token) {
    return null
  }
  const payload = token.split('.')[1]
  if (!payload) {
    return null
  }
  const decodedPayload = JSON.parse(atob(payload))
  console.log('decodedJWT', decodedPayload)
  return decodedPayload
}

export const checkJwtTokenIsValid = (token: string | null): boolean => {
  const decodedPayload = decodeJwtToken(token)
  if (!decodedPayload) {
    return false
  }

  const exp = decodedPayload.exp
  if (!exp) {
    return false
  }
  const now = Math.floor(Date.now() / 1000)
  console.log('Token expires in ', exp - now, 'seconds')
  return exp > now
}
