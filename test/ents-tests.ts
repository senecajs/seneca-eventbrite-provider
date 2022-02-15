import { TestEntityMap } from "./types"

const test_args = {
  event_id: '238083523227', //238083523227 251037679457
  inventory_tier: '11195969',
  discount_id: '609282579',
  category_id: '101',
  team_id: '1234',
  attendee_id: '1234',
  organization_id: '39198188963 ',
  format_id: '100',
  event_series_id: '100',
  order_id: '1234',
  venue_id: '1234',
  user_id: '123456',
  ticket_group: {
    ticket_group_id: '1234',
    name: 'foo'
  },
  ticket_class: {
    ticket_class_id: '1234',
    event_id: '238083523227',
    name: 'foo',
    cost: 'USD,1234'
  },
  sales_report: {
    event_ids: '1234',
    event_status: 'foo',
    start_date: 'foo',
    end_date: 'foo',
    filter_by: 'foo',
    group_by: 'foo',
    period: 'foo',
    date_facet: 'foo',
    timezone: 'foo',
  },
  text_overrides: {
    organization_id: '1234',
    locale: '1234',
    venue_id: '1234',
    event_id: '1234',
    text_codes: '1234',
  }
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
  },
  format: {
    load: {
      args: {
        format_id: test_args.format_id,
      },
      expectations: {
        id: {
          sameAs: test_args.format_id,
        },
      },
    },
  },
  display_settings: {
    load: {
      args: {
        event_id: test_args.event_id,
      },
      expectations: {
        event_id: {
          sameAs: test_args.event_id,
        },
      },
    },
    save: {
      changes: {
        show_start_date: true,
      },
      expectations: {
        event_id: {
          sameAs: test_args.event_id,
        },
        show_start_date: {
          sameAs: true
        }
      },
    },
  },
  event_capacity: {
    load: {
      args: {
        event_id: test_args.event_id,
      },
      expectations: {
        event_id: {
          sameAs: test_args.event_id,
        },
      },
    },
    save: {
      changes: {
        capacity_total: 10,
      },
      expectations: {
        capacity_total: {
          sameAs: 10
        }
      },
    },
  },
  event_series: {
    load: {
      args: {
        event_series_id: test_args.event_series_id,
      },
      expectations: {
        id: {
          sameAs: test_args.event_id,
        },
      },
    },
  },
  order: {
    load: {
      args: {
        order_id: test_args.order_id,
      },
      expectations: {
        id: {
          sameAs: test_args.order_id
        },
      },
    },
  },
  sales_report: {
    load: {
      args: {
        event_ids: test_args.sales_report.event_ids,
        event_status: test_args.sales_report.event_status,
        start_date: test_args.sales_report.start_date,
        end_date: test_args.sales_report.end_date,
        filter_by: test_args.sales_report.filter_by,
        group_by: test_args.sales_report.group_by,
        period: test_args.sales_report.period,
        date_facet: test_args.sales_report.date_facet,
        timezone: test_args.sales_report.timezone,
      },
    },
  },
  attendee_report: {
    load: {
      args: {
        event_ids: test_args.sales_report.event_ids,
        event_status: test_args.sales_report.event_status,
        start_date: test_args.sales_report.start_date,
        end_date: test_args.sales_report.end_date,
        filter_by: test_args.sales_report.filter_by,
        group_by: test_args.sales_report.group_by,
        period: test_args.sales_report.period,
        date_facet: test_args.sales_report.date_facet,
        timezone: test_args.sales_report.timezone,
      },
    },
  },
  published_structured_content: {
    load: {
      args: {
        id: 1,
        propose: 'foo'
      },
      expectations: {
        access_type: {
          sameAs: 'public'
        },
      },
    },
  },
  working_structured_content: {
    load: {
      args: {
        id: 1,
        propose: 'foo'
      },
      expectations: {
        access_type: {
          sameAs: 'public'
        },
      },
    },
  },
  text_overrides: {
    load: {
      args: {
        organization_id: test_args.text_overrides.organization_id,
        locale: test_args.text_overrides.locale,
        venue_id: test_args.text_overrides.venue_id,
        event_id: test_args.text_overrides.event_id,
        text_codes: test_args.text_overrides.text_codes,
      },
      expectations: {
        text_code: {
          sameAs: 'tickets_not_yet_on_sale'
        },
      },
    },
  },
  ticket_buyer_settings: {
    load: {
      args: {
       event_id: test_args.event_id
      },
      expectations: {
        event_id: {
          sameAs: test_args.event_id
        },
      },
    },
  },
  ticket_class: {
    load: {
      args: {
       event_id: test_args.ticket_class.event_id,
       ticket_class_id: test_args.ticket_class.ticket_class_id
      },
      expectations: {
        name: {
          sameAs: test_args.ticket_class.name
        },
      },
    },
    save: {
      changes: {
        cost: test_args.ticket_class.cost,
      },
      expectations: {
        cost: {
          sameAs: test_args.ticket_class.cost
        }
      },
    }
  },
  ticket_group: {
    load: {
      args: {
       ticket_group_id: test_args.ticket_group.ticket_group_id
      },
      expectations: {
        name: {
          sameAs: test_args.ticket_group.name
        },
      },
    },
    save: {
      changes: {
        name: 'foo'
      },
      expectations: {
        name: {
          sameAs: 'bar'
        }
      },
    }
  },
  venue: {
    load: {
      args: {
       venue_id: test_args.venue_id
      },
    },
    save: {
      changes: {
        name: 'Foo'
      },
      expectations: {
        name: {
          sameAs: 'Bar'
        }
      },
    }
  },
  user: {
    load: {
      args: {
       user_id: test_args.user_id
      },
      expectations: {
        user: {
          toMatchObject: {
            id: test_args.user_id,
          }
        },
      },
    }
  },
  media: {
    load: {
      args: {
       media_id: '207605529',
       width: '10',
       height: '15'
      },
    },
    save: {
      changes: {
        crop_mask: {
          top_left: {
            y: 15,
            x: 15,
          },
          width: 123,
          height: 321
        }
      },
    }
  },
}

export { ents_tests }
