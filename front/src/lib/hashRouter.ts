import { useEffect, useState } from 'react'

export function normalizeHashPath(rawHash: string) {
  const trimmed = rawHash.replace(/^#/, '')

  if (!trimmed) {
    return '/'
  }

  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
}

export function routeHref(path: string) {
  return `#${path}`
}

export function useHashPath() {
  const [path, setPath] = useState(() =>
    typeof window === 'undefined' ? '/' : normalizeHashPath(window.location.hash),
  )

  useEffect(() => {
    const syncPath = () => {
      setPath(normalizeHashPath(window.location.hash))
      window.scrollTo({ top: 0 })
    }

    if (!window.location.hash) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#/`)
    }

    window.addEventListener('hashchange', syncPath)

    return () => {
      window.removeEventListener('hashchange', syncPath)
    }
  }, [])

  return path
}

export function isRouteActive(currentPath: string, targetPath: string, exact = false) {
  if (exact) {
    return currentPath === targetPath
  }

  return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`)
}
