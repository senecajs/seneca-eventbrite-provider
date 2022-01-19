import crypto from 'crypto'

const test_args = {
  event_id: '238083523227', //238083523227 251037679457
  inventory_tier: '11195969',
  discount_id: '609282579',
  category_id: '101',
}

const rand = crypto.randomBytes(10).toString('hex')

const entities: any = {
  event: {
    fields: [],
    commands: [
      {
        cmd: "load",
        method: "get",
        path: "/events/:event_id/",
        include: ['event_id'],
      },
      {
        cmd: "save",
        method: "post",
        path: "/events/:event_id/",
        include: ['event_id'],
        body_args: {
            name: {
              html: ':ent.name.html',
            },
            description: {
              html: ':ent.description.html',
            },
            start: {
              timezone: ':ent.start.timezone',
              utc: ':ent.start.utc',
            },
            end: {
              timezone: ':ent.end.timezone',
              utc: ':ent.end.utc',
            },
            currency: ':ent.currency',
            online_event: ':ent.online_event',
            organizer_id:':ent.organizer_id',
            listed: ':ent.listed',
            shareable: ':ent.shareable',
            invite_only: ':ent.invite_only',
            show_remaining: ':ent.show_remaining',
            password: ':ent.password',
            capacity: ':ent.capacity',
            is_reserved_seating: ':ent.is_reserved_seating',
            is_series: ':ent.is_series',
            show_pick_a_seat: ':ent.show_pick_a_seat',
            show_seatmap_thumbnail: ':ent.show_seatmap_thumbnail',
            show_colors_in_seatmap_thumbnail:':ent.show_colors_in_seatmap_thumbnail',
        }
      }
    ],
    tests: {
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
            html: rand
          }
        },
        expectations: {
          id: {
            sameAs: test_args.event_id,
          },
        },
      },
    },
  },
  category: {
    fields: [],
    commands: [
      {
        cmd: "load",
        method: "get",
        path: "/categories/:category_id/",
        include: [],
      },
    ],
    tests: {
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
  },
  discount: {
    fields: [],
    commands: [
      {
        cmd: "load",
        method: "get",
        path: "/discounts/:discount_id/",
        include: ['discount_id'],
      },
      {
        cmd: "save",
        method: "post",
        path: "/discounts/:discount_id/",
        include: ['discount_id'],
        body_args: {
          discount: {
            type: ':ent.type',
            code: ':ent.code',
            amount_off: ':ent.amount_off',
            percent_off: ':ent.percent_off',
            event_id: ':ent.event_id',
            ticket_class_ids: ':ent.ticket_class_ids',
            quantity_available: ':ent.quantity_available',
            start_date: ':ent.start_date',
            start_date_relative: ':ent.start_date_relative',
            end_date: ':ent.end_date',
            end_date_relative: ':ent.end_date_relative',
            ticket_group_id: ':ent.ticket_group_id',
            hold_ids: ':ent.hold_ids',
          }
        }      
      },
    ],
    tests: {
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
          code: rand,
        },
        expectations: {
          id: {
            sameAs: test_args.discount_id,
          },
        },
      },
    },
  },
  inventory_tier: {
    fields: [],
    commands: [
      {
        cmd: "load",
        method: "get",
        path: "/events/:event_id/inventory_tiers/:inventory_tier",
        include: ['inventory_tier'],
      },
      {
        cmd: "save",
        method: "post",
        path: "/events/:event_id/inventory_tiers/:inventory_tier/",
        include: ['inventory_tier'],
        body_args: {
          inventory_tier: {
            name: ':ent.name',
            sort_order: ':ent.sort_order',
            color: ':ent.color',
            quantity_total: ':ent.quantity_total',
            image_id: ':ent.image_id',
            capacity_total: ':ent.capacity_total',
            holds: ':ent.holds',
          }
        }      
      },
    ],
    tests: {
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
          name: rand,
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
  },
}

export { entities }
