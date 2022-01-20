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

        let path = validate_path(command_details.path)

        const initialized_req_handler = init_handler(path)

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

  function validate_path(path: string) {
    if(!path) {
      throw new Error('path param is required')
    }

    const slash_at_beginning = /^(\/)/
    const slash_at_end = /(\/)$/

    const beg = slash_at_beginning.test(path)
    const end = slash_at_end.test(path) 

    if(!beg) path = '/' + path
    if(!end) path = path + '/'

    return path
  }

  function init_handler(path: string) {
    return (path_args: Record<string,any>) => {
      path = build_path(path, path_args)
      const make_request = request(eventbrite.request, path)
      return make_request
    }
  }

  function build_path(path: string, args: Record<string,any>) {
    //match placeholders between colon (:) and slash (/) in the url path of a entity
    const matches = path.match(new RegExp(/:(.[^\/]+)/g))

    if(!matches) {
      return path
    }

    matches.forEach((match) => {
      const placeholder = match
      const placeholder_name = match.replace(':', '')

      if (!args[placeholder_name]) {
        throw new Error(
          "Missing argument for the placeholder " + placeholder
        )
      }

      path = path.replace(placeholder, args[placeholder_name])
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
