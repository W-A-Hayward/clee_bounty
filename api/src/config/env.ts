import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

export type AllowedOrigin = '*' | string[]

const envFile = fileURLToPath(new URL('../../.env', import.meta.url))

if (existsSync(envFile)) {
  process.loadEnvFile(envFile)
}

const port = Number.parseInt(process.env.PORT ?? '4000', 10)

if (!Number.isInteger(port) || port <= 0) {
  throw new Error(`Invalid PORT value: ${process.env.PORT ?? ''}`)
}

const host = process.env.HOST ?? '0.0.0.0'
const corsOrigin = parseAllowedOrigins(process.env.CORS_ORIGIN)
const displayHost = host === '0.0.0.0' ? 'localhost' : host

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  host,
  port,
  corsOrigin,
  dataFile: fileURLToPath(new URL('../../data/store.json', import.meta.url)),
  displayUrl: `http://${displayHost}:${port}`,
} as const

function parseAllowedOrigins(value: string | undefined): AllowedOrigin {
  if (!value || value.trim() === '' || value.trim() === '*') {
    return '*'
  }

  return value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
}
