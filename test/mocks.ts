const mocks = {
  event: {
    get: {
      url: "/events/:event_id/",
      mock_data: {
        id: "238083523227",
      },
    },
    post: {
      url: "/events/:event_id/",
      mock_data: {
        id: "238083523227",
      },
    },
  },
  discount: {
    get: {
      url: "/discounts/:discount_id/",
      mock_data: {
        id: "609282579",
      },
    },
    post: {
      url: "/discounts/:discount_id/",
      mock_data: {
        id: "609282579",
      },
    },
  },
  inventory_tier: {
    get: {
      url: "/events/:event_id/inventory_tiers/:inventory_tier/",
      mock_data: {
        id: "11195969",
      },
    },
    post: {
      url: "/events/:event_id/inventory_tiers/:inventory_tier/",
      mock_data: {
        id: "11195969",
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
  event_team: {
    get: {
      url: "/events/:event_id/teams/:team_id",
      mock_data: {
        id: "11195969",
      },
    },
  },
  attendee: {
    get: {
      url: "/events/:event_id/attendees/:attendee_id/",
      mock_data: {
        id: "1234",
      },
    },
  }
}

export { mocks }
