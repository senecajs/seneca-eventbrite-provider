
import EventbriteProvider from '../src/eventbrite-provider'

const Seneca = require('seneca')
const SenecaMsgTest = require('seneca-msg-test')
const EventbriteProviderMessages = require('./eventbrite-provider.messages').default

const CONFIG = require('./local-config.js')


describe('eventbrite-provider', () => {

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

})

