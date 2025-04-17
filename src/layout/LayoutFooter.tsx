import React from 'react'
import { useAuth } from '~/helper/useAuth.tsx'
import { decodeJwtToken } from '~/helper/useJwt.tsx'
import moment from 'moment/moment'
import KontainerLabel from '~/layout/KontainerLabel.tsx'
import DevOnly from '~/elements/DevOnly.tsx'

const LayoutFooter = () => {
  const { authToken } = useAuth()
  const decodedToken = decodeJwtToken(authToken)

  return (
    <div>
      <footer>
        <div>
          {decodedToken && (
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <span>Logged in as: {decodedToken.sub}</span>
              {' | '}
              <span>Session Expires: {moment(decodedToken.exp * 1000).fromNow()}</span>
              <DevOnly>
                <pre>{JSON.stringify(decodedToken, null, 2)}</pre>
              </DevOnly>
            </div>
          )}
        </div>
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          &copy; {new Date().getFullYear()} <KontainerLabel />. All rights reserved. Made with &hearts; by the{' '}
          <KontainerLabel /> team.
        </div>
      </footer>
    </div>
  )
}

export default LayoutFooter
