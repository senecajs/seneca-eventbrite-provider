/* Copyright © 2021 Seneca Project Contributors, MIT License. */

import Eventbrite from 'eventbrite'
import { Sdk } from 'eventbrite/lib/types'
import { entities } from './entities'
import { make_actions } from './make-actions'
import { make_request } from './make-request'
import { ActionData, EntityMap } from './types'

type EventbriteProviderOptions = {}


function EventbriteProvider(this: any, options: any) {
  const seneca: any = this

  let API_KEY = ''

  let eventbrite: Sdk

  add_actions()

  function add_actions() {
    const actions = prepare_actions(entities)

    for (const action of actions) {
      switch (action.pattern.cmd) {
        case 'load':
          seneca.message(action.pattern, make_load(action))
          break
      
        case 'save':
          seneca.message(action.pattern, make_save(action))
          break
      }
    }

  }

  function make_load(action: ActionData) {
    return make_actions(action)['load']
  }

  function make_save(action: ActionData) {
    return make_actions(action)['save']
  }


  // prepare links replacing placeholders
  function prepare_actions(entities: EntityMap): ActionData[] {
    const actions_details: ActionData[] = []

    for(const [ent_name, ent_details] of Object.entries(entities)) {
      ent_details.name = ent_name

      for(const [action_name, action_data] of Object.entries(ent_details.actions)) {

        const pattern = {
          name: ent_name,
          cmd: action_name,
          zone: 'provider',
          base: 'eventbrite',
          role: 'entity',
        }

        actions_details.push({
          pattern,
          req_fn: prepare_req_fn(action_data.request.method),
          ...action_data
        })
      }

    }
    return actions_details
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
