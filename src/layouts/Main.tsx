import { Header } from '../components/Header'
import { Logo } from '../components/Logo'
import React from 'react'
import { BottomBar } from '../components/BottomBar'
import { NewPostContextProvider } from '../contexts/NewPostContext'

interface MainProps {
  children: React.ReactNode
  className?: string
}

export const Main = ({ children, className }: MainProps) => {
  return (
    <NewPostContextProvider>
      <div id="modal-root" />
      <Header />
      <main className={className + ' pb-16 md:pb-0'}>{children}</main>
      <BottomBar />
    </NewPostContextProvider>
  )
}
