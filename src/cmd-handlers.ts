function cmd_handlers(initialized_req_handler: CallableFunction, body_args: Array<string> = [], include?: string[], query_params?: Record<string, any>) {
  async function handler(this:any, msg: any) {
    let body: any = {}
    let source: any
    let aditional_args
    let path_args
    let method

    switch (msg.cmd) {
      case 'load':
        method = 'get'
        source = {...msg.q}
        aditional_args = {}
        path_args = source
        break
      case 'save':
        method = 'post'
        source = {...msg.ent}
        aditional_args = {...msg.q}
        path_args = {...source, ...aditional_args}
        break
    
      default:
        throw new Error('Unknown command : ' + msg.cmd)
    }

    const request = initialized_req_handler(path_args)

    body_args.forEach(body_arg => {
      body[body_arg] = source[body_arg] 
    })    
    body = {...body, ...aditional_args}

    const options = {
      method,
      body: JSON.stringify({
        event: body
      })
    } 

    let res = await request(options)

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
