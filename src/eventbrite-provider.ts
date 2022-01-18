/* Copyright © 2021 Seneca Project Contributors, MIT License. */

import Eventbrite from 'eventbrite'
import { Sdk } from 'eventbrite/lib/types'
import { cmd_handlers } from './cmd-handlers'
import { entities as ent_map } from './entities'
import { request } from './helpers'

type EventbriteProviderOptions = {}


function EventbriteProvider(this: any, options: any) {
  const seneca: any = this

  let API_KEY = ''

  let eventbrite: Sdk

  seneca
    .message('role:entity,cmd:load,zone:provider,base:eventbrite,name:event', loadEvent)
    .message('role:entity,cmd:save,zone:provider,base:eventbrite,name:event', saveEvent)

  function add_actions() {
    Object.keys(ent_map).forEach((ent_name) => {
      const commands = ent_map[ent_name].commands

      commands.forEach((command_details: any) => {
        const common = { zone: "provider", base: "eventbrite", role: "entity" }
        const cmd_name = command_details.cmd

        const pattern = {
          name: ent_name,
          cmd: cmd_name,
          ...common,
        }

        const initialized_req_handler = init_handler(command_details.path)

        const cmd_handler = cmd_handlers(
          initialized_req_handler,
          command_details.body_args,
          command_details.include,
          command_details.query_params
        )

        seneca.message(pattern, cmd_handler)
      })
    })
  }

  function init_handler(path: string) {
    return (path_args: Record<string,any>) => {
      path = build_path(path, path_args)
      const make_request = request(eventbrite.request, path)
      return make_request
    }
  }

  function build_path(path: string, args: Record<string,any>) {
    //match parameters after colon (:) in the path entity path
    const matches_obj = path.matchAll(new RegExp(/:(.[^\/]+)/g))
    const matches_arr = [...matches_obj]

    matches_arr.forEach((match) => {
      const url_placeholder = match[0]
      const url_placeholder_name = match[1]

      if (!args[url_placeholder_name]) {
        throw new Error(
          "Missing argument for the placeholder " + url_placeholder
        )
      }

      path = path.replace(url_placeholder, args[url_placeholder_name])
    })

    return path
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

    add_actions()
  })


  async function loadEvent(this: any, msg: any) {
    const q: any = msg.q
    const eventID: string = q.id

    try {
      const event: any = await eventbrite.request(`/events/${eventID}`)
      const ent = this.make$('provider/eventbrite/event').data$(event)
      return ent
    }
    catch (e: any) {
      // TODO: better error description
      throw new Error('Eventbrite Error: ' + JSON.stringify(e.parsedError))
    }
  }


  async function saveEvent(this: any, msg: any) {
    const ent: any = msg.ent
    const eventID: string = ent.id

    const body = JSON.stringify({
      event: {
        description: {
          html: ent.summary,
        },
      },
    })

    // Missing a slash at the end of the URL cause the Fetch API to not handle POST requests correctly.
    const event: any = await eventbrite.request(`/events/${eventID}/`, {
      method: 'POST',
      body,
    })

    const out = this.make$('provider/eventbrite/event').data$(event)

    console.log('SAVE', out)

    return out
  }
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
