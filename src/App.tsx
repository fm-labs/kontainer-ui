import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import router from './router'
import AppStore from './store/AppStore'
import { ToastContainer } from 'react-toastify'

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
        <ToastContainer position={'top-center'} pauseOnFocusLoss={false} pauseOnHover={false} />
      </AppStore>
    </>
  )
}

export default App
