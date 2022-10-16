import { createContext, ReactNode, useEffect, useState } from 'react'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import Router from 'next/router'
import { api } from '../services/api'
import { makeVar, useQuery, useReactiveVar } from '@apollo/client'
import { client } from '../services/apolloClient'
import { GET_LOGGED_USER_INFO } from '../services/queries'
import { getFirebaseMessaging, registerFCM } from '../services/firebase'
import { deleteToken, getToken } from 'firebase/messaging'
import { toast } from 'react-toastify'
import axios from 'axios'

export interface Profile {
  id: string
  name: string
  email: string
  profile_name: string
  avatar: string | null
  createdAt: string
  updatedAt: string
}
interface AccessResponse {
  access_token: string
  user: Profile
}

interface LoginData {
  email: string
  password: string
}

interface SignUpData {
  name: string
  email: string
  password: string
  profile_name: string
}

interface AuthContextData {
  user: Profile | null
  login: (data: LoginData) => Promise<void>
  signUp: (data: SignUpData) => Promise<void>
  logout: () => void
  editUser: (data: Profile) => void
  isAuthenticated: boolean
}

export const AuthContext = createContext({} as AuthContextData)

interface AuthContextProviderProps {
  children: ReactNode
}

const userVar = makeVar<Profile | null>(null)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const user = useReactiveVar(userVar)

  //   const { 'vinci:access_token': access_token } = parseCookies()
  const { error, loading, data } = useQuery<{ profile: Profile }>(
    GET_LOGGED_USER_INFO,
  )
  const isAuthenticated = !!user

  const editUser = (user: Profile) => {
    userVar(user)
  }

  //   const getUserProfile = async (access_token: string) => {
  //     const { data } = await api.get<User>('/users/profile')

  //     return data
  //   }

  useEffect(() => {
    if (user) {
      if (typeof window !== 'undefined') {
        registerFCM()
          .then((token) => {
            console.log(token)
          })
          .catch((err) => {
            console.log('err: ', err)
          })
      }
    }
  }, [user])

  useEffect(() => {
    if (data) {
      userVar(data.profile)
    }
  }, [data])

  const logout = async () => {
    try {
      const messaging = getFirebaseMessaging()
      if (messaging) {
        const token = await getToken(messaging)
        await deleteToken(messaging)
        const response = await api.delete('/users/tokens', {
          data: {
            token,
          },
        })
      }
    } catch (e) {
      toast.error('Erro ao deslogar ' + e)
    }

    userVar(null)
    destroyCookie(null, 'vinci:access_token')
    client.clearStore()
    Router.push('/')
  }

  async function login(credentials: { email: string; password: string }) {
    toast.info('Logando...')
    try {
      const { data } = await api.post<AccessResponse>(
        '/auth/login',
        credentials,
      )
      const { access_token, user } = data
      userVar(user)
      // Como está do lado do client não é necessário passar o ctx para a função (passa null no lugar)
      // Como diversas aplicações em desenvolvimento utilizando o localhost, é recomendado utilizar um prefixo para o cookie
      setCookie(null, 'vinci:access_token', access_token, {
        maxAge: 7 * 24 * 60 * 60, // 7 days
      })

      toast.info('Logado')
      api.defaults.headers.common.Authorization = `Bearer ${access_token}`
      Router.push('/')
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error('Erro ao logar ' + e.code)
      }
    }
  }

  async function signUp(credentials: {
    name: string
    email: string
    password: string
  }) {
    const { data } = await api.post<AccessResponse>('/auth/signup', credentials)

    const { access_token, user } = data
    userVar(user)
    setCookie(null, 'vinci:access_token', access_token, {
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    api.defaults.headers.common.Authorization = `Bearer ${access_token}`
    Router.push('/')
  }
  return (
    <AuthContext.Provider
      value={{ user, login, isAuthenticated, logout, signUp, editUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
