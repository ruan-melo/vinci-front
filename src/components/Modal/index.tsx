import { Dialog , Transition} from "@headlessui/react"
import { Fragment } from "react"
import { Button } from "../Button";


type ModalProps =  {
    title?: string;
    children: React.ReactNode;
    isOpen: boolean
    closeModal: () => void;
    className?: string;
    containerClassName?: string;
}  | {
    title?: string;
    children: React.ReactNode;
    isOpen: boolean
    closeModal: () => void;
    className?: string;
    containerClassName?: string;

    secondaryAction?: string;
    primaryAction: string;
    onPrimaryAction: () => void;
}

export const Modal = ({title, children, isOpen, closeModal, className, containerClassName, ...rest}: ModalProps) => {
    return(
        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 bg-red-300" onClose={closeModal}>
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
            <div className={`flex h-modal min-h-full items-center justify-center p-4 text-center ${containerClassName}`}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className={` w-full  transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all ${className}`}>
                  {title &&   <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex-shrink-0"
                  >
                    {title}
                  </Dialog.Title>}
                 
                  {children}


                    {'primaryAction' in rest && (
                        <div className="flex justify-end items-center gap-4 mt-4">
                            {rest.secondaryAction && (
                                <Button
                                onClick={closeModal}
                                className=' bg-opacity-0 text-gray-600 hover:bg-opacity-100 hover:bg-gray-200'
                                >
                                {rest.secondaryAction}
                                </Button>
                            )}
                            <Button
                            onClick={rest.onPrimaryAction}
                            >
                            {rest.primaryAction}
                            </Button>
                        </div>
                    )}
                 
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    )
}