import { type ReactNode } from 'react'

const ExternalLink = ({
  children,
  to,
}: {
  children: ReactNode
  to: string
}) => {
  return (
    <a
      className="text-blue-600 underline transition duration-300 ease-in-out hover:text-blue-800 hover:no-underline focus:text-blue-800 focus:no-underline active:text-blue-900 active:no-underline"
      target="_blank"
      href={to}
      rel="noreferrer"
    >
      {children}
    </a>
  )
}

export default ExternalLink
