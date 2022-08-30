import { ForwardedRef, forwardRef } from "react";
import { FieldError } from "react-hook-form";

export type InputGroupProps = Omit<React.HTMLProps<HTMLInputElement>, 'className'> & {
    label?: string;
    name: string;
    error?: FieldError;
    type?: string;
    placeholder?: string;
    inputClassName?: string;
    containerClassName?: string;
    button?: {label: string, name: string, children: React.ReactNode};
}

// eslint-disable-next-line react/display-name
export const InputGroup = forwardRef(({error, label, name, type = 'text', button, placeholder, inputClassName, containerClassName, ...rest}: InputGroupProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div className={`${containerClassName}`}>
        {label && <label className="block text-sm font-medium text-gray-700" htmlFor={name}>{label}</label>}

        <div className={`mt-1 relative rounded-md ${containerClassName}`}>
          {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div> */}
          <input
            type={type}
            name={name}
            id={name}
            className={`transition-all duration-200 focus:ring-green-600 focus:border-green-600 block w-full px-4 sm:text-sm border-gray-300 rounded-md ${inputClassName}`}
            placeholder={placeholder}
            {...rest}
            ref={ref}
          />
          {error ? (
            <div className='text-sm text-red-500'>
              {error.message}
            </div>) : null
            }
          {button &&  (
            <div className="absolute inset-y-0 right-0 flex items-center cursor-pointer">
              <label htmlFor={button.name} className="sr-only">
                {button.label}
              </label>
              {button.children}
            </div>
          )}
         
        </div>
      </div>
    )
  })