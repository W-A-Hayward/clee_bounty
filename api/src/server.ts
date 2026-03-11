// TODO: Fix server.ts - handleRequest import
// Steps needed:
// 1. Ensure app.ts exports handleRequest function (see app.ts TODO)
// 2. Alternatively, import app directly and use app(request, response) instead
// 3. Consider adding graceful shutdown for database connections (Prisma disconnect)
// 4. Consider adding health check endpoint before starting server

import { createServer } from 'node:http'
import { env } from './config/env.ts'
import { handleRequest } from './app.ts'

const server = createServer((request, response) => {
  void handleRequest(request, response)
})

server.on('error', (error) => {
  if ('code' in error && error.code === 'EADDRINUSE') {
    console.error(`[api] Port ${env.port} is already in use.`)
    process.exit(1)
  }

  console.error('[api] Server failed to start.', error)
  process.exit(1)
})

server.listen(env.port, env.host, () => {
  console.log(`[api] listening on ${env.displayUrl}`)
})

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.once(signal, () => {
    console.log(`[api] received ${signal}, shutting down`)
    server.close((error) => {
      if (error) {
        console.error('[api] shutdown error', error)
        process.exit(1)
      }

      process.exit(0)
    })
  })
}
