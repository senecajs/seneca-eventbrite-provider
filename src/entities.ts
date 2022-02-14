import { EntityMap } from './types';

const entities: EntityMap = {
  event: {
    actions: {
      load: {
        request: {
          method: 'get',
          path: '/events/:event_id/',
        },
        after: [
          { on: 'outent', field: 'event_id', set: { query: 'event_id' } },
        ],
      },
      save: {
        request: {
          method: 'post',
          path: '/events/:event_id/',
          body: {
            event: [
              'name',
              'description',
              'start',
              'end',
              'currency',
              'online_event',
              'organizer_id',
              'listed',
              'shareable',
              'invite_only',
              'show_remaining',
              'password',
              'capacity',
              'is_reserved_seating',
              'is_series',
              'show_pick_a_seat',
              'show_seatmap_thumbnail',
              'show_colors_in_seatmap_thumbnail',
            ],
          },
        },
        before: [
          { on: 'req', del: 'event.start.local' },
          { on: 'req', del: 'event.end.local' },
          { on: 'req', del: 'event.name.text' },
          { on: 'req', del: 'event.description.text' },
        ],
      },
    },
  },
  category: {
    actions: {
      load: {
        request: {
          method: 'get',
          path: '/categories/:category_id/',
        },
      },
    },
  },
  discount: {
    actions: {
      load: {
        request: {
          method: 'get',
          path: '/discounts/:discount_id/',
        },
        after: [
          { on: 'outent', field: 'discount_id', set: { query: 'discount_id' } },
        ],
      },
      save: {
        request: {
          method: 'post',
          path: '/discounts/:discount_id',
          body: {
            discount: [
              'type',
              'code',
              'amount_off',
              'percent_off',
              'event_id',
              'ticket_class_ids',
              'quantity_available',
              'start_date',
              'start_date_relative',
              'end_date',
              'end_date_relative',
              'ticket_group_id',
              'hold_ids',
            ],
          },
        },
        after: [
          { on: 'outent', field: 'discount_id', set: { inent: 'discount_id' } },
        ],
      },
    },
  },
  inventory_tier: {
    actions: {
      load: {
        request: {
          method: 'get',
          path: '/events/:event_id/inventory_tiers/:inventory_tier/',
        },
      },
      save: {
        request: {
          method: 'post',
          path: '/events/:event_id/inventory_tiers/:inventory_tier/',
          body: {
            inventory_tier: [
              'name',
              'sort_order',
              'color',
              'quantity_total',
              'image_id',
              'capacity_total',
              'holds',
            ],
          },
        },
      },
    },
  },
  event_team: {
    actions: {
      load: {
        request: {
          method: 'get',
          path: '/events/:event_id/teams/:team_id',
        },
      },
    },
  },
  attendee: {
    actions: {
      load: {
        request: {
          method: 'get',
          path: '/events/:event_id/attendees/:attendee_id/',
        },
      },
    },
  },
  format: {
    actions: {
      load: {
        request: {
          method: 'get',
          path: '/formats/:format_id/',
        },
      },
    },
  },
  display_settings: {
    actions: {
      load: {
        request: {
          method: 'get',
          path: '/events/:event_id/display_settings/',
        },
        after: [
          { on: 'outent', field: 'event_id', set: { query: 'event_id' } },
        ],
      },
      save: {
        request: {
          method: 'post',
          path: '/events/:event_id/display_settings/',
          body: {
            display_settings: [
              'show_start_date',
              'show_end_date',
              'show_start_end_time',
              'show_timezone',
              'show_map',
              'show_remaining',
              'show_organizer_facebook',
              'show_organizer_twitter',
              'show_facebook_friends_going',
              'terminology',
            ],
          },
        },
        after: [
          { on: 'outent', field: 'event_id', set: { inent: 'event_id' } },
        ],
      },
    },
  },
  event_capacity: {
    actions: {
      load: {
        request: {
          method: 'get',
          path: '/events/:event_id/capacity_tier/',
        },
      },
      save: {
        request: {
          method: 'post',
          path: '/events/:event_id/capacity_tier/',
          body: {
            capacity_tier: ['capacity_total', 'holds'],
          },
        },
      },
    },
  },
  event_series: {
    actions: {
      load: {
        request: {
          method: 'get',
          path: '/series/:event_series_id/',
        },
      },
    },
  },
  order: {
    actions: {
      load: {
        request: {
          method: 'get',
          path: '/orders/:order_id/',
        },
      },
    },
  },
  sales_report: {
    actions: {
      load: {
        request: {
          method: 'get',
          path: '/reports/sales?event_ids=:event_ids&event_status=:event_status&start_date=:start_date&end_date=:end_date&filter_by=:filter_by&group_by=:group_by&period=:period&date_facet=:date_facet&timezone=:timezoney',
        },
      },
    },
  },
  attendee_report: {
    actions: {
      load: {
        request: {
          method: 'get',
          path: '/reports/attendees?event_ids=:event_ids&event_status=:event_status&start_date=:start_date&end_date=:end_date&filter_by=:filter_by&group_by=:group_by&period=:period&date_facet=:date_facet&timezone=:timezoney',
        },
      },
    },
  },
  published_structured_content: {
    actions: {
      load: {
        request: {
          method: 'get',
          path: '/events/:id/structured_content?propose=:propose',
        },
      },
    },
  },
  working_structured_content: {
    actions: {
      load: {
        request: {
          method: 'get',
          path: '/events/:id/structured_content/edit?propose=:propose',
        },
      },
    },
  },
  text_overrides: {
    actions: {
      load: {
        request: {
          method: 'get',
          path: '/organizations/:organization_id/text_overrides/?locale=:locale&venue_id=:venue_id&event_id=:event_id&text_codes=:text_codes',
        },
      },
    },
  },
  ticket_buyer_settings: {
    actions: {
      load: {
        request: {
          method: 'get',
          path: '/events/:event_id/ticket_buyer_settings/',
        },
      },
    },
  },
  ticket_class: {
    actions: {
      load: {
        request: {
          method: 'get',
          path: '/events/:event_id/ticket_classes/:ticket_class_id/',
        },
        after: [
          { on: 'outent', field: 'event_id', set: { query: 'event_id' } },
          { on: 'outent', field: 'ticket_class_id', set: { query: 'ticket_class_id' } }
        ]
      },
      save: {
        request: {
          method: 'post',
          path: '/events/:event_id/ticket_classes/:ticket_class_id/',
          body: {
            ticket_class: [
              'cost',
              'resource_uri',
              'image_id',
              'display_name',
              'quantity_sold',
              'sales_start',
              'sales_end',
              'hide_sale_dates',
              'auto_hide_before',
              'auto_hide_after',
              'secondary_assignment_enabled',
              'sales_end_relative',
              'ticket_classe'
            ]
          }
        },
        after: [
          { on: 'outent', field: 'event_id', set: { inent: 'event_id' } },
          { on: 'outent', field: 'ticket_class_id', set: { inent: 'ticket_class_id' } }
        ]
      }
    },
  }
}

export { entities }
