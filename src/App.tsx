import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import router from './router'
import AppStore from './store/AppStore'

function App() {
  return (
    <>
      <AppStore>
        <HelmetProvider>
          <Helmet>
            <meta charSet='utf-8' />
            <meta name='color-scheme' content='light' />
            <title>kstack-ui</title>
          </Helmet>
          <RouterProvider router={router} />
          {/*<DevKitBar panels={panels} />*/}
        </HelmetProvider>
      </AppStore>
    </>
  )
}

export default App
