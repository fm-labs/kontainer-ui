import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AppStoreProvider } from './helper/useAppStoreContext.tsx'
import router from './router'
import AppTheme from '~/layout/AppTheme.tsx'

function App() {
  return (
    <>
      <AppStoreProvider>
        <HelmetProvider>
          <Helmet>
            <meta charSet='utf-8' />
            <meta name='color-scheme' content='light' />
            <title>kontainer</title>
          </Helmet>
          <AppTheme>
            <RouterProvider router={router} />
          </AppTheme>
          {/*<DevKitBar panels={panels} />*/}
        </HelmetProvider>
        <ToastContainer position={'bottom-left'} pauseOnFocusLoss={false} pauseOnHover={false} />
      </AppStoreProvider>
    </>
  )
}

export default App
