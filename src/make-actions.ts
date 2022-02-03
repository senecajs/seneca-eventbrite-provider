import { ActionData } from "./types"

function make_actions(action_data: ActionData) {
  const { req_fn, request, after, before } = action_data
  const { path, body_spec } = request

  async function load(this:any, msg:any) {
  } 

  async function save(this:any, msg:any) {

  }

  return {
    load,
    save
  }
}

export { make_actions }