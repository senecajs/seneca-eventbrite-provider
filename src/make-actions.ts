import { ActionData, Context } from "./types"
import { perform_tasks } from "./utils"

function make_actions(action_data: ActionData) {
  const { req_fn, details } = action_data
  const { request, after, before } = details
  const { path } = request

  async function load(this:any, msg:any) {
    const { q } = msg

    const context: Context = {
      query: q,
    }

    if(before) {
      perform_tasks(before, context)
    }

    const built_path = build_uri(path, q)

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
    const { q, ent } = msg
    let body: Record<string, any> = {}

    const built_path = build_uri(path, ent)
    
    if(action_data.details.request.body) {
      body = fill_body(action_data.details.request.body, ent)
    }

    let context: Context = {
      query: q,
      inent: ent,
      req: body
    }

    if(before) {
      context = perform_tasks(before, context)
    }

    const res =  await req_fn(built_path, {
      body: JSON.stringify(context.req)
    })

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

  function fill_body(body_specs: Array<string> | Record<string, Array<string>>, entity: Record<string, any>) {
    let body: Record<string, any> = {}

    if(Array.isArray(body_specs)) {
      body_specs.forEach(attr => {
        body[attr] = entity[attr] 
      })

      return body
    }

    for(const [key, body_args] of Object.entries(body_specs)) {
      body[key] = {}
      body_args.forEach(attr => {
        body[key][attr] = entity[attr] 
      })  
    }

    return body
  }

  function build_uri(str: string, args: Record<string, any>) {
    let query = ''
    let [ uri_blueprint, query_blueprint ] = str.split('?')

    if(query_blueprint) {
      query = build_query(query_blueprint, args)
    }

    const uri = build_path(uri_blueprint, args)

    return query ? uri + '?' + query : uri
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

  function build_query(str: string, args: Record<string, any>) {
    const params = str.split('&')

    return params.map(p => {
      const param_name = p.split(":")[1]
      
      if(args[param_name]) {
        return p.replace(':' + param_name, args[param_name])        
      }
    }).filter(x => x !== undefined).join('&')
  }

  return {
    load,
    save
  }
}

export { make_actions }