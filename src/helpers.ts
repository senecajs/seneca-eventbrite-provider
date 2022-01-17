function handle_request(request_action: CallableFunction, path: string) {
  return async (options?: Record<string, any>) => {
    try {
      if (options) {
        let out = await request_action(path, options)
        return out
      }
      let out = await request_action(path)
      return out
    } catch (e: any) {
      console.log(e)
      // TODO: better error description
      throw new Error("Eventbrite Error: " + JSON.stringify(e.parsedError))
    }
  }
}

export { handle_request }
