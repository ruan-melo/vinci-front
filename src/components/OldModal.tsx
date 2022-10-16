import { LocationMarkerIcon, XIcon } from '@heroicons/react/solid'
import { title } from 'process'
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'

interface ModalProps {
  children: ReactNode
  title: string
  isOpen: boolean
  onClose: () => void
}

const wrapperId = 'modal-root'

export const Modal = ({ children, title, isOpen, onClose }: ModalProps) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null)
  const nodeRef = useRef(null)

  useEffect(() => {
    let element = document.getElementById(wrapperId)
    let systemCreated = false
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      systemCreated = true
      element = createWrapperAndAppendToBody(wrapperId)
    }
    setWrapperElement(element)

    return () => {
      // delete the programatically created element
      if (!element) return
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element)
      }
    }
  }, [wrapperId])

  if (wrapperElement === null) return null

  return ReactDOM.createPortal(
    <CSSTransition
      in={isOpen}
      timeout={{ enter: 0, exit: 300 }}
      unmountOnExit
      classNames="modal"
      nodeRef={nodeRef}
    >
      <div className="fixed inset-0 z-40 flex items-center justify-center">
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={onClose}
        ></div>
        <div
          ref={nodeRef}
          className="modal relative flex flex-col gap-4 w-full max-w-md px-4 py-6 bg-white rounded-lg shadow-xl"
        >
          <div className="flex justify-between items-center border-b-2 border-gray-200 pb-2">
            <h3>{title}</h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={onClose}
                className="p-2 rounded-sm hover:bg-gray-200 transition-all duration-200"
              >
                <span className="sr-only">Close modal</span>
                <XIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
          {children}
        </div>
      </div>
    </CSSTransition>,
    wrapperElement as Element,
  )
}

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement('div')
  wrapperElement.setAttribute('id', wrapperId)
  document.body.appendChild(wrapperElement)
  return wrapperElement
}
