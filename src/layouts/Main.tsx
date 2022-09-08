import { Header } from '../components/Header'
import { Logo } from '../components/Logo'
import React from 'react'

interface MainProps {
  children: React.ReactNode
  className?: string
}

export const Main = ({ children, className }: MainProps) => {
  return (
    <>
      <div id="modal-root" />
      <Header />
      <main className={className}>{children}</main>
    </>
  )
}
