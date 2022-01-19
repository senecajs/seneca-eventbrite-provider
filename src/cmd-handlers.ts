function cmd_handlers(initialized_req_handler: CallableFunction, body_specs: Record<string, string> = {}, include?: string[], query_params?: Record<string, any>) {
  async function handler(this:any, msg: any) {
    let request_body: any = {}
    let source: any
    let args: Record<string, any>
    let path_args: Record<string, any>
    let method

    switch (msg.cmd) {
      case 'load':
        method = 'get'
        source = {...msg.q}
        args = {}
        path_args = source
        break
      case 'save':
        method = 'post'
        source = {...msg.ent}
        args = {...msg.q}
        path_args = {...source, ...args}
        break
    
      default:
        throw new Error('Unknown command : ' + msg.cmd)
    }

    const request = initialized_req_handler(path_args)

    let data_sources: Record<string, Record<string,any>> = {
      ent: source,
      args
    }

    request_body = build_body_recursively(body_specs, data_sources, request_body)

    const options = {
      method,
      body: JSON.stringify(request_body)
    } 

    let res = await request(options)

    // TODO : handle inventory_tier return case better
    if(Object.keys(res).length == 1 && Object.keys(res)[0] === 'inventory_tier') {
      res = Object.keys(res).map(k => res[k])[0]
    }

    if (include) {
      include.forEach((item) => {
        if (item.indexOf(' as ') !== -1) {
          const [attr, new_attr_name] = item
            .split(' as ')
            .map((item) => item.trim())
          res[new_attr_name] = source[attr]
        } else {
          res[item] = source[item]
        }
      })
    }

    return this.make$(msg.ent.entity$).data$(res)
  }

  function build_body_recursively(body_specs: any, data_sources: any, request_body: any) {
    Object.keys(body_specs).forEach(body_arg_key => {
      const body_attr_spec = body_specs[body_arg_key]

      if(typeof body_attr_spec === 'object' ) {
        const recursive_body = {}
        const data = build_body_recursively(body_attr_spec, data_sources, recursive_body)
        request_body[body_arg_key] = data
        return
      }

      const patterns = body_attr_spec.split('.')

      const data_source = patterns.splice(0, 1)
      const attrs = patterns.splice(0)

      const data_source_name = data_source[0].replace(':', '')

      if(!data_source_name) {
        throw new Error('Unknown data_source ' + data_source_name)
      }

      const from = data_sources[data_source_name]
      const data = set_attributes(attrs, from)

      request_body[body_arg_key] = data
    })
    return request_body
  }

  function set_attributes(attributes: Array<string>, data_source: Record<string,any>) {
    const data = attributes.reduce((previous: Record<string, any>, current: any, index, arr) => {
      if(!current || !previous) {
        return {}
      }
      return previous[current]
    }, data_source)
    
    return data
  }

  return handler
}

export { cmd_handlers }
