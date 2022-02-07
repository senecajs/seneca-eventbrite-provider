import { ActionData } from "./types"
import { perform_tasks } from "./utils"

function make_actions(action_data: ActionData) {
  const { req_fn, request, after, before } = action_data
  const { path } = request

  async function load(this:any, msg:any) {
    const { q } = msg

    const context = {
      query: q,
    }

    if(before) {
      perform_tasks(before, context)
    }

    const built_path = build_path(path, q)

    const res =  await req_fn(built_path)

    const outent = this.make$(msg.ent.entity$).data$(res)

    if(after) {
      perform_tasks(after, {
        res,
        outent,
        ...context
      })
    }

    return outent
  } 

  async function save(this:any, msg:any) {

  }

  function build_path(path: string, args: Record<string, any>) {
    const placeholders = path
      .split("/")
      .filter(p => p.match(":(.[^/]*)")) // matches against sentences like :foo
  
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