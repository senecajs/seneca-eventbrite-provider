const mocks = {
  event: {
    get: {
      url: "/events/:event_id/",
      mock_data: {
        id: "251037679457",
      },
    },
    post: {
      url: "/events/:event_id/",
      mock_data: {
        id: "251037679457",
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
        event_id: "238083523227",
      },
    },
    post: {
      url: "/events/:event_id/inventory_tiers/:inventory_tier/",
      mock_data: {
        id: "11195969",
        event_id: "238083523227",
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
}

export { mocks }
