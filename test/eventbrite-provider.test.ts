/* Copyright © 2021 Seneca Project Contributors, MIT License. */


// https://www.eventbrite.com/manage/events/230866526997/details

import * as Fs from 'fs'
import crypto from 'crypto'
import { entities as entities_map } from "../src/entities"
import EventbriteProvider from '../src/eventbrite-provider'
import { set_mock_worker } from './set-mock-worker'
import { mocks } from './mocks'

const Seneca = require('seneca')
const SenecaMsgTest = require('seneca-msg-test')
const EventbriteProviderMessages = require('./eventbrite-provider.messages').default

const CONFIG: any = {}

if (Fs.existsSync(__dirname + '/local-config.js')) {
  Object.assign(CONFIG, require(__dirname + '/local-config.js'))
}

jest.setTimeout(10000)

// Configure mock service worker
const worker = set_mock_worker(mocks)

beforeAll(() => worker.listen())
afterAll(() => worker.close())

describe('eventbrite-provider', () => {

// Separate entities details by their command type
const entities_load = {}
const entities_save = {}

Object.keys(entities_map).forEach(ent_name => {
  const entity = entities_map[ent_name]
  entity.commands.forEach(cmd => {
    if(cmd.cmd === 'load') {
      entities_load[ent_name] = entity
    }
    if(cmd.cmd === 'save') {
      entities_save[ent_name] = entity
    }
  })
})

// Set common structure between tests
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
      event = await event.save$();

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

  describe("eventbrite-entities-load", () => {
    Object.keys(entities_load).forEach(ent_name => {
      let entity = entities_map[ent_name]
      const full = "provider/eventbrite/" + ent_name
  
      test(`load-${ent_name}` , async () => {
        const seneca = Seneca({ legacy: false })
          .test()
          .use("promisify")
          .use("entity")
          .use("provider", providerOptions)
          .use(EventbriteProvider)
  
        const tests = entity.tests
  
        let res_data = await seneca.entity(full).load$(tests['load'].args)
  
        expect(res_data.entity$).toBe(full)
        
        const expectations = tests['load'].expectations
  
        if(expectations) {
          assert(expectations, res_data)
        } else {
          expect(res_data.id).toBeDefined()
        }
      })
    })
  })

  describe("eventbrite-entities-save", () => {
    Object.keys(entities_save).forEach(ent_name => {
      let entity_details = entities_map[ent_name]
      const full = "provider/eventbrite/" + ent_name
  
      test(`save-${ent_name}` , async () => {
        const seneca = Seneca({ legacy: false })
          .test()
          .use("promisify")
          .use("entity")
          .use("provider", providerOptions)
          .use(EventbriteProvider)
  
        const load_test = entity_details.tests['load']
        const save_test = entity_details.tests['save']
  
        let entity = await seneca.entity(full).load$(load_test.args)
  
        expect(entity.entity$).toBe(full)
  
        // Apply changes and save
        const changes = save_test.changes
        Object.keys(save_test.changes).forEach(change => {
          entity[change] = changes[change] 
        })
        entity = await entity.save$(save_test.args)
  
        // Assertions
        const expectations = save_test.expectations
        expectations
          ? assert(expectations, entity)
          : expect(entity.id).toBeDefined() // check for a ID when no expectations were set
      })
    })
  })

  function assert(expectations: any, against: any) {
    Object.keys(expectations).forEach(field_to_assert => {
      Object.keys(expectations[field_to_assert]).forEach(assertion => {
        switch (assertion) {
          case 'sameAs':                
            expect(against[field_to_assert]).toBe(expectations[field_to_assert]['sameAs'])
            break
  
          default:
            break
        }
      })
    })
  }

})

