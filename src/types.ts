type EntityMap = {
    [name: string]: EntDetails
}

type Actions = "load" | "save"

type ReqDetails = {
  method: string
  path: string
  body?: Record<string, Array<string>>
}

type Task = {
  on: keyof Context
}
interface SetTask extends Task {
  field: string
  set: {[key in keyof Context]: string}
}

type Context = {
  outent?: any
  inent?: any
  req?: any
  res?: any
  query?: any
}

type ActionDetails = {
  request: ReqDetails
  after?: Task[]
  before?: Task[]
}

type EntDetails = {
  name?: string
  actions: {
    [action in Actions]?: ActionDetails
  }
}

type TasksTypesFn = {
  set: (task: SetTask, context: Context) => void
}

interface ActionData extends ActionDetails {
  pattern: Record<string,string>
  req_fn: (path:string, options?: Record<any,string>) => Promise<any>
}

export type { EntityMap, EntDetails, ActionData, Task, Context, TasksTypesFn, SetTask }