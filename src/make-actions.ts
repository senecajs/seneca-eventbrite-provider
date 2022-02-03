import { ActionData } from "./types"

function make_actions(action_data: ActionData) {
  const { req_fn, request } = action_data
  const { path } = request

  async function load(this:any, msg:any) {
  } 

  async function save(this:any, msg:any) {

  }

  function build_path(path: string, args: Record<string, any>) {
    const placeholders = path
      .split("/")
      .filter(p => p.match(":(.[^/]*)"))
  
    placeholders.forEach(p => {
      const param_name = p.split(":")[1]
      path = path.replace(p, args[param_name] ?? p)
    })
  
    return path
  }

  return {
    load,
    save
  }
}

export { make_actions }