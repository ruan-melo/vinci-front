import { useDisclosure } from '@chakra-ui/hooks'
import { PencilIcon } from '@heroicons/react/solid'
import axios from 'axios'
import Router from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Avatar } from '../../components/Avatar'
import { Button } from '../../components/Button'
import { Dropzone } from '../../components/Dropzone'
import { InputGroup } from '../../components/InputGroup'
import { Modal } from '../../components/Modal'
import { useAuth } from '../../hooks/useAuth'
import { Main } from '../../layouts/Main'
import { api } from '../../services/api'
import { EditAvatar } from './EditAvatar'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { client } from '../../services/apolloClient'
import { EDIT_PROFILE } from '../../services/queries'
import { Profile } from '../../contexts/AuthContext'

interface Inputs {
  name: string
  profile_name: string
}

const schema = yup
  .object({
    name: yup.string().required().trim().min(4).max(255),
    profile_name: yup.string().required().trim().min(4).max(60),
  })
  .required()

const Edit = () => {
  const { user, editUser } = useAuth()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: { name: user?.name, profile_name: user?.profile_name },
    resolver: yupResolver(schema),
  })

  const {
    isOpen: isEditAvatarOpen,
    onOpen: openEditAvatar,
    onClose: closeEditAvatar,
  } = useDisclosure()

  useEffect(() => {
    if (user) {
      reset({ name: user.name, profile_name: user.profile_name })
    }
  }, [user])

  const onSubmit = async (data: Inputs) => {
    const variables: { name?: string; profile_name?: string } = {}

    if (data.name) {
      variables.name = data.name
    }

    if (data.profile_name) {
      variables.profile_name = data.profile_name
    }
    try {
      const { data, errors } = await client.mutate<{ profile: Profile }>({
        mutation: EDIT_PROFILE,
        variables,
      })

      if (errors || !data) {
        toast.error('Error')
        return
      }

      editUser(data.profile)
      // Router.reload()
    } catch (e) {
      toast('An error ocurred during profile update', {
        type: 'error',
        position: 'top-center',
      })
      // if (axios.isAxiosError(e)) {
      //   if (e.response) {
      //     console.log(e.response.data)
      //     toast('Erro ao atualizar perfil', {
      //       type: 'error',
      //       position: 'top-center',
      //     })
      //   } else {
      //     console.log(e.message)
      //   }
      // } else {
      //   console.log(e)
      // }
    }
  }

  const handleChangePassword = () => {
    Router.push('/edit/password')
  }

  if (!user) {
    return <div>tela de loading</div>
  }

  return (
    <Main>
      <div className="flex flex-col gap-4 p-6 bg-white mt-4 border max-w-2xl mx-auto  ">
        <h4 className="text-center text-md font-bold">Edit Profile</h4>
        <div className="relative w-fit mx-auto">
          <Avatar name={user?.name} avatar={user.avatar} />
          <div
            onClick={openEditAvatar}
            className="cursor-pointer absolute bottom-0 right-0 w-6 h-6 bg-white border border-gray-200 rounded-full p-1"
          >
            <PencilIcon />
          </div>

          <Modal
            title="Edit avatar"
            className="max-w-screen-md p-6  min-h-[350px]"
            isOpen={isEditAvatarOpen}
            closeModal={closeEditAvatar}
          >
            <EditAvatar />
          </Modal>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <InputGroup error={errors.name} label="Name" {...register('name')} />
          <InputGroup
            error={errors.profile_name}
            label="Profile name"
            {...register('profile_name')}
          />
          {isDirty && (
            <Button
              type="button"
              onClick={() =>
                reset({
                  name: user.name,
                  profile_name: user.profile_name,
                })
              }
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

        <Button variant="outline" onClick={handleChangePassword}>
          Change Password
        </Button>
      </div>
    </Main>
  )
}

export default Edit
