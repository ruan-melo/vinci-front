import { ForwardedRef, forwardRef } from "react";

type  TextareaProps = React.HTMLProps<HTMLTextAreaElement> & {
    label?: string;
    name: string;
    placeholder?: string;
    button?: {label: string, name: string, children: React.ReactNode};
    icon?: React.ReactNode;
    containerClassName?: string;
    inputClassName?: string;
    
}

// eslint-disable-next-line react/display-name
export const Textarea = forwardRef(({label, icon,name, button, placeholder, inputClassName, containerClassName, ...rest}: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    return (
      <div className='relative' >
        {label && <label className="block text-sm font-medium text-gray-700" htmlFor={name}>{label}</label>}

        <div className={`h-full relative rounded-md ${containerClassName ? containerClassName: ''}`}>
          {icon && <div className="absolute h-full inset-y-0 left-0 flex items-center pl-3 ">{icon}</div>}
         
          <textarea
            name={name}
            id={name}
            className={`textarea  sm:text-sm rounded-md ${inputClassName}`}
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