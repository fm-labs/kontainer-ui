import React, { PropsWithChildren } from 'react'
import LayoutHeaderBar from './LayoutHeaderBar.tsx'
import { Container } from 'react-bootstrap'

interface LayoutProps extends PropsWithChildren {}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={'Layout'}>
      <header className={'Header'}>
        <LayoutHeaderBar />
      </header>
      <div className={'Content w-100'}></div>
      <main className={'Main ms-auto me-auto'}>{children}</main>
      <footer className={'Footer'}></footer>
    </div>
  )
}

export default Layout
