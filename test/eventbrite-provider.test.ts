/* Copyright © 2021 Seneca Project Contributors, MIT License. */


// https://www.eventbrite.com/manage/events/230866526997/details

import * as Fs from 'fs'
import crypto from 'crypto'

import EventbriteProvider from '../src/eventbrite-provider'
import { perform_tasks } from '../src/utils'
import { Context, DelTask, SetTask, Task } from '../src/types'
import { ents_tests } from './ents-tests'
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

// Separate entities details by their command type
const loads = {}
const saves = {}

Object.keys(ents_tests).forEach(ent_name => {
  const actions = ents_tests[ent_name]
  
  Object.keys(actions).forEach(action_name => {
    if(action_name === 'load') {
      loads[ent_name] = actions
    }
    if(action_name === 'save') {
      saves[ent_name] = actions
    }
  })
})

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

  describe("entities-load", () => {
    Object.keys(loads).forEach(ent_name => {
      let test_data = loads[ent_name]
  
      test(`load-${ent_name}` , async () => {
        const seneca = Seneca({ legacy: false })
          .test()
          .use("promisify")
          .use("entity")
          .use("provider", providerOptions)
          .use(EventbriteProvider)

        const load_test_data = test_data.load
        let res_data = await seneca.entity("provider/eventbrite/" + ent_name).load$(load_test_data.args)
  
        expect(res_data.entity$).toBe("provider/eventbrite/" + ent_name)

        const expectations = load_test_data.expectations
  
        if(expectations) {
          assert(expectations, res_data)
        } else {
          expect(res_data.id).toBeDefined()
        }
      })
    })
  })

  describe("entities-save", () => {
    Object.keys(saves).forEach(ent_name => {
      let test_data = saves[ent_name]
  
      test(`save-${ent_name}` , async () => {
        const seneca = Seneca({ legacy: false })
          .test()
          .use("promisify")
          .use("entity")
          .use("provider", providerOptions)
          .use(EventbriteProvider)
  
        const load_test_data = loads[ent_name].load
        const save_test_data = test_data.save
  
        let entity = await seneca.entity("provider/eventbrite/" + ent_name).load$(load_test_data.args)
  
        expect(entity.entity$).toBe("provider/eventbrite/" + ent_name)
  
        // Apply changes and save
        const changes = save_test_data.changes
        Object.keys(changes).forEach(change => {
          entity[change] = changes[change]
        })
        entity = await entity.save$(save_test_data.args)
  
        // Assertions
        const expectations = save_test_data.expectations
        expectations
          ? assert(expectations, entity)
          : expect(entity.id).toBeDefined() // check for a ID when no expectations were set
      })
    })
  })

  describe('del', () => {
    test('can-del-attribute-from-target', () => {
      const tasks: DelTask[] = [
        { on: 'outent', del: 'name' },
        { on: 'req', del: 'attr_number' },
        { on: 'query', del: 'name' },
        { on: 'inent', del: 'attr' },
        { on: 'res', del: 'bar' },
      ]

      const context: Context = {
        query: {
          name: crypto.randomBytes(10).toString('hex'),
          bar: 'bar'
        },
        outent: {
          name: 'baz'
        },
        inent: {
          attr: 5
        },
        req: {
          attr_number: 2
        },
        res: {
          bar: 'bar'
        }
      }

      perform_tasks(tasks, context)

      expect(context.outent.name).toBeUndefined()
      expect(context.req.attr_number).toBeUndefined()
      expect(context.query.name).toBeUndefined()
      expect(context.inent.attr).toBeUndefined()
      expect(context.res.bar).toBeUndefined()

      expect(context.query.bar).toBeDefined()

    })
  })

  describe('set', () => {
    test('can-set-attribute-to-target', () => {
      const tasks: SetTask[] = [
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

  function assert(expectations: any, against: any) {
    for(const [field, field_assertions] of Object.entries(expectations)) {
      for( const [assertion, data] of Object.entries(field_assertions)) {
        switch (assertion) {
          case 'sameAs':
            expect(against[field]).toBe(data)
            break
          case 'toMatchObject':
            expect(against[field]).toMatchObject(data)
            break
        }
      }
    }
  }

})

