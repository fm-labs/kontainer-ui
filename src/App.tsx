import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import router from './router'
import { ToastContainer } from 'react-toastify'
import { AppStoreProvider } from './context/AppContext.tsx'

function App() {
  return (
    <>
      <AppStoreProvider>
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
      </AppStoreProvider>
    </>
  )
}

export default App
