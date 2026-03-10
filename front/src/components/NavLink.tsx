import type { AnchorHTMLAttributes } from 'react'
import { isRouteActive, routeHref } from '../lib/hashRouter'

type NavLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  currentPath: string
  label: string
  to: string
  exact?: boolean
}

function NavLink({ className = '', currentPath, label, to, exact = false, ...props }: NavLinkProps) {
  const isActive = isRouteActive(currentPath, to, exact)

  return (
    <a
      {...props}
      className={`${className}${isActive ? ' is-active' : ''}`.trim()}
      href={routeHref(to)}
    >
      {label}
    </a>
  )
}

export default NavLink
