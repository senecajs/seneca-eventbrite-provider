import { EntityMap } from "./types";

const entities: EntityMap = {
  event: {
    actions: {
      load: {
        request: {
          method: "get",
          path: "/events/:event_id/",
        },
        after: [
          { on: 'outent', field: 'event_id', set: { query: 'event_id' } }
        ]
      },
      save: {
        request: {
          method: "post",
          path: "/events/:event_id/",
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
            ]
          },
        },
        before: [
          { on: 'req', del: 'event.start.local' },
          { on: 'req', del: 'event.end.local' },
          { on: 'req', del: 'event.name.text' },
          { on: 'req', del: 'event.description.text' },
        ]
      }
    },
  },
  category: {
    actions: {
      load: {
        request: {
          method: "get",
          path: "/categories/:category_id/",
        },
      },
    }
  },
  discount: {
    actions: {
      load: {
        request: {
          method: "get",
          path: "/discounts/:discount_id/",
        },
        after: [
          { on: 'outent', field: 'discount_id', set: { query: 'discount_id' } }
        ]
      },
      save: {
        request: {
          method: "post",
          path: "/discounts/:discount_id",
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
            ]
          },
        },
        after: [
          { on: 'outent', field: 'discount_id', set: { inent: 'discount_id' } }
        ]
      }
    },
  },
  inventory_tier: {
    actions: {
      load: {
        request: {
          method: 'get',
          path: "/events/:event_id/inventory_tiers/:inventory_tier/",
        }
      },
      save: {
        request: {
          method: 'post',
          path: "/events/:event_id/inventory_tiers/:inventory_tier/",
          body: {
            inventory_tier: [
              'name',
              'sort_order',
              'color',
              'quantity_total',
              'image_id',
              'capacity_total',
              'holds',
            ]
          }
        },
      }
    }
  },
  event_team: {
    actions: {
      load: {
        request: {
          method: "get",
          path: "/events/:event_id/teams/:team_id",
        },
      },
    }
  },
  attendee: {
    actions: {
      load: {
        request: {
          method: "get",
          path: "/events/:event_id/attendees/:attendee_id/",
        }
      }
    }
  }
}

export { entities }