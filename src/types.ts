type EntityMap = {
    [name: string]: EntDetails
}

type Actions = "load" | "save"

type ReqDetails = {
  method: string
  path: string
  body?: Array<string> | Record<string, Array<string>>
}

type TasksTypes = SetTask | DelTask

type Task = {
  on: keyof Context
}

interface SetTask extends Task {
  field: string
  set: {[key in keyof Context]: string}
}
interface DelTask extends Task {
  del: string
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
  after?: TasksTypes[]
  before?: TasksTypes[]
}

type EntDetails = {
  name?: string
  actions: {
    [action in Actions]?: ActionDetails
  }
}

type TasksTypesFn = {
  set: (task: SetTask, context: Context) => void
  del: (task: DelTask, context: Context) => void
}

type ActionData = {
  pattern: Record<string,string>
  details: ActionDetails
  req_fn: (path:string, options?: Record<any,string>) => Promise<any>
}

type EntData = {
  [key in Actions]: ActionData
}

export type { Actions, EntityMap, EntDetails, ActionData, Task, Context, TasksTypesFn, SetTask, DelTask, EntData }