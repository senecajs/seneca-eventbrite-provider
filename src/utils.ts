import { Context, DelTask, SetTask, Task, TasksTypesFn } from "./types"
import * as _ from 'lodash'

function perform_tasks(tasks: Task[], context: Context ) {
  tasks.forEach(task => {
    const { on, ...tasks } = task

    Object.keys(tasks).forEach(type => {
      const typeFn = tasksTypes[type as keyof TasksTypesFn]

      if(!typeFn) {
        throw new Error('unable to find task of type ' + type)
      }

      typeFn(task as DelTask & SetTask, context)
    })
  })

  return context
}

function set(task: SetTask, context: Context) {
  const source_name = Object.keys(task.set)[0]

  if(!source_name) {
    throw new Error('A source object is required when setting a target')
  }

  const target  = context[task.on]
  const target_field = task.field

  const source = context[source_name as keyof Context]
  const source_field: any = task.set[source_name as keyof Context]
  
  target[target_field] = source[source_field]
}

function del(task: DelTask, context: Context) {
  let target  = context[task.on]
  const field = task.del

  context[task.on] = _.omit(target, [field])
}

const tasksTypes: TasksTypesFn = {
  set,
  del
}

export { perform_tasks };

export type {
  Task
}
