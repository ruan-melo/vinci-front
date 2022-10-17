import { Button } from '../components/Button'
import { InputGroup } from '../components/InputGroup'
import { Link } from '../components/Link'
import { Logo } from '../components/Logo'
import { useAuth } from '../hooks/useAuth'
import { Access } from '../layouts/Access'
import { useForm } from 'react-hook-form'
import axios, { Axios } from 'axios'
import { useState } from 'react'

interface LogInInputs {
  email: string
  password: string
}

const Login = () => {
  const { login } = useAuth()
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<LogInInputs>()

  const [error, setError] = useState('')

  const handleLogIn = async (data: LogInInputs) => {
    try {
      await login(data)
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          setError('Invalid credentials')
        } else {
          setError('Something went wrong')
        }
      }
    }
  }

  return (
    <Access>
      <div className="p-6 mx-auto w-full max-w-[500px]">
        <Logo className="text-4xl" />
        <form
          onFocus={() => {
            setError('')
          }}
          onSubmit={handleSubmit(handleLogIn)}
          className="mt-4 mx-auto gap-4 flex justify-center align-center flex-col max-w-md"
        >
          {error && <p className="text-red-500">{error}</p>}

          <InputGroup
            autoFocus
            autoComplete="off"
            label="Email"
            error={errors.email}
            {...register('email')}
          />
          <InputGroup
            type={'password'}
            autoComplete="off"
            label="Password"
            error={errors.password}
            {...register('password')}
          />

          <Button isLoading={isSubmitting}>Log In</Button>
        </form>

        <p className="mt-4">
          {"Don't"} have an account? <Link href={'/signup'}>Sign up</Link>
        </p>
      </div>
    </Access>
  )
}

export default Login
