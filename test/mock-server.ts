import * as Http from 'http'

import { mocks } from './mocks'

type MockCall = {
  method?: string
  path: string
  body: any
}

type MockServer = {
  url: string | null
  calls: MockCall[]
  listen: () => Promise<void>
  close: () => Promise<void>
}

/**
 * A local stand-in for the Eventbrite v3 API, started by the test on an
 * ephemeral port of 127.0.0.1. It answers the requests of the mocks map
 * ({ entity: { get|post: { url, mock_data } } }) with their mock data, and
 * needs a bearer token, as Eventbrite does. Path parameters (:name) match
 * any segment; a trailing slash and the query string are ignored. Anything
 * else gets the Eventbrite NOT_FOUND error.
 */
function make_mock_server(ents_mocks: any, token: string): MockServer {
  const routes: { method: string, path: RegExp, mock_data: any }[] = []

  for (const http_methods of Object.values(ents_mocks)) {
    for (const [method, details] of Object.entries(http_methods as any)) {
      const { url, mock_data } = details as any
      const path = new RegExp('^' + trim(url).replace(/:[^/]+/g, '[^/]+') + '$')
      routes.push({ method: method.toUpperCase(), path, mock_data })
    }
  }

  const calls: MockCall[] = []

  const server = Http.createServer((req, res) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => {
      const path = new URL(req.url || '/', 'http://127.0.0.1').pathname
      const text = Buffer.concat(chunks).toString()
      const body = '' === text ? undefined : JSON.parse(text)

      // The token never reaches the record of calls.
      calls.push({ method: req.method, path, body })

      const send = (status: number, out: any) => {
        res.writeHead(status, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(out))
      }

      if (req.headers.authorization !== 'Bearer ' + token) {
        return send(401, {
          status_code: 401,
          error_description: 'An OAuth token is required for all requests',
          error: 'NO_AUTH',
        })
      }

      const route = routes.find((r) =>
        r.method === req.method && r.path.test(trim(path.replace(/^\/v3/, ''))))

      if (route) {
        return send(200, route.mock_data)
      }

      send(404, {
        status_code: 404,
        error_description: 'The path you requested does not exist.',
        error: 'NOT_FOUND',
      })
    })
  })

  const mock: MockServer = {
    url: null,
    calls,
    listen: () => new Promise<void>((resolve) => {
      server.listen(0, '127.0.0.1', () => {
        const port = (server.address() as { port: number }).port
        mock.url = `http://127.0.0.1:${port}/v3`
        resolve()
      })
    }),
    close: () => new Promise<void>((resolve) => {
      mock.url = null
      server.closeAllConnections()
      server.close(() => resolve())
    }),
  }

  return mock
}

function trim(path: string) {
  return path.replace(/\/$/, '')
}


// The tests never call the Eventbrite API. Every request goes to this local
// mock of the Eventbrite v3 API, which answers with the data in
// test/mocks.ts. The plugin has no option for the API host, so the test
// adds the baseUrl option of the eventbrite SDK to the client that the
// plugin creates. The wrapper throws before any request if the mock is not
// running. Import this module before the plugin.
const MOCK_TOKEN = 'test-token'

const mockApi = make_mock_server(mocks, MOCK_TOKEN)
const mockClients: any[] = []

jest.mock('eventbrite', () => {
  const actual = jest.requireActual('eventbrite')
  return {
    __esModule: true,
    ...actual,
    default: (config: any = {}) => {
      if (null == mockApi.url) {
        throw new Error('eventbrite SDK: the mock API is not running')
      }
      const client = actual.default({ ...config, baseUrl: mockApi.url })
      mockClients.push(client)
      return client
    },
  }
})

export { make_mock_server, mockApi, mockClients, MOCK_TOKEN }
