/* Copyright © 2021 Seneca Project Contributors, MIT License. */

import Eventbrite from 'eventbrite'
import { Sdk } from 'eventbrite/lib/types'

type EventbriteProviderOptions = {}


function EventbriteProvider(this: any, options: any) {
  const seneca: any = this

  let API_KEY = ''

  let eventbrite: Sdk

  seneca
    .message('role:entity,cmd:load,base:eventbrite,name:event', loadEvent)


  seneca.prepare(async function(this: any) {
    let out = await this.post('sys:provider,get:key,provider:eventbrite,key:api')
    if (out.ok) {
      API_KEY = out.value
      eventbrite = Eventbrite({token: API_KEY})
    }
    else {
      this.fail('api-key-missing')
    }
  })

  async function loadEvent(this: any, msg: any) {
    const q: any = msg.q
    const eventID: string = q.id

    const event: any = await eventbrite.request(`/events/${eventID}`)

    return this.make$('eventbrite/event').data$(event)
  }
}


// Default options.
const defaults: EventbriteProviderOptions = {
}


Object.assign(EventbriteProvider, { defaults })

export default EventbriteProvider

if ('undefined' !== typeof (module)) {
  module.exports = EventbriteProvider
}
