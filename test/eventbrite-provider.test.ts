/* Copyright © 2021 Seneca Project Contributors, MIT License. */


// https://www.eventbrite.com/manage/events/230866526997/details

import * as Fs from 'fs'
import crypto from 'crypto'

import EventbriteProvider from '../src/eventbrite-provider'

const Seneca = require('seneca')
const SenecaMsgTest = require('seneca-msg-test')
const EventbriteProviderMessages = require('./eventbrite-provider.messages').default

const CONFIG: any = {}

if (Fs.existsSync(__dirname + '/local-config.js')) {
  Object.assign(CONFIG, require(__dirname + '/local-config.js'))
}

jest.setTimeout(10000)

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
    if (CONFIG.key) {
      const seneca = Seneca({ legacy: false })
        .test()
        .use('promisify')
        .use('entity')
        .use('provider', providerOptions)
        .use(EventbriteProvider)

      const event = await seneca.entity('provider/eventbrite/event').load$('214728557897')

      expect(event).toBeDefined()
      expect(event.id).toEqual('214728557897')
      expect(event).toHaveProperty('name')
      expect(event).toHaveProperty('description')
      expect(event.entity$).toEqual('provider/eventbrite/event')
    }
  })

  test('entity-save', async () => {
    if (CONFIG.key) {
      const seneca = Seneca({ legacy: false })
        .test()
        .use('promisify')
        .use('entity')
        .use('provider', providerOptions)
        .use(EventbriteProvider)

      // let event = await seneca.entity('provider/eventbrite/event').load$('228153231457')
      let event = await seneca.entity('provider/eventbrite/event').load$('230866526997')

      const randomBytes = crypto.randomBytes(12).toString('hex')

      event.summary = randomBytes
      event = await event.save$()

      expect(event.summary).toEqual(randomBytes)
      expect(event.entity$).toEqual('provider/eventbrite/event')

    }
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

