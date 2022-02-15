const mocks = {
  event: {
    post: {
      url: "/events/:event_id/",
      mock_data: {
        id: '238083523227',
        description: { text: '74a46e44d0cb9bcb5f8b', html: '74a46e44d0cb9bcb5f8b' }
      },
    },
    get: {
      url: "/events/:event_id/",
      mock_data: {
        id: '238083523227',
        description: { text: '74a46e44d0cb9bcb5f8b', html: '74a46e44d0cb9bcb5f8b' }
      },
    },
  },
  category: {
    get: {
      url: "/categories/:category_id/",
      mock_data: {
        id: "101",
      },
    },
  },
  discount: {
    get: {
      url: "/discounts/:discount_id",
      mock_data: {
        id: '609282579',
      }
    },
    post: {
      url: "/discounts/:discount_id",
      mock_data: {
        id: '609282579',
        code: 'democode'
      }
    }
  },
  inventory_tier: {
    get: {
      url: "/events/:event_id/inventory_tiers/:inventory_tier/",
      mock_data: {
        id: '11195969',
        event_id: '238083523227',
        name: '26ebbd125e7ccc13ee6f',
      }
    },
    post: {
      url: "/events/:event_id/inventory_tiers/:inventory_tier/",
      mock_data: {
        id: '11195969',
        event_id: '238083523227',
        name: '26ebbd125e7ccc13ee6f',
      }
    },
  },
  event_team: {
    get: {
      url: "/events/:event_id/teams/:team_id",
      mock_data: {
        id: "1234",
        event_id: "238083523227",
      },
    },
  },
  attendee: {
    get: {
      url: "/events/:event_id/attendees/:attendee_id/",
      mock_data: {
        id: "1234",
        event_id: "238083523227"
      },
    },
  },
  format: {
    get: {
      url: '/formats/:format_id/',
      mock_data: {
        id: "100",
      },
    },
  },
  display_settings: {
    get: {
      url: '/events/:event_id/display_settings/',
      mock_data: {
        event_id: "238083523227",
        show_start_date: true,
        resource_uri: 'https://www.eventbriteapi.com/v3/events/238083523227/display_settings/',
      },
    },
    post: {
      url: '/events/:event_id/display_settings/',
      mock_data: {
        event_id: "238083523227",
        show_start_date: true,
        resource_uri: 'https://www.eventbriteapi.com/v3/events/238083523227/display_settings/',
      },
    }
  },
  event_capacity: {
    get: {
      url: "/events/:event_id/capacity_tier/",
      mock_data: {
        event_id: '238083523227',
      }
    },
    post: {
      url: "/events/:event_id/capacity_tier/",
      mock_data: {
        event_id: '238083523227',
        capacity_total: 10
      }
    },
  },
  event_series: {
    get: {
      url: "/series/:event_series_id/",
      mock_data: {
        id: '238083523227',
      }
    }
  },
  order: {
    get: {
      url: "/orders/:order_id/",
      mock_data: {
        id: '1234',
      }
    }
  },
  sales_report: {
    get: {
      url: "/reports/sales",
      mock_data: {
        id: '1234',
      }
    }
  },
  attendee_report: {
    get: {
      url: "/reports/attendees",
      mock_data: {
        id: '1234',
      }
    }
  },
  published_structured_content: {
    get: {
      url: "/events/:id/structured_content",
      mock_data: {
        access_type: 'public',
      }
    }
  },
  working_structured_content: {
    get: {
      url: "/events/:id/structured_content/edit",
      mock_data: {
        access_type: 'public',
      }
    }
  },
  text_overrides: {
    get: {
      url: "/organizations/:organization_id/text_overrides",
      mock_data: {
        text_code: 'tickets_not_yet_on_sale',
      }
    }
  },
  ticket_buyer_settings: {
    get: {
      url: "/events/:event_id/ticket_buyer_settings/",
      mock_data: {
        event_id: '238083523227',
      }
    },
  },
  ticket_class: {
    get: {
      url: "/events/:event_id/ticket_classes/:ticket_class_id/",
      mock_data: {
        name: 'foo',
        cost: 'USD,2342'
      }
    },
    post: {
      url: "/events/:event_id/ticket_classes/:ticket_class_id/",
      mock_data: {
        cost: 'USD,1234',
        name: 'foo'
      }
    },
  },
  ticket_group: {
    get: {
      url: "/ticket_groups/:ticket_group_id/",
      mock_data: {
        name: 'foo',
        status: 'live',
      } 
    },
    post: {
      url: "/ticket_groups/:ticket_group_id/",
      mock_data: {
        name: 'bar',
        status: 'live',
      } 
    },
  },
  vanue: {
    get: {
      url: "/venues/:venue_id/",
      mock_data: {
        id: '1234',
        name: 'Foo'
      } 
    },
    post: {
      url: "/venues/:venue_id/",
      mock_data: {
        id: '1234',
        name: 'Bar'
      } 
    },
  },
  user: {
    get: {
      url: "/users/:user_id/",
      mock_data: {
        user: {
          id: '123456',
        }
      }
    },
  },
  media: {
    get: {
      url: "/media/:media_id/",
      mock_data: {
        id: '207605529',
        crop_mask: {
          top_left: {
            top_left: {
              y: 15,
              x: 15,
            },
            width: 123,
            height: 321
          }
        }
      }
    },
    post: {
      url: "/media/:media_id/",
      mock_data: {
        id: '207605529',
        crop_mask: {
          top_left: {
            y: 15,
            x: 15,
          },
          width: 123,
          height: 321
        }
      }
    }
  },
}

export { mocks }
