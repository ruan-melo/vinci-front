import { useDisclosure } from '@chakra-ui/hooks'
import { createContext, ReactNode } from 'react'
import { NewPost } from '../components/Header/NewPost'

interface NewPostContextData {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const NewPostContext = createContext({} as NewPostContextData)

interface NewPostContextProviderProps {
  children: ReactNode
}

export const NewPostContextProvider = ({
  children,
}: NewPostContextProviderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <NewPostContext.Provider value={{ isOpen, open: onOpen, close: onClose }}>
      <NewPost />
      {children}
    </NewPostContext.Provider>
  )
}
