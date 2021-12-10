/* Copyright © 2021 Seneca Open Source, MIT License. */


type EventbriteProviderOptions = {}


function EventbriteProvider(this: any, options: any) {
  const seneca: any = this

  let API_KEY = ''


  // seneca.message('role:entity,cmd:load')



  seneca.prepare(async function(this: any) {
    let out = await this.post('sys:provider,get:key,provider:eventbrite,key:api')
    if (out.ok) {
      API_KEY = out.value
    }
    else {
      this.fail('api-key-missing')
    }
  })


}


// Default options.
const defaults: EventbriteProviderOptions = {
}


Object.assign(EventbriteProvider, { defaults })

export default EventbriteProvider

if ('undefined' !== typeof (module)) {
  module.exports = EventbriteProvider
}
