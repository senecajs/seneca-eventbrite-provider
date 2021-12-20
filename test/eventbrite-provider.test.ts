/* Copyright © 2021 Seneca Project Contributors, MIT License. */

import * as Fs from 'fs'

import EventbriteProvider from '../src/eventbrite-provider'

const Seneca = require('seneca')
const SenecaMsgTest = require('seneca-msg-test')
const EventbriteProviderMessages = require('./eventbrite-provider.messages').default

const CONFIG: any = {}

if (Fs.existsSync('./local-config.js')) {
  Object.assign(CONFIG, require('./local-config.js'))
}

describe('eventbrite-provider', () => {

  let providerOptions = {
    provider: {
      eventbrite: {
        keys: {
          api: {
            value: CONFIG.key
          }
        }
      }
    }
  }

  test('happy', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('provider', {
        provider: {
          eventbrite: {
            keys: {
              api: {
                value: CONFIG.key
              }
            }
          }
        }
      })
      .use(EventbriteProvider)
    await seneca.ready()
  })

  test('entity-load', async () => {
    const seneca = Seneca({ legacy:false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', providerOptions)
      .use(EventbriteProvider)
      
    const event = await seneca.entity('eventbrite/event').load$('214728557897')
    expect(event).toBeDefined()
    expect(event.id).toEqual('214728557897')
    expect(event).toHaveProperty('name')
    expect(event).toHaveProperty('description')
  })

  test('messages', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('provider', {
        provider: {
          eventbrite: {
            keys: {
              api: {
                value: CONFIG.key
              }
            }
          }
        }
      })
      .use(EventbriteProvider)
    await (SenecaMsgTest(seneca, EventbriteProviderMessages)())
  })

})

