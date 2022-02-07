export async function make_request(reqFn: CallableFunction, path: string, method: string, op?: any) {
  try {

    if(op) {
      const res = await reqFn(path, {
        method,
        ...op
      })
      return res
    }

    const res = await reqFn(path)
    return res

  } catch (error: any) {
    console.log(error)
    // TODO: better error description
    throw new Error('Eventbrite Error: ' + JSON.stringify(error.parsedError))
  }
}