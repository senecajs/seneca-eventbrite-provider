/* Copyright © 2021 Seneca Project Contributors, MIT License. */


// https://www.eventbrite.com/manage/events/230866526997/details

import * as Fs from 'fs'

import EventbriteProvider from '../src/eventbrite-provider'
import { entities } from '../src/entities'

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

  describe('entities-load', () => {
    if(!CONFIG.key) {
      return
    }
    for(const [ent_name, ent_data] of Object.entries(entities)) {
      test('load' + ent_name, async () => {
        const seneca = Seneca({ legacy: false })
        .test()
        .use('promisify')
        .use('entity')
        .use('provider', providerOptions)
        .use(EventbriteProvider)
  
        const ent = await seneca.entity('provider/eventbrite/' + ent_name).load$({
          event_id: 238083523227
        })

        expect(ent.entity$).toBe("provider/eventbrite/" + ent_name)
        expect(ent).toBeDefined()
      })
    }
  })

  describe('set', () => {
    test('can-set-attribute-to-target', () => {
      const tasks: Task[] = [
        { on: 'outent', field: 'full_name', set: { query: 'name' } },
        { on: 'req', field: 'number', set: { inent: 'attr_number' } },
        { on: 'query', field: 'foo', set: { res: 'bar' } },
      ]
  
      const context: Context = {
        query: {
          name: crypto.randomBytes(10).toString('hex'),
          foo: 'foo'
        },
        outent: {},
        inent: {
          attr_number: 5
        },
        req: {
          number: 2
        },
        res: {
          bar: 'bar'
        }
      }
  
      perform_tasks(tasks, context)
  
      expect(context.outent).toHaveProperty('full_name')
      expect(context.outent.full_name).toBe(context.query.name)
  
      expect(context.req).toHaveProperty('number')
      expect(context.req.number).toBe(context.inent.attr_number)
      
      expect(context.query).toHaveProperty('foo')
      expect(context.query.foo).toBe(context.res.bar)
    })
  
    test('throws-error-for-invalid-task', () => {
      const tasks = [
        { on: 'outent', field: 'full_name', foo: { query: 'name' } },
      ]
  
      const context: Context = {
        query: {
          name: crypto.randomBytes(10).toString('hex'),
        },
        outent: {},
      }
  
      try {
        perform_tasks(tasks as Task[], context);
      } catch (e) {
        expect(e.message).toBe("unable to find task of type foo");
      }    
    })
  
    test('throws-error-for-a-missing-source-obj', () => {
      const tasks = [
        { on: 'outent', field: 'full_name', set: {} },
      ]
  
      const context: Context = {
        query: {
          name: crypto.randomBytes(10).toString('hex'),
        },
        outent: {},
      }
  
      try {
        perform_tasks(tasks as Task[], context);
      } catch (e) {
        expect(e.message).toBe("A source object is required when setting a target");
      }    
    })
  })

})

