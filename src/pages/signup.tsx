import { useForm } from 'react-hook-form'
import { Button } from '../components/Button'
import { InputGroup } from '../components/InputGroup'
import { Link } from '../components/Link'
import { Logo } from '../components/Logo'
import { useAuth } from '../hooks/useAuth'
import { Access } from '../layouts/Access'

import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'
import axios from 'axios'
import { useState } from 'react'

interface SignUpInputs {
  email: string
  password: string
  name: string
  profile_name: string
  password_confirmation: string
}

const signUpFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  profile_name: yup.string().required('Nome de usuário obrigatório'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(8, 'No mínimo 8 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais'),
})

const SignUp = () => {
  const { signUp } = useAuth()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInputs>({ resolver: yupResolver(signUpFormSchema) })

  const [apiError, setApiError] = useState('')

  const handleSignUp = async ({
    password_confirmation,
    ...data
  }: SignUpInputs) => {
    try {
      await signUp(data)
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 409) {
          const responseData = e.response.data as {
            email?: string
            profile_name?: string
          }
          if (responseData.email) {
            setError('email', { message: 'Email is already in use' })
          }

          if (responseData.profile_name) {
            setError('profile_name', {
              message: 'Profile name is already in use',
            })
          }
        } else {
          setApiError('Something went wrong')
        }
      }
    }
  }

  return (
    <Access>
      <div className="p-6 mx-auto w-full max-w-[500px]">
        <Logo className="text-4xl" />
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="mt-4 mx-auto gap-4 flex justify-center align-center flex-col max-w-md"
        >
          {apiError && <p className="text-red-500">{apiError}</p>}

          <InputGroup
            error={errors.name}
            autoFocus
            autoComplete="off"
            label="Name"
            {...register('name')}
          />
          <InputGroup
            error={errors.email}
            autoComplete="off"
            label="Email"
            {...register('email')}
          />
          <InputGroup
            error={errors.profile_name}
            autoComplete="off"
            label="Profile Name"
            {...register('profile_name')}
          />
          <InputGroup
            error={errors.password}
            type={'password'}
            autoComplete="off"
            label="Password"
            {...register('password')}
          />
          <InputGroup
            error={errors.password_confirmation}
            type={'password'}
            autoComplete="off"
            label="Confirm password"
            {...register('password_confirmation')}
          />

          <Button isLoading={isSubmitting}>Sign Up</Button>
        </form>

        <p className="mt-4">
          Have an account? <Link href="/login">Log in</Link>
        </p>
      </div>
    </Access>
  )
}

export default SignUp
