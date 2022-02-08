import { TestEntityMap } from "./types"

let test_args = {
  event_id: '238083523227'
}

const ents_tests: TestEntityMap = {
  event: {
    load: {
      args: {
        event_id: test_args.event_id,
      },
      expectations: {
        id: {
          sameAs: test_args.event_id,
        },
      },
    },
    save: {
      changes: {
        description: {
          html: '74a46e44d0cb9bcb5f8b'
        },
      },
      expectations: {
        id: {
          sameAs: test_args.event_id,
        },
        description: {
          toMatchObject: {
            text: '74a46e44d0cb9bcb5f8b',
            html: '74a46e44d0cb9bcb5f8b'
          },
        },
      },
    },
  },
}

export { ents_tests }
