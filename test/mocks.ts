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
        inventory_tier: {
          id: '11195969',
          event_id: '238083523227',
          name: '26ebbd125e7ccc13ee6f',
        }
      }
    },
    post: {
      url: "/events/:event_id/inventory_tiers/:inventory_tier/",
      mock_data: {
        inventory_tier: {
          id: '11195969',
          event_id: '238083523227',
          name: '26ebbd125e7ccc13ee6f',
        }
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
  }
}

export { mocks }
