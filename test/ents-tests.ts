import { TestEntityMap } from "./types"

const test_args = {
  event_id: '238083523227', //238083523227 251037679457
  inventory_tier: '11195969',
  discount_id: '609282579',
  category_id: '101',
  team_id: '1234',
  attendee_id: '1234',
  organization_id: '39198188963 ',
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
  category: {
    load: {
      args: {
        category_id: test_args.category_id,
      },
      expectations: {
        id: {
          sameAs: test_args.category_id,
        },
      },
    },
  },
  discount: {
    load: {
      args: {
        discount_id: test_args.discount_id,
      },
      expectations: {
        id: {
          sameAs: test_args.discount_id,
        },
      },
    },
    save: {
      changes: {
        code: 'democode',
      },
      expectations: {
        id: {
          sameAs: test_args.discount_id,
        },
        code: {
          sameAs: 'democode'
        }
      },
    },
  },
  inventory_tier: {
    load: {
      args: {
        event_id: test_args.event_id,
        inventory_tier: test_args.inventory_tier
      },
      expectations: {
        id: {
          sameAs: test_args.inventory_tier,
        },
        event_id: {
          sameAs: test_args.event_id,
        },
      },
    },
    save: {
      changes: {
        name: 'random',
      },
      expectations: {
        id: {
          sameAs: test_args.inventory_tier,
        },
        event_id: {
          sameAs: test_args.event_id,
        },
      },
    },
  },
  event_team: {
    load: {
      args: {
        event_id: test_args.event_id,
        team_id: test_args.team_id,
      },
      expectations: {
        id: {
          sameAs: test_args.team_id,
        },
        event_id: {
          sameAs: test_args.event_id,
        },
      },
    },
  },
  attendee: {
    load: {
      args: {
        event_id: test_args.event_id,
        attendee_id: test_args.attendee_id,
      },
      expectations: {
        id: {
          sameAs: test_args.attendee_id,
        },
        event_id: {
          sameAs: test_args.event_id,
        },
      },
    },
  }
}

export { ents_tests }
