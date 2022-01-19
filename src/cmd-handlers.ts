function cmd_handlers(initialized_req_handler: CallableFunction, body_args: Record<string, string> = {}, include?: string[], query_params?: Record<string, any>) {
  async function handler(this:any, msg: any) {
    let body: any = {}
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

    body = build_body_recursively(body_args, data_sources, body)

    const options = {
      method,
      body: JSON.stringify(body)
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

  function build_body_recursively(body_args: any, data_sources: any, body: any) {
    Object.keys(body_args).forEach(body_arg_key => {
      const pattern = body_args[body_arg_key]

      if(typeof pattern === 'object' ) {
        const recursive_body = {}
        const data = build_body_recursively(pattern, data_sources, recursive_body)
        body[body_arg_key] = data
        return
      }

      const patterns = pattern.split('.')

      const data_source = patterns.splice(0, 1)
      const attrs = patterns.splice(0)

      const data_source_name = data_source[0].replace(':', '')

      if(!data_source_name) {
        throw new Error('Unknown data_source ' + data_source_name)
      }

      const from = data_sources[data_source_name]
      const data = set_attributes(attrs, from)

      body[body_arg_key] = data
    })
    return body
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
