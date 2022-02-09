/* Copyright © 2021 Seneca Project Contributors, MIT License. */

import Eventbrite from 'eventbrite'
import { Sdk } from 'eventbrite/lib/types'
import { entities } from './entities'
import { make_actions } from './make-actions'
import { make_request } from './make-request'
import { EntData, EntityMap } from './types'

type EventbriteProviderOptions = {}


function EventbriteProvider(this: any, options: any) {
  const seneca: any = this

  let API_KEY = ''

  let eventbrite: Sdk

  add_actions()

  function add_actions() {
    const ents = prepare_ents(entities)

    for(const ent of ents) {
      seneca.message(ent.load.pattern, (make_load(ent) || unknown_cmd))
      seneca.message(ent.save.pattern, (make_save(ent) || unknown_cmd))
    }
  }

  function make_load(ent: EntData) {
    if(!ent.load.details) return false
    return make_actions(ent.load).load
  }

  function make_save(ent: EntData) {
    if(!ent.save.details) return false
    return make_actions(ent.save).save
  }

  async function unknown_cmd(this: any, msg: any) {
    throw new Error(`undefined action: ${msg.cmd}, entity: ${msg.ent.entity$}`)
  }

  // prepare links replacing placeholders
  function prepare_ents(entities: EntityMap): EntData[] {
    const ents_datas: EntData[] = []

    for(const [ent_name, ent_details] of Object.entries(entities)) {
      ent_details.name = ent_name
      const ent_data: any = { load : {}, save: {} }

      const common = {zone:'provider', base:'eventbrite', role:'entity', name: ent_name}

      ent_data.load.pattern = {...common, cmd: 'load'}
      ent_data.save.pattern = {...common, cmd: 'save'}

      for(const [action_name, details] of Object.entries(ent_details.actions)) {
        Object.assign(ent_data[action_name], {
          details,
          req_fn: prepare_req_fn(details.request.method)
        })
      }

      ents_datas.push(ent_data)
    }

    return ents_datas
  }

  function prepare_req_fn(method: string) {
    return (path: string, options?: Record<string, any>) => {
      return make_request(eventbrite.request, path, method, options)
    }
  } 

  seneca.prepare(async function(this: any) {
    let out = await this.post('sys:provider,get:key,provider:eventbrite,key:api')
    if (out.ok) {
      API_KEY = out.value
      eventbrite = Eventbrite({ token: API_KEY })
    }
    else {
      this.fail('api-key-missing')
    }
  })
}


// Default options.
const defaults: EventbriteProviderOptions = {

  // TODO: Enable debug logging
  debug: false
}


Object.assign(EventbriteProvider, { defaults })

export default EventbriteProvider

if ('undefined' !== typeof (module)) {
  module.exports = EventbriteProvider
}
