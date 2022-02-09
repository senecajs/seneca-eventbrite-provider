import { rest } from "msw"
import { setupServer } from "msw/node"

/**
 * Set mock at transport layer level
 * @param ent_mocks
 * @returns
 */
function set_mock_worker(ents_mocks: any) {
  const rest_handlers_arr = []

  for(const [ent, http_methods] of Object.entries(ents_mocks)) {
    for(const [method, details] of Object.entries(http_methods)) {
      rest_handlers_arr.push(rest_handler(rest[method], details))
    }
  }

  const worker = setupServer(...rest_handlers_arr)

  return worker
}

function rest_handler(cb: CallableFunction, mock: any) {
  return cb("https://www.eventbriteapi.com/v3" + mock.url, (req, res, ctx) => {
    return res(ctx.json(mock.mock_data))
  })
}

export { set_mock_worker }
