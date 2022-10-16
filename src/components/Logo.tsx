import Router from 'next/router'

interface LogoProps {
  className?: string
  link?: boolean
}

export const Logo = ({ className, link }: LogoProps) => {
  return (
    <h1
      className={`cursor-pointer text-center text-green-900 font-logo ${className}`}
      onClick={
        link
          ? () => {
              Router.push('/')
            }
          : undefined
      }
    >
      VINCI
    </h1>
  )
}
