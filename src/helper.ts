function handle_request(request_action: CallableFunction, path: string) {
  return async(options?: Record<string, any>) => {
    try {
      console.log(path)
      if (options) {
        let out = await request_action(path, options)
        return out
      }
      let out = await request_action(path)
      return out
    } catch (e: any) {
      // TODO: better error description
      throw new Error('Eventbrite Error: ' + JSON.stringify(e.parsedError))
    }
  }
}

function build_query_str(parameters: Record<string, any>): String {
  if(!parameters) {return ''} // if object has no attributes

  return '?' + 
  Object.keys(parameters)
  .map((param) => param + '=' + `${parameters[param]}`)
  .join('&')
}

export { handle_request, build_query_str }
