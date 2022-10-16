import { useForm } from 'react-hook-form'
import { Button } from '../components/Button'
import { InputGroup } from '../components/InputGroup'
import { Link } from '../components/Link'
import { Logo } from '../components/Logo'
import { useAuth } from '../hooks/useAuth'
import { Access } from '../layouts/Access'

import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'

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
    .min(12, 'No mínimo 12 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais'),
})

const SignUp = () => {
  const { signUp } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInputs>({ resolver: yupResolver(signUpFormSchema) })

  const handleSignUp = async (data: SignUpInputs) => {
    await signUp(data)
  }

  return (
    <Access>
      <div className="p-6 mx-auto w-full max-w-[500px]">
        <Logo />
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="mt-4 mx-auto gap-4 flex justify-center align-center flex-col max-w-md"
        >
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
