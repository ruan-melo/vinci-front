import React, { ForwardedRef, forwardRef, useCallback } from 'react'
import {
  DropzoneOptions,
  FileError,
  FileRejection,
  useDropzone,
} from 'react-dropzone'

type DropzoneProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  id: string
  name: string
  multiple?: boolean
  labelClassName?: string
  options?: Omit<DropzoneOptions, 'accept'>
  accept: DropzoneOptions['accept']
  onChange: (files: File[]) => void
  onDropRejected?: (errors: FileRejection[]) => void
}

// eslint-disable-next-line react/display-name
export const Dropzone = forwardRef(
  (
    {
      id,
      labelClassName,
      onChange,
      onBlur,
      onClick,
      multiple,
      name,
      options,
      accept,
      onDropRejected,
      ...rest
    }: DropzoneProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const onDropAccepted = useCallback(
      (acceptedFiles: File[]) => {
        onChange(acceptedFiles)
      },
      [onChange],
    )

    function formatValidator(file: File): FileError | null {
      if (!accept) return null

      const matchMimeType = accept[file.type]

      if (!matchMimeType) {
        return {
          code: 'file-invalid-type',
          message: 'Tipo de arquivo inválido',
        }
      }

      const matchExtension = matchMimeType.find((ext) =>
        file.name.endsWith(ext),
      )

      if (!matchExtension) {
        return {
          code: 'file-invalid-extension',
          message: 'Extensão do arquivo inválida',
        }
      }

      return null
    }

    const { getRootProps, getInputProps, fileRejections } = useDropzone({
      // ...options,
      validator: formatValidator,

      onDropAccepted,
      onDropRejected,
    })

    return (
      <div
        className={`h-full w-full flex flex-col p-4 gap-2 items-center justify-center  border-2 border-dashed bg-gray-100 border-gray-300 rounded-md
          hover:bg-gray-200 transition-all duration-300
          hover:border-green-300
        `}
        {...getRootProps()}
      >
        <input
          // id={id}
          // name={name}
          // multiple={multiple}
          {...getInputProps()}
          // onChange={() => {
          //   console.log('changed')
          // }}
          // ref={ref}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>

        <p className="text-md">Click to upload or drag and drop</p>
        <p className="text-sm">JPG, JPEG, BMP or PNG</p>
      </div>
    )
  },
)
