import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import React from 'react'

type LinkProps = NextLinkProps & { children: React.ReactNode }

export const Link = ({ href, children }: LinkProps) => {
  return (
    <NextLink href={href}>
      <a className="transition-all duration-200 text-green-600 hover:text-green-900">
        {children}
      </a>
    </NextLink>
  )
}
