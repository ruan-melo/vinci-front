import { useForm } from 'react-hook-form'
import { Button } from '../../components/Button'
import { InputGroup } from '../../components/InputGroup'
import { Main } from '../../layouts/Main'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from '../../services/api'
import { toast } from 'react-toastify'
import axios from 'axios'

type Inputs = {
  current_password: string
  password: string
  password_confirmation: string
}

const schema = yup
  .object({
    current_password: yup.string().required(),
    password: yup.string().required().trim().min(8).max(60),
    password_confirmation: yup
      .string()
      .oneOf([null, yup.ref('password')], 'Passwords must match'),
  })
  .required()

const ChangePassword = () => {
  const {
    register,
    reset,
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
  } = useForm<Inputs>({ resolver: yupResolver(schema) })

  const onSubmit = async (data: Inputs) => {
    try {
      const response = await api.patch('/users/password', {
        current_password: data.current_password,
        password: data.password,
      })
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          toast.error('Current password is incorrect', {
            position: 'top-center',
          })
        } else {
          toast.error('An error ocurred during password update', {
            position: 'top-center',
          })
        }
      } else {
        toast('An error ocurred during password update', {
          type: 'error',
          position: 'top-center',
        })
      }
    }
  }

  return (
    <Main>
      <div className="flex flex-col gap-4 p-6 bg-white mt-4 border max-w-2xl mx-auto  ">
        <h4 className="text-center text-md font-bold">Change Password</h4>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <InputGroup
            type="password"
            label="Current Password"
            error={errors.current_password}
            {...register('current_password')}
          />
          <InputGroup
            type="password"
            error={errors.password}
            label="Password"
            {...register('password')}
          />
          <InputGroup
            type="password"
            error={errors.password_confirmation}
            label="Confirm password"
            {...register('password_confirmation')}
          />
          {isDirty && (
            <Button
              type="button"
              onClick={() => reset()}
              variant="outline"
              className="text-red-400 hover:text-red-600 w-fit text-sm px-2 "
            >
              Discard changes
            </Button>
          )}
          <Button
            type="submit"
            className="mt-4 mx-auto"
            isLoading={isSubmitting}
            isDisabled={!isDirty || Object.keys(errors).length !== 0}
          >
            Save
          </Button>
        </form>

        {/* <Button variant="outline" onClick={handleChangePassword}>
          Change Password
        </Button> */}
      </div>
    </Main>
  )
}

export default ChangePassword
