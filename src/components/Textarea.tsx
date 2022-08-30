import { ForwardedRef, forwardRef } from "react";

type  TextareaProps = React.HTMLProps<HTMLTextAreaElement> & {
    label?: string;
    name: string;
    placeholder?: string;
    button?: {label: string, name: string, children: React.ReactNode};
    containerClassName?: string;
    inputClassName?: string;
    
}

// eslint-disable-next-line react/display-name
export const Textarea = forwardRef(({label, name, button, placeholder, inputClassName, containerClassName, ...rest}: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    return (
      <div className={`${containerClassName}`}>
        {label && <label className="block text-sm font-medium text-gray-700" htmlFor={name}>{label}</label>}

        <div className={`mt-1 relative rounded-md ${containerClassName}`}>
          {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div> */}
          <textarea
            name={name}
            id={name}
            className={`focus:ring-green-600 focus:border-green-600 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md ${inputClassName}`}
            placeholder={placeholder}
            {...rest}
            ref={ref}
          />
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