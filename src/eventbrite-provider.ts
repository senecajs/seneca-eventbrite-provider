/* Copyright © 2021 Seneca Project Contributors, MIT License. */

import Eventbrite from 'eventbrite'
import { Sdk } from 'eventbrite/lib/types'

type EventbriteProviderOptions = {}


function EventbriteProvider(this: any, options: any) {
  const seneca: any = this

  let API_KEY = ''

  let eventbrite: Sdk

  seneca
    .message('role:entity,cmd:save,zone:provider,base:eventbrite,name:event', saveEvent)


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
