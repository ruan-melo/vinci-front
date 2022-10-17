import React, { Fragment, ReactNode } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'

type ModalProps =
  | {
      title?: string
      children: React.ReactNode
      showCloseButton?: boolean
      isOpen: boolean
      closeModal: () => void
      className?: string
      containerClassName?: string
    }
  | {
      showCloseButton?: boolean
      title?: string
      children: React.ReactNode
      isOpen: boolean
      closeModal: () => void
      className?: string
      containerClassName?: string

      secondaryBtn?: ReactNode
      primaryBtn?: ReactNode
    }

export const Modal = ({
  title,
  children,
  showCloseButton = false,
  isOpen,
  closeModal,
  className,
  containerClassName,
  ...rest
}: ModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className={` ${containerClassName}`}
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto ">
          <div
            className={`flex h-modal min-h-full items-center justify-center p-4 text-center`}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={` w-full rounded-md bg-white text-left align-middle shadow-xl ${className}`}
              >
                <div className="flex items-center  w-full">
                  {title && (
                    <Dialog.Title
                      as="h3"
                      className="inline-block w-fit text-lg font-medium leading-6 text-gray-900 flex-shrink-0"
                    >
                      {title}
                    </Dialog.Title>
                  )}
                  {showCloseButton && (
                    <button
                      onClick={closeModal}
                      className="flex ml-auto  items-center cursor-pointer text-gray-500 hover:text-gray-800 transition-all duration-300 h-5 w-5"
                    >
                      <XIcon />
                    </button>
                  )}
                </div>

                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export const ModalFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-end items-center gap-4 mt-4">{children}</div>
  )
}
